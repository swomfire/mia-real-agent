import ticketCollection from './ticket.model';
import BaseService from '../base/base.service';
import { TICKET_STATUS, REPLY_TYPE } from '../../../common/enums';
import ReplyService from '../reply/reply.service';
import ConversationRoomQueue from '../queue/conversationRoomQueue';
import { getHistoryTicketUpdate } from '../../utils/utils';
import { sendEmailTrascript } from '../../mail-sparkpost/sparkpost';
import UserService from '../user/user.service';
import { conversationTranscript } from '../../mail-sparkpost/dynamicTemplate';
import { ticketAdminAggregration } from './ticket.utils';

class TicketService extends BaseService {
  constructor(collection) {
    super(collection);
    this.countDocument = this.countDocument.bind(this);
    this.getByCondition = this.getByCondition.bind(this);
    this.sendTransciptConverstion = this.sendTransciptConverstion.bind(this);
    this.handleTicketUpdateStatus(collection);
  }

  getByCondition(condition) {
    return this.collection.findOne(condition)
      .populate({ path: 'owner', select: ['_id', 'profile', 'role'] }) // only get _id and username of owner
      .populate({ path: 'assignee', select: ['_id', 'profile', 'rating'] });
  }

  getAllByConditionWithPopulationInfo(condition, population) {
    return this.collection.find(condition).populate(population);
  }

  countDocument(filter) {
    return this.collection.countDocuments(filter);
  }

  async updateStatus(ticketId, status) {
    const ticket = await this.collection.findOne({ _id: ticketId });
    const { history, status: prevStatus } = ticket;
    if (status !== prevStatus) {
      const oldHistory = history.map(h => h.toJSON());
      const newHistory = getHistoryTicketUpdate(oldHistory, status);
      return this.update(ticketId, { status, history: newHistory });
    }
    return true;
  }

  async getAllForAdmin(condition, options) {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = options;
    const notDeletedCondition = {
      deletedAt: null,
    };
    const notArchivedCondition = {
      archivedAt: null,
    };
    const queryCondition = {
      $and: [condition, notDeletedCondition, notArchivedCondition],
    };
    console.log(typeof skip);
    const resultPromise = this.collection
      .aggregate(ticketAdminAggregration(queryCondition, Number(limit), Number(skip), sort))
      .exec();
    return {
      result: await resultPromise,
      totalRecord: await this.countDocument(queryCondition),
    };
  }

  async getAllWithUserData(condition, options) {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = options;
    const notDeletedCondition = {
      deletedAt: null,
    };
    const notArchivedCondition = {
      archivedAt: null,
    };
    const queryCondition = {
      $and: [condition, notDeletedCondition, notArchivedCondition],
    };
    const resultPromise = this.collection
      .find(queryCondition, null, options)
      .populate({ path: 'owner', select: ['_id', 'profile', 'role', 'username'] }) // only get _id and username of owner
      .populate({ path: 'assignee', select: ['_id', 'profile', 'rating', 'username'] }) // only get _id and username of assignee
      .sort(sort)
      .skip(+skip)
      .limit(+limit || 10)
      .exec();

    return {
      result: await resultPromise,
      totalRecord: await this.countDocument(queryCondition),
    };
  }

  async getAll(condition, options) {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = options;
    const notDeletedCondition = {
      deletedAt: null,
    };
    const notArchivedCondition = {
      archivedAt: null,
    };
    const queryCondition = {
      $and: [condition, notDeletedCondition, notArchivedCondition],
    };

    const resultPromise = this.collection
      .find(queryCondition, null, options)
      .sort(sort)
      .skip(+skip)
      .limit(+limit || 10)
      .exec();

    return {
      result: await resultPromise,
      totalRecord: await this.countDocument(queryCondition),
    };
  }

  async getAllByOwner(owner) {
    const result = await this.collection.find({ owner }).exec();
    return result;
  }

  async getTicketCount(query) {
    const result = await this.collection.find(query).count();
    return result;
  }

  async handleTicketOffline(user) {
    const { _id } = user;
    const query = {
      status: { $in: [TICKET_STATUS.IDLE, TICKET_STATUS.PROCESSING] },
      $or: [
        { owner: _id },
        { assignee: _id },
      ],
    };
    const tickets = await this.collection.find(query).exec();
    await this.handleUpdateTicketStatusHistory(query, TICKET_STATUS.OFFLINE);
    await this.collection.updateMany(query, { status: TICKET_STATUS.OFFLINE }).exec();
    return tickets;
  }

  async handleTicketOnline(user) {
    const { _id } = user;
    const query = {
      status: TICKET_STATUS.OFFLINE,
      $or: [
        { owner: _id },
        { assignee: _id },
      ],
    };
    const tickets = await this.collection.find(query).exec();
    await this.handleUpdateTicketStatusHistory(query, TICKET_STATUS.IDLE);
    await this.collection.updateMany(query, { status: TICKET_STATUS.IDLE }).exec();
    return tickets;
  }

  async handleCloseTicket(query) {
    await this.handleUpdateTicketStatusHistory(query, TICKET_STATUS.SOLVED);
    const tickets = await this.collection.updateMany(query, { status: TICKET_STATUS.SOLVED }).exec();
    return tickets;
  }

  async handleTicketIdle(ticketId) {
    const query = {
      status: TICKET_STATUS.PROCESSING,
      _id: ticketId,
    };
    await this.handleUpdateTicketStatusHistory(query, TICKET_STATUS.IDLE);
    const tickets = await this.collection.update(query, { status: TICKET_STATUS.IDLE }).exec();
    return tickets;
  }

  async handleTicketOpen(ticketId) {
    const query = {
      status: TICKET_STATUS.PENDING,
      _id: ticketId,
    };
    await this.handleUpdateTicketStatusHistory(query, TICKET_STATUS.OPEN);
    const tickets = await this.collection.update(query, { status: TICKET_STATUS.OPEN }).exec();
    return tickets;
  }

  async sendTransciptConverstion(ticket, conversationId) {
    const repliesMessages = await ReplyService.getByConversationForTranscript(conversationId);

    const messagesText = conversationTranscript(repliesMessages);

    const user = await UserService.getById(ticket.owner);
    return sendEmailTrascript(user, ticket, messagesText);
  }

  async handleUpdateTicketStatusHistory(query, status) {
    const tickets = await this.collection.find(query).exec();
    if (Array.isArray(tickets) && tickets.length > 0) {
      await Promise.all(tickets.map((ticket) => {
        const currTicket = ticket;
        const { history } = ticket;
        const oldHistory = history.map(h => h.toJSON());
        const newHistory = getHistoryTicketUpdate(oldHistory, status);
        currTicket.history = newHistory;
        return currTicket.save();
      }));
    }
  }

  handleTicketUpdateStatus(collection) {
    collection.watch().on('change', async (change) => {
      const { updateDescription, documentKey } = change;
      if (updateDescription) {
        const { updatedFields } = updateDescription;
        const { status, updatedAt } = updatedFields;
        if (status) {
          const { _id } = documentKey;
          const { conversationId } = await this.collection.findOne(_id);
          ReplyService.insert({
            conversationId,
            messages: 'Ticket Update',
            type: REPLY_TYPE.TICKET_STATUS,
            params: { status },
            sentAt: updatedAt,
          });
          // Emit Update ticket for user in conversation room
          ConversationRoomQueue.ticketUpdateNotification(conversationId, _id);
        }
      }
    });
  }
}

export const closeTicketOfflineQuery = ({ _id: userId }) => ({
  status: TICKET_STATUS.OFFLINE,
  $or: [
    { owner: userId },
    { assignee: userId },
  ],
});

export const closeTicketInProgressQuery = ({ _id: userId }) => ({
  status: TICKET_STATUS.PROCESSING,
  assignee: userId,
});

export default new TicketService(ticketCollection);

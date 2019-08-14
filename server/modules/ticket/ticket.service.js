import ticketCollection from './ticket.model';
import BaseService from '../base/base.service';
import { TICKET_STATUS } from '../../../common/enums';

class TicketService extends BaseService {
  constructor(collection) {
    super(collection);
    this.countDocument = this.countDocument.bind(this);
    this.getByCondition = this.getByCondition.bind(this);
  }

  getByCondition(condition) {
    return this.collection.findOne(condition);
  }

  getAllByConditionWithPopulationInfo(condition, population) {
    return this.collection.find(condition).populate(population);
  }

  countDocument(filter) {
    return this.collection.countDocuments(filter);
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
      .populate({ path: 'owner', select: ['_id', 'username'] }) // only get _id and username of owner
      .populate({ path: 'assignee', select: ['_id', 'username'] }) // only get _id and username of assignee
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
    const tickets = await this.collection.updateMany(query, { status: TICKET_STATUS.OFFLINE }).exec();
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
    await this.collection.updateMany(query, { status: TICKET_STATUS.IDLE }).exec();
    return tickets;
  }

  async handleCloseTicket(query) {
    const tickets = await this.collection.updateMany(query, { status: TICKET_STATUS.CLOSED }).exec();
    return tickets;
  }

  async handleTicketIdle(ticketId) {
    const query = {
      status: TICKET_STATUS.PROCESSING,
      _id: ticketId,
    };
    const tickets = await this.collection.update(query, { status: TICKET_STATUS.IDLE }).exec();
    return tickets;
  }

  async handleTicketOpen(ticketId) {
    const query = {
      status: TICKET_STATUS.PENDING,
      _id: ticketId,
    };
    const tickets = await this.collection.update(query, { status: TICKET_STATUS.OPEN }).exec();
    return tickets;
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

import conversationCollection from './conversation.model';
import BaseService from '../base/base.service';
import ConversationRoomQueue from '../queue/conversationRoomQueue';

class ConversationService extends BaseService {
  constructor() {
    super(conversationCollection);
  }

  countDocument(filter) {
    return this.collection.countDocuments(filter);
  }

  getConversationByTicketId(ticketId) {
    return this.getOneByQuery({
      ticketId,
    });
  }

  async requestEndSupport(conversationId, status) {
    const conversation = await this.collection.findOne({ _id: conversationId });
    if (conversation) {
      const { owner } = conversation;
      // Send Notification to members
      ConversationRoomQueue.sendConfirmEndSupportRequest(conversationId, owner, status);
    }
  }

  async confirmEndSupport(conversationId, status) {
    const conversation = await this.collection.findOne({ _id: conversationId });
    if (conversation) {
      await this.collection.updateOne({ _id: conversationId }, { status }).exec();
      // Send Notification to members
      ConversationRoomQueue.sendEndSupport(conversationId, status);
    }
  }

  async getAll(condition, options = {}) {
    const { skip = 0, limit, sort = { updatedAt: -1 } } = options;
    const notDeletedCondition = {
      deletedAt: null,
    };
    const queryCondition = {
      $and: [condition, notDeletedCondition],
    };
    const totalRecordPromise = this.collection
      .find(queryCondition, null)
      .count();
    const resultPromise = this.collection
      .find(queryCondition, null, options)
      .populate({
        path: 'owner',
        select: ['_id', 'rating', 'profile'],
      })
      .populate({
        path: 'members.member',
        select: ['_id', 'rating', 'application'],
        populate: ({ path: 'application', select: ['nickname'] }),
      })
      .sort(sort)
      .skip(+skip)
      .limit(+limit || 0)
      .exec();
    return {
      result: await resultPromise,
      totalRecord: await totalRecordPromise,
    };
  }

  get(id) {
    return this.collection.findOne({
      _id: id,
      deletedAt: null,
    })
      .populate({
        path: 'members.member',
        select: ['_id', 'rating', 'application'],
        populate: ({ path: 'application', select: ['nickname'] }),
      });
  }
}

export default new ConversationService();

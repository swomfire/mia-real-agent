import feedbackCollection from './feedback.model';
import BaseService from '../base/base.service';

class FeedbackService extends BaseService {
  constructor() {
    super(feedbackCollection);
    this.countDocument = this.countDocument.bind(this);
    this.get = this.get.bind(this);
  }

  countDocument(filter) {
    return this.collection.countDocuments(filter);
  }

  async getAllWithPopulate(condition, options) {
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
      .populate({
        path: 'ticketId',
        select: ['_id', 'owner'],
        populate: {
          path: 'owner',
          select: ['_id', 'username'],
        },
      })
      .populate({
        path: 'ticketId',
        select: ['_id', 'owner', 'assignee', 'createdAt', 'title', 'status', 'category'],
        populate: {
          path: 'assignee',
          select: ['_id', 'username'],
        },
      }).sort(sort)
      .skip(+skip)
      .limit(+limit || 10)
      .exec();

    return {
      result: await resultPromise,
      totalRecord: await this.countDocument(queryCondition),
    };
  }

  get(_id) {
    return this.collection.findOne({ _id })
      .populate({
        path: 'ticketId',
        select: ['_id', 'owner'],
        populate: {
          path: 'owner',
          select: ['_id', 'username'],
        },
      })
      .populate({
        path: 'ticketId',
        select: ['_id', 'owner', 'assignee', 'createdAt', 'title', 'status', 'category'],
        populate: {
          path: 'assignee',
          select: ['_id', 'username'],
        },
      })
      .exec();
  }

  getFeedbackByTicketId(ticketId) {
    return this.getOneByQuery({
      ticketId,
    });
  }
}

export default new FeedbackService();

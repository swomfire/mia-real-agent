import conversationCollection from './feedback.model';
import BaseService from '../base/base.service';

class FeedbackService extends BaseService {
  constructor() {
    super(conversationCollection);
  }

  countDocument(filter) {
    return this.collection.countDocuments(filter);
  }

  getFeedbackByTicketId(ticketId) {
    return this.getOneByQuery({
      ticketId,
    });
  }
}

export default new FeedbackService();

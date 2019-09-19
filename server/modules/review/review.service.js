import reviewCollection from './review.model';
import BaseService from '../base/base.service';

class ReviewService extends BaseService {
  constructor(collection) {
    super(collection);
    this.countDocument = this.countDocument.bind(this);
    this.getByCondition = this.getByCondition.bind(this);
  }

  getByCondition(condition) {
    return this.collection.findOne(condition);
  }

  countDocument(filter) {
    return this.collection.countDocuments(filter);
  }

  async getReviewCount(query) {
    const result = await this.collection.find(query).count();
    return result;
  }
}

export default new ReviewService(reviewCollection);

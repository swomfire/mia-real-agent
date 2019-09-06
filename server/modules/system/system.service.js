import systemCollection from './system.model';
import BaseService from '../base/base.service';

class SystemService extends BaseService {
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

  getCurrentVersion() {
    return this.collection.findOne({ current: true });
  }
}

export default new SystemService(systemCollection);

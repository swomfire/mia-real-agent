import moment from 'moment';
import applicationCollection from './review.model';
import BaseService from '../base/base.service';

class ApplicationService extends BaseService {
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

  async getAdminAll(condition, options) {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = options;
    const notDeletedCondition = {
      $or: [
        { deleted: { $exists: false } },
        { deleted: { $exists: true, $in: [false] } },
      ],
    };
    const queryCondition = {
      $and: [condition, notDeletedCondition],
    };

    const resultPromise = this.collection
      .find(queryCondition, null, options)
      .sort(sort)
      .skip(+skip)
      .limit(+limit || 10)
      .exec();
    const result = await resultPromise;
    return {
      result: result.map(({ workExperiences, _doc }) => {
        let experience = 0;
        workExperiences.forEach(({ from, to, isWorking }) => {
          const f = moment(from);
          const t = moment(to);
          experience += (t.diff(isWorking ? moment() : f));
        });
        const yearsOfExp = moment().subtract(experience).toNow(true);
        return { ..._doc, yearsOfExp: yearsOfExp === 'a few seconds' ? '' : yearsOfExp };
      }),
      totalRecord: await this.countDocument(queryCondition),
    };
  }

  async getApplicationCount(query) {
    const result = await this.collection.find(query).count();
    return result;
  }
}

export default new ApplicationService(applicationCollection);

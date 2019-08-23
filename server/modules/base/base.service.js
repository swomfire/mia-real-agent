export default class BaseService {
  constructor(collection) {
    this.collection = collection;
  }

  insert(data) {
    return this.collection.create(data);
  }

  update(id, newDoc) {
    const updated = {
      $set: newDoc,
    };
    return this.collection.updateOne({ _id: id }, updated).exec();
  }

  delete(id) {
    return this.collection.updateOne({ _id: id }, { deletedAt: true }).exec();
  }

  get(id) {
    return this.collection
      .findOne({
        _id: id,
        deletedAt: null,
      })
      .exec();
  }

  getOneByQuery(query) {
    return this.collection.findOne(query).exec();
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
      .sort(sort)
      .skip(+skip)
      .limit(+limit || 0)
      .exec();
    return {
      result: await resultPromise,
      totalRecord: await totalRecordPromise,
    };
  }
}

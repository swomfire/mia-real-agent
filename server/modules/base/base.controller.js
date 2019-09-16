import httpStatus from 'http-status';
import mongoose from 'mongoose';
import _ from 'lodash';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';
import Logger from '../../logger';

const emptyObjString = '{}';

export default class BaseController {
  constructor(service) {
    this.service = service;
    this.handleError = this.handleError.bind(this);
    this.load = this.load.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.delete = this.delete.bind(this);
  }

  handleError(res, error) {
    Logger.error(error.message);
    const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    // throw new APIError(error.message, status);
    return res.status(status).send(error);
  }

  async load(req, res, next, id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        const { CONTENT_NOT_FOUND } = ERROR_MESSAGE;
        throw new APIError(CONTENT_NOT_FOUND, httpStatus.BAD_REQUEST);
      }
      const model = await this.service.get(id);

      if (model == null) {
        const { CONTENT_NOT_FOUND } = ERROR_MESSAGE;
        throw new APIError(CONTENT_NOT_FOUND, httpStatus.NOT_FOUND);
      }

      req.model = model;
      return next();
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async insert(req, res) {
    try {
      const data = req.body;
      const result = await this.service.insert(data);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      const { model } = req;
      const newModel = req.body;
      _.assign(model, newModel);

      const savedModel = await model.save();
      return res.status(httpStatus.OK).send(savedModel);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async get(req, res) {
    try {
      const { model } = req;

      return res.status(httpStatus.OK).send(model);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async getAll(req, res) {
    try {
      const {
        skip = 0, limit = 10, sort, ...params
      } = req.query;
      const option = { skip, limit };
      if (sort) {
        const sortObj = JSON.parse(sort);
        option.sort = sortObj;
      }
      const query = JSON.parse(_.get(params, 'query', emptyObjString));
      const result = await this.service.getAll(query, option);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async delete(req, res) {
    try {
      const { model } = req;
      model.deletedAt = new Date();
      const deleteModel = await model.save();
      return res.status(httpStatus.OK).send(deleteModel);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

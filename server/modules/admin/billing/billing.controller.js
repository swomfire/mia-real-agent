import httpStatus from 'http-status';
import _get from 'lodash/get';
import BaseController from '../../base/base.controller';
import APIError, { ERROR_MESSAGE } from '../../../utils/APIError';
import BillingService from '../../billing/billing.service';

const { CONTENT_NOT_FOUND } = ERROR_MESSAGE;
const emptyObjString = '{}';

class UserController extends BaseController {
  constructor() {
    super(BillingService);
  }

  getAll = async (req, res) => {
    try {
      const {
        skip = 0, limit = 10, sort, ...params
      } = req.query;
      const option = { skip, limit };
      if (sort) {
        const sortObj = JSON.parse(sort);
        option.sort = sortObj;
      }
      const query = JSON.parse(_get(params, 'query', emptyObjString));
      const result = await this.service.getAll(query, option);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async load(req, res, next, id) {
    try {
      const { user } = req;
      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }
      const model = await this.service.getByCondition({ _id: id });

      if (model == null) {
        throw new APIError(CONTENT_NOT_FOUND, httpStatus.NOT_FOUND);
      }
      req.model = model;
      return next();
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
}

export default new UserController();

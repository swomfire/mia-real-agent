import httpStatus from 'http-status';
import _get from 'lodash/get';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';
import BaseController from '../base/base.controller';
import FeedbackService from './feedback.service';

class FeedbackController extends BaseController {
  constructor() {
    super(FeedbackService);
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req, res) {
    try {
      const {
        user,
        query: {
          skip, limit, sort, ...params
        },
      } = req;

      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }
      const { _id: owner } = user;
      const condition = { owner };

      const option = { skip, limit };
      if (sort) {
        const sortObj = JSON.parse(sort);
        option.sort = sortObj;
      }

      const query = JSON.parse(_get(params, 'query', '{}'));
      const newQuery = {
        ...query,
        ...condition,
      };

      const { result } = await this.service.getAll(newQuery, option);
      const total = await this.service.countDocument(condition);

      return res.status(httpStatus.OK).send({
        result,
        total,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new FeedbackController();

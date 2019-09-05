import httpStatus from 'http-status';
import _get from 'lodash/get';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';
import BaseController from '../base/base.controller';
import FeedbackService from './feedback.service';
import feedbackModel from './feedback.model';

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
      const option = { skip, limit };
      if (sort) {
        const sortObj = JSON.parse(sort);
        option.sort = sortObj;
      }

      const query = JSON.parse(_get(params, 'query', '{}'));
      const newQuery = {
        ...query,
      };
      const { result } = await this.service.getAllWithPopulate(newQuery, option);
      const total = await this.service.countDocument(newQuery);

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

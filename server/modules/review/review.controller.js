import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import BaseController from '../base/base.controller';
import { sendEmailChangeRequest } from '../../mail-sparkpost/sparkpost';
import ReviewService from './review.service';
import ApplicationService from '../application/application.service';
import { APPLICATION_STATUS } from '../../../common/enums';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';

class ReviewController extends BaseController {
  constructor() {
    super(ReviewService);
    this.getByToken = this.getByToken.bind(this);
  }

  async insert(req, res) {
    try {
      const data = req.body;
      const result = await this.service.insert(data);
      const { _id, applicationId } = result;
      const application = await ApplicationService.get(applicationId);
      const { email } = application;
      const domain = process.env.DOMAIN;
      const requestToken = jwt.sign({ _id }, process.env.SECRET_KEY_JWT,
        { expiresIn: 60 * 60 * 24 * 3 });
      console.log(requestToken);
      sendEmailChangeRequest(email, requestToken, `${domain}/application-change`);
      await ApplicationService.update(applicationId, { status: APPLICATION_STATUS.REQUESTED_CHANGE });
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async getByToken(req, res) {
    const { TOKEN_NOT_MATCH, TOKEN_EXPIRED } = ERROR_MESSAGE;
    try {
      const { token } = req.body;
      const { _id } = jwt.verify(token, process.env.SECRET_KEY_JWT);
      const review = await this.service.getOneByQuery({ _id });
      if (!review) {
        throw new APIError(TOKEN_NOT_MATCH, httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.OK).send(review);
    } catch (error) {
      const { name } = error;
      if (name === 'TokenExpiredError') {
        return this.handleError(res, { ...error, message: TOKEN_EXPIRED });
      }
      return this.handleError(res, error);
    }
  }
}

export default new ReviewController(ReviewService);

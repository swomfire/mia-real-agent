import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import BaseController from '../base/base.controller';
import { sendEmailChangeRequest } from '../../mail-sparkpost/sparkpost';
import ReviewService from './review.service';
import ApplicationService from '../application/application.service';
import { APPLICATION_STATUS } from '../../../common/enums';

class ReviewController extends BaseController {
  async insert(req, res) {
    try {
      const data = req.body;
      const result = await this.service.insert(data);
      const { _id, applicationId } = result;
      const application = await ApplicationService.get(applicationId);
      const { email } = application;
      const domain = process.env.DOMAIN;
      const requestToken = jwt.sign({ _id }, process.env.SECRET_KEY_JWT,
        { expiresIn: 60 * 10 });
      sendEmailChangeRequest(email, requestToken, `${domain}/application-change`);
      await ApplicationService.update(applicationId, { status: APPLICATION_STATUS.REQUESTED_CHANGE });
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new ReviewController(ReviewService);

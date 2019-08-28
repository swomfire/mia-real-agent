import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import BaseController from '../base/base.controller';
import ApplicationService from './application.service';
import UserService from '../user/user.service';
// import { randomPassword } from '../../utils/utils';
import { hashFunc } from '../../utils/bcrypt';
import { APPLICATION_STATUS } from '../../../common/enums';

class ApplicationController extends BaseController {
  constructor(service) {
    super(service);
    this.approveApplication = this.approveApplication.bind(this);
    this.rejectApplication = this.rejectApplication.bind(this);
    this.reviewApplication = this.reviewApplication.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.checkNicknameExisted = this.checkNicknameExisted.bind(this);
  }

  async approveApplication(req, res) {
    try {
      const { model: application } = req;
      const {
        email, _id, role, categories, firstName, lastName,
      } = application;
      const passwordString = '123456789'; // should generate random password and send email to user
      const hashPassword = await hashFunc(passwordString);
      const newUserPayload = {
        username: email,
        email,
        password: hashPassword,
        role,
        categories,
        application: _id,
        profile: {
          firstName, lastName,
        },
        verifiedAt: moment().utc().format(),
      };

      const user = await UserService.insert(newUserPayload);
      UserService.provideAccessToken(user);
      const result = await this.updateStatus(application, APPLICATION_STATUS.APPROVED);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async rejectApplication(req, res) {
    try {
      const { model: application } = req;
      const result = await this.updateStatus(application, APPLICATION_STATUS.REJECTED);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async reviewApplication(req, res) {
    try {
      const { model: application } = req;
      const result = await this.updateStatus(application, APPLICATION_STATUS.REVIEWING);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async updateStatus(application, status) {
    application.set({ status });
    const result = await application.save();
    return result;
  }

  async checkNicknameExisted(req, res) {
    try {
      const { query } = req;
      const { nickname } = query;
      const result = await this.service.countDocument({ nickname });
      return res.status(httpStatus.OK).send({ result });
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new ApplicationController(ApplicationService);

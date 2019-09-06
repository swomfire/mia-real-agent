import httpStatus from 'http-status';
// lodash
import _get from 'lodash/get';

import BaseController from '../../base/base.controller';
import ApplicationService from '../../application/application.service';
import { APPLICATION_STATUS } from '../../../../common/enums';
import UserService from '../../user/user.service';
import ticketService from '../../ticket/ticket.service';

const emptyObjString = '{}';

class AdminTicketController extends BaseController {
  constructor() {
    super(ApplicationService);
  }

  insert = async (req, res) => res.status(httpStatus.NOT_FOUND).send()

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
      const result = await this.service.getAdminAll(query, option);

      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  getApplicationSummary = async (req, res) => {
    try {
      const notDeletedCondition = {
        $or: [
          { deleted: { $exists: false } },
          { deleted: { $exists: true, $in: [false] } },
        ],
      };
      const notArchivedCondition = {
        $or: [
          { archived: { $exists: false } },
          { archived: { $exists: true, $in: [false] } },
        ],
      };

      const queryCondition = {
        $and: [notDeletedCondition, notArchivedCondition],
      };

      const pending = await this.service.getApplicationCount({ ...queryCondition, status: APPLICATION_STATUS.PENDING });
      const reviewing = await this.service.getApplicationCount({ ...queryCondition, status: APPLICATION_STATUS.REVIEWING });
      return res.status(httpStatus.OK).send({
        pending, reviewing,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  get = async (req, res) => {
    try {
      const { model: application } = req;
      const applicationObj = application.toObject();
      const { _id: applicationId } = applicationObj;

      const userDoc = await UserService.getByApplication(applicationId);
      if (userDoc) {
        applicationObj.profile = userDoc;
        const { _id } = userDoc;
        const ticketCondition = { assignee: _id };
        const populateCondition = { path: 'assignee', select: ['_id', 'username'] };
        const tickets = await ticketService.getAllForAdmin(ticketCondition, populateCondition);
        applicationObj.tickets = tickets;
      }
      return res.status(httpStatus.OK).send(applicationObj);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new AdminTicketController(ApplicationService);

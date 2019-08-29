import httpStatus from 'http-status';
// lodash
import _get from 'lodash/get';

import BaseController from '../../base/base.controller';
import TicketService from '../../ticket/ticket.service';
import { TICKET_STATUS, CLOSED_TICKET_STATUSES } from '../../../../common/enums';

const emptyObjString = '{}';

class AdminTicketController extends BaseController {
  constructor() {
    super(TicketService);
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
      const result = await this.service.getAllForAdmin(query, option);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  getTicketActivity = async (req, res) => {
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

      const resolved = await this.service.getTicketCount({ ...queryCondition, status: TICKET_STATUS.RESOLVED });
      const pending = await this.service.getTicketCount({ ...queryCondition, status: TICKET_STATUS.IDLE });
      const processing = await this.service.getTicketCount({ ...queryCondition, status: TICKET_STATUS.PROCESSING });
      const closed = await this.service.getTicketCount({ ...queryCondition, status: { $in: CLOSED_TICKET_STATUSES } });
      return res.status(httpStatus.OK).send({
        resolved, pending, processing, closed,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new AdminTicketController(TicketService);

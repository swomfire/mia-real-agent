import BaseRouter from '../../base/base.route';
import AdminTicketController from './ticketWarning.controller';

class AdminTicketRouter extends BaseRouter {
  constructor() {
    super(AdminTicketController);
  }
}
export default new AdminTicketRouter(AdminTicketController);

import BaseRouter from '../base/base.route';
import TicketController from './ticket.controller';

class TicketRouter extends BaseRouter {
  constructor(controller) {
    super(controller);

    this.router.get('/:id/conversations', this.controller.getAllConversations); // get conversation by ticket id\
    this.router.get('/:id/profile', this.controller.getOwnerAndAssigneeProfile);
    this.router.post('/:id/find_agent', this.controller.findAvailableAgents);
    this.router.post('/:id/find_support_agent', this.controller.findAvailableSupportAgents);
    this.router.post('/:id/close', this.controller.closeTicket);
    this.router.post('/:id/rating', this.controller.rating);
  }
}
export default new TicketRouter(TicketController);

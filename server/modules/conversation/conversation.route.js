import BaseRouter from '../base/base.route';
import ConversationController from './conversation.controller';

class ConversationRouter extends BaseRouter {
  constructor(controller) {
    super(controller);

    this.router.get('/:id/replies', this.controller.getReplyMessages);
    this.router.get('/support/open', this.controller.getAllOpenSupport);

    this.router.post('/:id/end-support', this.controller.requestEndSupport);
    this.router.post('/:id/confirm-end', this.controller.confirmEndSupport);
  }
}

export default new ConversationRouter(ConversationController);

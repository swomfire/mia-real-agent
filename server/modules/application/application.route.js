import BaseRouter from '../base/base.route';
import ApplicationController from './application.controller';

class ApplicationRouter extends BaseRouter {
  constructor(controller) {
    super(controller);
    this.router.post('/:id/approve', this.controller.approveApplication);
    this.router.post('/:id/reject', this.controller.rejectApplication);
    this.router.post('/:id/review', this.controller.reviewApplication);
    this.router.get('/nickname/check', this.controller.checkNicknameExisted);
  }
}

export default new ApplicationRouter(ApplicationController);

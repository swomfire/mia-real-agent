import BaseRouter from '../base/base.route';
import SystemController from './system.controller';

class SystemRouter extends BaseRouter {
  constructor(controller) {
    super(controller);

    this.router.get('/version/current', this.controller.getCurrentVersion); // get conversation by ticket id\
  }
}

export default new SystemRouter(SystemController);

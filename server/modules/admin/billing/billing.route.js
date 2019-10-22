import BaseRouter from '../../base/base.route';
import BillingController from './billing.controller';

class AdminBillingRouter extends BaseRouter {
  constructor() {
    super(BillingController);
  }
}

export default new AdminBillingRouter();

import BaseController from '../base/base.controller';
import BillingService from './billing.service';

class BillingController extends BaseController {
  constructor() {
    super(BillingService);
  }
}

export default new BillingController();

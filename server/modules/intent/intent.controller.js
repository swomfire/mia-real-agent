import BaseController from '../base/base.controller';
import IntentService from './intent.service';

class IntentController extends BaseController {
  constructor() {
    super(IntentService);
  }
}

export default new IntentController();

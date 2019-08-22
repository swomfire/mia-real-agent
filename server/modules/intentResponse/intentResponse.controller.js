import BaseController from '../base/base.controller';
import IntentResponseService from './intentResponse.service';

class IntentResponseController extends BaseController {
  constructor() {
    super(IntentResponseService);
  }
}

export default new IntentResponseController();

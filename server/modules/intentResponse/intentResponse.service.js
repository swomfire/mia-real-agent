import intentResponseCollection from './intentResponse.model';
import BaseService from '../base/base.service';

class IntentResponseService extends BaseService {
  constructor() {
    super(intentResponseCollection);
  }
}

export default new IntentResponseService();

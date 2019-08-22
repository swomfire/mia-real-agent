import intentCollection from './intent.model';
import BaseService from '../base/base.service';

class IntentService extends BaseService {
  constructor() {
    super(intentCollection);
  }
}

export default new IntentService();

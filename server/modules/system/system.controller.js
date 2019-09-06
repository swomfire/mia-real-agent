import httpStatus from 'http-status';
import BaseController from '../base/base.controller';
import SystemService from './system.service';
class SystemController extends BaseController {
  constructor() {
    super(SystemService);
  }

  async getCurrentVersion(req, res) {
    try {
      const system = await SystemService.getCurrentVersion();
      return res.status(httpStatus.OK).send(system);
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new SystemController(SystemService);

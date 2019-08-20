import BaseRouter from '../base/base.route';
import UserController from './user.controller';
import { send, buildContent } from '../../mail-sparkpost/sparkpost';

class UserRouter extends BaseRouter {
  constructor() {
    super(UserController);
    this.router.get(
      '/:id',
      UserController.getUserProfile,
    );
    this.router.put(
      '/:id',
      UserController.updateUserProfile,
    );
    this.router.post(
      '/:id/changePassword',
      UserController.changePassword,
    );
    this.router.post(
      '/createPassword',
      UserController.createPassword,
    );
    this.router.post(
      '/checkPassword',
      UserController.checkPassword,
    );
    this.router.post(
      '/mail',
      () => {
        send(buildContent('test', 'testing'),
          [{ address: 'vucuongjim@gmail.com' }]);
      },
    );
  }
}

export default new UserRouter();

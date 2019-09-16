import BaseRouter from '../base/base.route';
import UserController from './user.controller';

class UserRouter extends BaseRouter {
  constructor() {
    super(UserController);
    this.router.get(
      '/:id',
      UserController.getUserProfile,
    );
    this.router.put(
      '/:id/profile',
      UserController.updateUserProfile,
    );
    this.router.post(
      '/:id/changePassword',
      UserController.changePassword,
    );
    this.router.post(
      '/:id/creditCard',
      UserController.addCreditCard,
    );

    this.router.delete(
      '/:id/creditCard',
      UserController.removeCard,
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
      UserController.sendTestMail,
    );
    this.router.post(
      '/upload',
      UserController.upload,
    );
  }
}

export default new UserRouter();

import passport from 'passport';
import { Router } from 'express';
import AuthController from './auth.controller';

class AuthRouter {
  constructor() {
    this.router = Router();
    this.router.post('/login', AuthController.login);
    this.router.post('/register', AuthController.register);
    this.router.get(
      '/register/send-verication-email/:email',
      AuthController.sendVericationEmail,
    );
    this.router.get('/verify/:token', AuthController.verifyAccount);

    this.router.get(
      '/login/facebook',
      passport.authenticate('facebook', {
        session: false,
        scope: ['email'],
      }),
    );

    this.router.get(
      '/login/facebook/callback',
      AuthController.loginWithFacebookCallback,
    );
    this.router.post(
      '/forgotPassword',
      AuthController.forgotPassword,
    );
  }
}

export default new AuthRouter();

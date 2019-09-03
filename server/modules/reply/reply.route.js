import { Router } from 'express';
import ReplyController from './reply.controller';

class ReplyRouter {
  constructor(controller) {
    this.router = Router();

    this.router.post('/', controller.insertReply);
    this.router.post('/warning', controller.insertWarning);
  }
}

export default new ReplyRouter(ReplyController);

import { Router } from 'express';
import AgentController from './agent.controller';

class AgentRouter {
  constructor(controller) {
    this.router = Router();
    this.router.post(
      '/:id/accept',
      controller.acceptRequest,
    );
  }
}

export default new AgentRouter(AgentController);

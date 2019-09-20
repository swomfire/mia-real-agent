import BaseRouter from '../base/base.route';
import ReviewController from './review.controller';

class ReviewRouter extends BaseRouter {
  constructor(controller) {
    super(controller);
    this.router.post('/token', this.controller.getByToken);
  }
}

export default new ReviewRouter(ReviewController);

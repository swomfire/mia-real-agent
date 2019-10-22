import { Router } from 'express';
import { ROLES } from '../../../common/enums';
import { allow } from '../../middlewares/verifyMiddlewares';

/* routers */
import TicketRouter from './ticket/ticket.route';
import TicketWarningRouter from './ticketWarning/ticketWarning.route';
import UserRouter from './user/user.route';
import ApplicationRouter from './application/application.route';
import BillingRouter from './billing/billing.route';
import CannedResponseRouter from '../canned-response/canned-response.route';

const router = Router();

router.use(allow(ROLES.ADMIN));
router.use('/tickets', TicketRouter.router);
router.use('/tickets-warning', TicketWarningRouter.router);
router.use('/applications', ApplicationRouter.router);
router.use('/users', UserRouter.router);
router.use('/billings', BillingRouter.router);
router.use('/canned-responses', CannedResponseRouter.router);

export default { router };

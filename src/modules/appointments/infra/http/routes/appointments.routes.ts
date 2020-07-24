import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController';
import ensureMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticate';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureMiddleware);

appointmentsRouter.get('/', AppointmentsController.index);

appointmentsRouter.post('/', AppointmentsController.create);

export default appointmentsRouter;

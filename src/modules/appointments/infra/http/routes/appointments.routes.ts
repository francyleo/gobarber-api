import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

import ensureMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticate';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureMiddleware);

appointmentsRouter.post('/', AppointmentsController.create);

appointmentsRouter.get('/me', ProviderAppointmentsController.index);

export default appointmentsRouter;

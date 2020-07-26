import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

import ensureMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticate';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureMiddleware);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  AppointmentsController.create,
);

appointmentsRouter.get('/me', ProviderAppointmentsController.index);

export default appointmentsRouter;

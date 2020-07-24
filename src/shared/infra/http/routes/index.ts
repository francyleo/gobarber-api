import { Router } from 'express';

import appointmenstsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmenstsRouter);
routes.use('/users', usersRouter);

export default routes;

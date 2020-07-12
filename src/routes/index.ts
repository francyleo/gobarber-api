import { Router } from 'express';

import appointmenstsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmenstsRouter);
routes.use('/users', usersRouter);

export default routes;

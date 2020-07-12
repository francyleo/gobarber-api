import { Router } from 'express';

import appointmenstsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmenstsRouter);

export default routes;

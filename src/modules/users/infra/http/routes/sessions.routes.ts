import { Router } from 'express';

import SessionController from '../controllers/SessionsController';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionController.create);

export default sessionsRouter;

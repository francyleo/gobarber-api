import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController';
import ensureMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticate';

const providersRouter = Router();

providersRouter.use(ensureMiddleware);

providersRouter.get('/', ProvidersController.index);

export default providersRouter;

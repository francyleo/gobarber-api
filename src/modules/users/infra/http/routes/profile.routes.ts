import { Router } from 'express';

import ensureMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticate';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

profileRouter.use(ensureMiddleware);

profileRouter.put('/', ProfileController.update);

export default profileRouter;

import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController';
import ProvidersDayAvailabilityController from '../controllers/ProvidersDayAvailabilityController';
import ProvidersMonthAvailabilityController from '../controllers/ProvidersMonthAvailabilityController';
import ensureMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticate';

const providersRouter = Router();

providersRouter.use(ensureMiddleware);

providersRouter.get('/', ProvidersController.index);

providersRouter.get(
  '/:provider_id/day-availability',
  ProvidersDayAvailabilityController.index,
);

providersRouter.get(
  '/:provider_id/month-availability',
  ProvidersMonthAvailabilityController.index,
);

export default providersRouter;

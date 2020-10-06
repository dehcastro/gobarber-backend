import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import providersController from '../controllers/ProvidersController';
import providerMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import providerDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:provider_id/month-availability',
    providerMonthAvailabilityController.index,
);
providersRouter.get(
    '/:provider_id/day-availability',
    providerDayAvailabilityController.index,
);

export default providersRouter;

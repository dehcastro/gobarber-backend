import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import appointmentsController from '../controllers/AppointmentsController';
import providerAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentsController.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a null appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();

        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            provider_id: '123456',
            date: new Date(),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    });

    // it('should not be able to create two appointments at the same time', () => {

    // })
});

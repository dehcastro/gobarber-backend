import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: new Date(2020, 9, 10, 13),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider_id');
    });

    it('should not be able to create two appointments at the same time', async () => {
        const appointmentDate = new Date(2020, 9, 15, 12);

        await createAppointment.execute({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: appointmentDate,
        });

        await expect(
            createAppointment.execute({
                provider_id: 'provider_id',
                user_id: 'user_id',
                date: appointmentDate,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                provider_id: 'provider_id',
                user_id: 'user_id',
                date: new Date(2020, 9, 10, 11),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with same user and provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                provider_id: 'same_id',
                user_id: 'same_id',
                date: new Date(2020, 9, 10, 13),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment out of business hours (8am - 5pm)', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                provider_id: 'provider_id',
                user_id: 'user_id',
                date: new Date(2020, 9, 11, 7),
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                provider_id: 'provider_id',
                user_id: 'user_id',
                date: new Date(2020, 9, 11, 18),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

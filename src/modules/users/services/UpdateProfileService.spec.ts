import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it("should be able to update an user's profile", async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@email.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@email.com',
        });

        expect(updatedUser.name).toBe('John Trê');
        expect(updatedUser.email).toBe('johntre@email.com');
    });

    it("should not be able to update a non-existing user's profile", async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-existing user id',
                name: 'Test',
                email: 'test@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change email to an existing one', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@email.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@email.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'john@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to update an user's password", async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@email.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@email.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it("should not be able to update an user's password without informing the old one", async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@email.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@email.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to update an user's password informing a wrong old one", async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@email.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'john@email.com',
                old_password: 'wrong old password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

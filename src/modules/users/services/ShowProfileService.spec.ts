import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfile = new ShowProfileService(fakeUsersRepository);
    });

    it("should be able to show an user's profile", async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@email.com',
            password: '123456',
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('john@email.com');
    });

    it("should not be able to show a non-existing user's profile", async () => {
        await expect(
            showProfile.execute({
                user_id: 'non-existing user id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

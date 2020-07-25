import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ShowProfileService from './ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('teste');
    expect(profile.email).toBe('teste@gobarber.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing-user' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

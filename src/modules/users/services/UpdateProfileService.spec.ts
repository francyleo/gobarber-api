import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste2',
      email: 'teste2@gobarber.com',
    });

    expect(updatedUser.name).toBe('teste2');
    expect(updatedUser.email).toBe('teste2@gobarber.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'teste',
        email: 'teste@gobarber.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change e-mail to another user e-mail', async () => {
    await fakeUserRepository.create({
      name: 'teste1',
      email: 'teste1@gobarber.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'teste2',
      email: 'teste2@gobarber.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste1@gobarber.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste2',
      email: 'teste2@gobarber.com',
      old_password: '123456',
      password: '654321',
    });

    expect(updatedUser.password).toBe('654321');
  });

  it('should not be able to update the password without old_password', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste2@gobarber.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste2@gobarber.com',
        old_password: 'wrong-old-password',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import FakeBCryptHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import CreateUserService from './CreateUserSevice';
import AppError from '@shared/errors/AppError';

describe('CreateUserService', () => {
  it('should be able to create new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeBCryptHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('teste');
    expect(user.email).toBe('teste@gobarber.com');
  });

  it('should not be able to create user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeBCryptHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'teste',
        email: 'teste@gobarber.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

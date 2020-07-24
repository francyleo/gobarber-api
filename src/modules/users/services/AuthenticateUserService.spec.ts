import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeBCryptHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserSevice';
import AppError from '@shared/errors/AppError';

describe('AthenticateUserService', () => {
  it('should be able to athenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeBCryptHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const athenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    const response = await athenticateUser.execute({
      email: 'teste@gobarber.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to athenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeBCryptHashProvider();

    const athenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await expect(
      athenticateUser.execute({
        email: 'teste@gobarber.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to athenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeBCryptHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const athenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    expect(
      athenticateUser.execute({
        email: 'teste@gobarber.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

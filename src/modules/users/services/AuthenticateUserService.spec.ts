import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserSevice';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let athenticateUser: AuthenticateUserService;

describe('AthenticateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    athenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to athenticate', async () => {
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
    await expect(
      athenticateUser.execute({
        email: 'teste@gobarber.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to athenticate with wrong password', async () => {
    await createUser.execute({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    await expect(
      athenticateUser.execute({
        email: 'teste@gobarber.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import CreateUserService from './CreateUserSevice';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create new user', async () => {
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
    await createUserService.execute({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'teste',
        email: 'teste@gobarber.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import ResetPasswordService from './ResetPasswordService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepostitory';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to resert password', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '654321',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generatehash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      token,
      password: '123456',
    });

    const updatedUser = await fakeUserRepository.findByid(user.id);

    expect(generatehash).toHaveBeenCalledWith('123456');
    expect(updatedUser?.password).toBe('123456');
  });

  it('should not be able to reset the password with non-exists token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-exists-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-exists user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-exists-user',
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to resert password if passe more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gobarber.com',
      password: '654321',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

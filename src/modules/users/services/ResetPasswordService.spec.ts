import ResetPasswordService from './ResetPasswordService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepostitory';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmailService', () => {
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

    await resetPasswordService.execute({
      token,
      password: '123456',
    });

    const updatedUser = await fakeUserRepository.findByid(user.id);

    expect(updatedUser?.password).toBe('123456');
  });

  it('should', () => {});
});

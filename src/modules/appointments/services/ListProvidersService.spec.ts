import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to show providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'teste1',
      email: 'teste1@gobarber.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'teste2',
      email: 'teste2@gobarber.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'teste3',
      email: 'teste3@gobarber.com',
      password: '123456',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});

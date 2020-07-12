import { Router } from 'express';
import CreateUserService from '../services/CreateUserSevice';
import User from '../models/User';

import { getRepository } from 'typeorm';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  return response.status(201).json(user);
});

export default usersRouter;

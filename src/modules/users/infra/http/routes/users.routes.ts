import { Router } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserSevice';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticate';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({ name, email, password });

  return response.status(201).json(user);
});

usersRouter.patch(
  '/avatar',
  ensureMiddleware,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);
export default usersRouter;

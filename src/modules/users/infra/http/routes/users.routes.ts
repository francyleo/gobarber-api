import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureMiddleware from '@modules/users/infra/http/middleware/ensureAuthenticate';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', UsersController.create);

usersRouter.patch(
  '/avatar',
  ensureMiddleware,
  upload.single('avatar'),
  UserAvatarController.update,
);
export default usersRouter;

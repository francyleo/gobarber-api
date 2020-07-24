import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import uplodaConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uplodaConfig.directory));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Iternal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server on in port 3333!');
});
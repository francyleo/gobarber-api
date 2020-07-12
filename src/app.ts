import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import routes from './routes';
import uplodaConfig from './config/upload';

import './database';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uplodaConfig.directory));

app.use(routes);

export default app;

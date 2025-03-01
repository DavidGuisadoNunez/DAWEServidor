import express from 'express';
import morgan from 'morgan';

import indexRouter from '../routes/index.js';
import logger from '../utils/logger.js';
import { loggerMiddleware } from '../middleware/loggerMiddleware.js';
import { errorHandlingMiddleware } from '../middleware/errorHandlingMiddleware.js';

export default function (app) {
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(loggerMiddleware);

  app.use(express.json());

  app.use('/', indexRouter);

  app.use(errorHandlingMiddleware);
}

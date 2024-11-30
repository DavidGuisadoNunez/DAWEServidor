import logger from '../utils/logger.js';

export function middlewareController(req, res) {
  logger.info('controller');
  res.status(200).send({ message: 'middleware' });
}

export function errorController(req, res, next) {
  try {
    throw Error('Boom!');
  } catch (error) {
    next(error);
  }
}

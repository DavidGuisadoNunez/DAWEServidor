import logger from '../utils/logger.js';
export function logDate (req, res, next) {
  logger.info(`[${new Date().toISOString()}] ${req.path}`);
  next();
}

export function logMDW (req, res, next) {
  logger.warn('middleware');
  next();
}

import logger from '../utils/logger.js';
export default function errorHandler (err, req, res, next) {
  const status = err.status || 500;
  logger.error(`[${status}] ${err.message}`);
  res.status(status || 500).send({
    code: status,
    message: err.message
  });
}

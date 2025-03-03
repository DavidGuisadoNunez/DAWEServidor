import logger from '../utils/logger.js';

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  logger.error(`❌ [${req.method}] ${req.originalUrl} | ${statusCode} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;

import morgan from 'morgan';
import logger from '../utils/logger.js';

// Configurar Morgan para usar Winston
const stream = {
  write: (message) => logger.info(message.trim()), // Registrar logs en Winston
};

// Formato de los logs HTTP (Morgan)
const morganMiddleware = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  { stream }
);

export default morganMiddleware;

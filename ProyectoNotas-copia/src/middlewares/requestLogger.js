import logger from '../utils/logger.js';

const requestLogger = (req, res, next) => {
  const { method, url, body, query, params } = req;
  const message = `Request: ${method} ${url} - Body: ${JSON.stringify(body)} - Query: ${JSON.stringify(query)} - Params: ${JSON.stringify(params)}`;
  logger.info(message);
  next();
};

export default requestLogger;

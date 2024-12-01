import winston  from 'winston';
import winstonConfig from '../config/winston.js';

const logger = winston.createLogger(winstonConfig);

export default logger;

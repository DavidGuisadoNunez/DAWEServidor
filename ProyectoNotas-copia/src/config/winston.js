import winston from 'winston';

const { format, transports, createLogger } = winston;

const {
  combine, timestamp, printf, colorize,
} = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    colorize(),
    printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/server.log' })
  ],
  exitOnError: false,
});

export default logger;

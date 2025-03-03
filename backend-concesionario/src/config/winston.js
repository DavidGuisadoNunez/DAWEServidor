import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { format, transports, createLogger } = winston;
const { combine, timestamp, printf, colorize } = format;

// Formato de los logs
const logFormat = printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Configurar Winston con rotación de logs diarios
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: path.join('logs', 'server-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  level: process.env.LOG_LEVEL || 'info',
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    logFormat
  ),
  transports: [
    new transports.Console(), // Mostrar logs en consola
    dailyRotateFileTransport, // Guardar logs en archivos diarios
    new transports.File({ filename: path.join('logs', 'errors.log'), level: 'error' }),
  ],
  exitOnError: false,
});

export default logger;

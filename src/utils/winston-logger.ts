const winston = require('winston');
require('winston-daily-rotate-file');

require('dotenv').config()

const LOGGING_PATH = process.env.LOGGING_PATH || 'logs/';

const transport = new winston.transports.DailyRotateFile({
  filename: `${LOGGING_PATH}combined-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '50m',
  maxFiles: '10d',
});

const transportError = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: `${LOGGING_PATH}error-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '50m',
  maxFiles: '20d'
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
),
  transports: [
    transport, transportError
  ],
});

//
// If we're not in production then log to the `console`. 
//
// if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
// }
export default logger
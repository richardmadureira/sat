const winston = require('winston');
const config = require('../../config');

const logger = winston.createLogger({
  level: config.logLevel,
  format: config.logFormat,
  defaultMeta: { service: 'backend' },
  transports: [
    new winston.transports.File({ filename: config.errorLogFile, level: config.errorLogLevel }),
    new winston.transports.File({ filename: config.logFile })
  ],
  timestamp: true
});

winston.addColors({ error: 'red', warn: 'yellow', info: 'cyan', debug: 'green' });

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = logger;

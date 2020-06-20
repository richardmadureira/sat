const rc = require('rc');
const winston = require('winston');

const defaultConfig = {
  logLevel: 'silly',
  logFile: 'logs/backend.log',
  errorLogLevel: 'error',
  errorLogFile: 'logs/error.log',
  logFormat: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), winston.format.json()),
  restPort: 3333,

  jwtSecret: 'mySecret',
  jwtAlgorithm: 'RS256',
  jwtExpiresIn: 60 * 60,

  // apenas para o aws
  awsAccessKeyId: '',
  awsSecretAccessKey: '',
  awsDefaultRegion: 'us-east-1',
  mailConfig: {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e39149a0f9cad3",
      pass: "4214276ed77553"
    }
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
};

module.exports = rc('sat', defaultConfig);

const logger = require('../config/logger');

module.exports = function logErrors(err, req, res, next) {
  logger.error(err.stack);
  next(err);
};

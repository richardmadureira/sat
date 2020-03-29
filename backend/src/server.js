const config = require('./config');
const app = require('./app');
const logger = require('./config/logger');

app.listen(config.restPort, () => logger.info(`Backend iniciado na porta ${config.restPort}`));

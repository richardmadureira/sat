const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const logErrors = require('./middlewares/logErrors');

const app = express();

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.disable('x-powered-by');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(routes);
app.use(errors());
app.use(logErrors);

module.exports = app;

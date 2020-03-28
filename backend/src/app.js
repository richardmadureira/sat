const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { errors } = require('celebrate');

const app = express();
app.disable('x-powered-by');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(routes);
app.use(errors());

module.exports = app;

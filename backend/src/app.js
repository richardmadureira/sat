const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const logErrors = require('./middlewares/logErrors');

const app = express();
// app.use(function(req,res,next){setTimeout(next,1000)}); //para simular delay para ver o loading (apenas para testes)...
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(cors({ exposedHeaders: 'X-Total-Count' }));
app.use(helmet());
app.use(routes);
app.use(errors());
app.use(logErrors);

module.exports = app;

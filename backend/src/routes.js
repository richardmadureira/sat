const express = require('express');
const { validateCreateEstacao, validateUpdateEstacao, validateDeleteEstacao} = require('./database/validations');

const EstacaoController = require('./controllers/EstacaoController');

const routes = express.Router();

routes.post('/estacoes', validateCreateEstacao(), EstacaoController.create);
routes.put('/estacoes/:id', validateUpdateEstacao(), EstacaoController.update);
routes.delete('/estacoes/:id', validateDeleteEstacao(), EstacaoController.delete);
routes.get('/estacoes/:id', EstacaoController.findById);
routes.get('/estacoes', EstacaoController.findAll);

routes.post('/')

module.exports = routes;


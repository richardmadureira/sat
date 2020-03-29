const express = require('express');
const EstacaoController = require('./controllers/EstacaoController');
const {
  validateCreate,
  validateUpdate,
  validateDelete,
  validateFindById,
  validateFindAll
} = require('./database/validations/estacao-validations');

const routes = express.Router();

routes.post('/estacoes', validateCreate(), EstacaoController.create);
routes.put('/estacoes/:id', validateUpdate(), EstacaoController.update);
routes.delete('/estacoes/:id', validateDelete(), EstacaoController.delete);
routes.get('/estacoes/:id', validateFindById(), EstacaoController.findById);
routes.get('/estacoes', validateFindAll(), EstacaoController.findAll);

module.exports = routes;

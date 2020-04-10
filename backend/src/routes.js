const express = require('express');
const EstacaoController = require('./controllers/EstacaoController');
const GrupoServicoController = require('./controllers/GrupoServicoController');
const estacaoValidation = require('./database/validations/estacao-validations');
const grupoServicoValidation = require('./database/validations/grupo-servico-validations');

const routes = express.Router();

// Estações
routes.post('/estacoes', estacaoValidation.validateCreate(), EstacaoController.create);
routes.put('/estacoes/:id', estacaoValidation.validateUpdate(), EstacaoController.update);
routes.delete('/estacoes/:id', estacaoValidation.validateDelete(), EstacaoController.delete);
routes.get('/estacoes/:id', estacaoValidation.validateFindById(), EstacaoController.findById);
routes.get('/estacoes', estacaoValidation.validateFindAll(), EstacaoController.findAll);
// Grupos de Serviços
routes.post('/grupos-servicos', grupoServicoValidation.validateCreate(), GrupoServicoController.create);
routes.put('/grupos-servicos/:id', grupoServicoValidation.validateUpdate(), GrupoServicoController.update);
routes.delete('/grupos-servicos/:id', grupoServicoValidation.validateDelete(), GrupoServicoController.delete);
routes.get('/grupos-servicos/:id', grupoServicoValidation.validateFindById(), GrupoServicoController.findById);
routes.get('/grupos-servicos', grupoServicoValidation.validateFindAll(), GrupoServicoController.findAll);

module.exports = routes;

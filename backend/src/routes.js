const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const EstacaoController = require('./controllers/EstacaoController');
const GrupoServicoController = require('./controllers/GrupoServicoController');
const ServicoController = require('./controllers/ServicoController');
const PainelController = require('./controllers/PainelController');
const AtendenteController = require('./controllers/AtendenteController');

const estacaoValidation = require('./database/validations/estacao-validations');
const grupoServicoValidation = require('./database/validations/grupo-servico-validations');
const servicoValidation = require('./database/validations/servico-validations');
const painelValidation = require('./database/validations/painel-validations');
const atendenteValidation = require('./database/validations/atendente-validations');

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
// Serviços
routes.post('/grupos-servicos/:idGrupoServico', servicoValidation.validateCreate(), ServicoController.create);
routes.put('/servicos/:id', servicoValidation.validateUpdate(), ServicoController.update);
routes.delete('/servicos/:id', servicoValidation.validateDelete(), ServicoController.delete);
routes.get('/servicos/:id', servicoValidation.validateFindById(), ServicoController.findById);
routes.get('/servicos', servicoValidation.validateFindAll(), ServicoController.findAll);
// Painéis
routes.post('/paineis', painelValidation.validateCreate(), PainelController.create);
routes.put('/paineis/:id', painelValidation.validateUpdate(), PainelController.update);
routes.delete('/paineis/:id', painelValidation.validateDelete(), PainelController.delete);
routes.get('/paineis/:id', painelValidation.validateFindById(), PainelController.findById);
routes.get('/paineis', painelValidation.validateFindAll(), PainelController.findAll);
// Atendentes
routes.post('/atendentes', atendenteValidation.validateCreate(), multer(multerConfig).single('foto'), AtendenteController.create);
routes.get('/atendentes/:id', atendenteValidation.validateFindById(), AtendenteController.findById);
routes.get('/atendentes', atendenteValidation.validateFindAll(), AtendenteController.findAll);
routes.put('/atendentes/:id', atendenteValidation.validateUpdate(), multer(multerConfig).single('foto'), AtendenteController.update);
routes.delete('/atendentes/:id', atendenteValidation.validateDelete(), AtendenteController.delete);
module.exports = routes;

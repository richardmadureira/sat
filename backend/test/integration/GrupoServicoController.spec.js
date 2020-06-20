const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Grupos de Serviços', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await connection.seed.run();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Deve listar Todas os grupos de serviços', async () => {
    const response = await request(app).get('/grupos-servicos/pesquisa');
    const arrayEsperado = [
      { id: 1, nome: 'Nome do Grupo de Serviço 1', sigla: 'GS1', descricao: 'Descrição do grupo de serviço 1', ativo: true },
      { id: 2, nome: 'Nome do Grupo de Serviço 2', sigla: 'GS2', descricao: 'Descrição do grupo de serviço 2', ativo: true },
      { id: 3, nome: 'Nome do Grupo de Serviço 3', sigla: 'GS3', descricao: 'Descrição do grupo de serviço 3', ativo: true },
      { id: 4, nome: 'Nome do Grupo de Serviço 4', sigla: 'GS4', descricao: 'Descrição do grupo de serviço 4', ativo: true },
      { id: 5, nome: 'Nome do Grupo de Serviço 5', sigla: 'GS5', descricao: 'Descrição do grupo de serviço 5', ativo: true }
    ];
    expect(response.header['x-total-count']).toBe('6');
    expect(response.header['x-page-number']).toBe('1');
    expect(response.header['x-page-size']).toBe('5');
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
  });

  it('Deve listar Todos os grupos de serviço inativos', async () => {
    const response = await request(app).get('/grupos-servicos/pesquisa').send({ ativo: false });
    const arrayEsperado = [
      { id: 6, nome: 'Nome do Grupo de Serviço 6', sigla: 'GS6', descricao: 'Descrição do grupo de serviço 6', ativo: false }
    ];
    expect(response.header['x-total-count']).toBe('1');
    expect(response.header['x-page-number']).toBe('1');
    expect(response.header['x-page-size']).toBe('5');
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
  });

  it('Deve listar 2 primeiros grupos de serviços', async () => {
    const response = await request(app).get('/grupos-servicos/pesquisa?page=1&size=2');
    const arrayEsperado = [
      { id: 1, nome: 'Nome do Grupo de Serviço 1', sigla: 'GS1', descricao: 'Descrição do grupo de serviço 1', ativo: true },
      { id: 2, nome: 'Nome do Grupo de Serviço 2', sigla: 'GS2', descricao: 'Descrição do grupo de serviço 2', ativo: true }
    ];
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
    expect(response.header['x-total-count']).toEqual('6');
    expect(response.header['x-page-number']).toEqual('1');
    expect(response.header['x-page-size']).toEqual('2');
  });

  it('Deve retornar grupo de serviço pesquisado pelo id', async () => {
    const id = 1;
    const response = await request(app).get(`/grupos-servicos/${id}`);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('sigla');
    expect(response.body).toHaveProperty('descricao');
    expect(response.body).toHaveProperty('ativo');
    expect(response.body.id).toEqual(id);
    expect(response.body.nome).toEqual('Nome do Grupo de Serviço 1');
    expect(response.body.sigla).toEqual('GS1');
    expect(response.body.descricao).toEqual('Descrição do grupo de serviço 1');
    expect(response.body.ativo).toEqual(true);
  });

  it('Deve cadastrar novo grupo de serviço', async () => {
    const nome = 'Nome do Grupo de Serviço 7';
    const sigla = 'GS7';
    const descricao = 'Descrição do grupo de serviço 7';
    const ativo = true;
    const response = await request(app).post('/grupos-servicos').send({ nome, sigla, descricao, ativo });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('sigla');
    expect(response.body).toHaveProperty('descricao');
    expect(response.body).toHaveProperty('ativo');
    expect(response.body.id).toEqual(7);
    expect(response.body.nome).toEqual('Nome do Grupo de Serviço 7');
    expect(response.body.sigla).toEqual('GS7');
    expect(response.body.descricao).toEqual('Descrição do grupo de serviço 7');
    expect(response.body.ativo).toEqual(true);
  });

  it('Deve atualizar grupo de serviço existente', async () => {
    const id = 1;
    const ativo = false;
    const response = await request(app).put(`/grupos-servicos/${id}`).send({ ativo });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('sigla');
    expect(response.body).toHaveProperty('descricao');
    expect(response.body).toHaveProperty('ativo');
    expect(response.body.id).toEqual(id);
    expect(response.body.nome).toEqual('Nome do Grupo de Serviço 1');
    expect(response.body.sigla).toEqual('GS1');
    expect(response.body.descricao).toEqual('Descrição do grupo de serviço 1');
    expect(response.body.ativo).toEqual(ativo);
  });

  it('Deve dar erro de validação "nome" não informado', async () => {
    const grupoServico = { sigla: 'GS', descricao: 'Descrição do grupo de serviço', ativo: true };
    const response = await request(app).post('/grupos-servicos').send(grupoServico);
    expect(response.body.statusCode).toEqual(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe('"nome" is required');
  });

  it('Deve dar erro de validação "sigla" não informado', async () => {
    const grupoServico = { nome: 'Nome do Grupo de Serviço', descricao: 'Descrição do grupo de serviço', ativo: true };
    const response = await request(app).post('/grupos-servicos').send(grupoServico);
    expect(response.body.statusCode).toEqual(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe('"sigla" is required');
  });

  it('Deve dar erro de validação "descricao" não informado', async () => {
    const grupoServico = { nome: 'Nome do Grupo de Serviço', sigla: 'GS', ativo: true };
    const response = await request(app).post('/grupos-servicos').send(grupoServico);
    expect(response.body.statusCode).toEqual(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe('"descricao" is required');
  });

  it('Deve dar erro de validação "ativo" não informado', async () => {
    const grupoServico = { nome: 'Nome do Grupo de Serviço', sigla: 'GS', descricao: 'Descrição do grupo de serviço' };
    const response = await request(app).post('/grupos-servicos').send(grupoServico);
    expect(response.body.statusCode).toEqual(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe('"ativo" is required');
  });

  it('Deve excluir grupo de serviço', async () => {
    const id = 1;
    const response = await request(app).delete(`/grupos-servicos/${id}`);
    expect(response.status).toEqual(204);
  });
});

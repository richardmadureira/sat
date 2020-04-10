const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Estacoes', () => {

  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await connection.seed.run();
  });

  afterEach(async () => {
    await connection.raw('delete from estacoes');
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Deve listar Todas as estações', async () => {
    const response = await request(app).get('/estacoes');
    const arrayEsperado = [
      { id: 1, tipoEstacao: 'MESA', numero: 1 },
      { id: 2, tipoEstacao: 'GUICHE', numero: 2 },
      { id: 3, tipoEstacao: 'SALA', numero: 3 }
    ];
    expect(response.header['x-total-count']).toBe('3');
    expect(response.header['x-page-number']).toBe('1');
    expect(response.header['x-page-size']).toBe('5');
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
  });

  it('Deve listar Todas as estações to tipo MESA', async () => {
    const response = await request(app).get('/estacoes').send({ tipoEstacao: 'MESA' });
    const arrayEsperado = [{ id: 1, tipoEstacao: 'MESA', numero: 1 }];
    expect(response.header['x-total-count']).toBe('1');
    expect(response.header['x-page-number']).toBe('1');
    expect(response.header['x-page-size']).toBe('5');
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
  });

  it('Deve listar 2 primeiras estacoes', async () => {
    const response = await request(app).get('/estacoes?page=1&size=2');
    const arrayEsperado = [
      { id: 1, tipoEstacao: 'MESA', numero: 1 },
      { id: 2, tipoEstacao: 'GUICHE', numero: 2 }
    ];
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
    expect(response.header['x-total-count']).toEqual('3');
    expect(response.header['x-page-number']).toEqual('1');
    expect(response.header['x-page-size']).toEqual('2');
  });

  it('Deve retornar estacao pesquisada pelo id', async () => {
    const id = 1;
    const response = await request(app).get(`/estacoes/${id}`);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('tipoEstacao');
    expect(response.body).toHaveProperty('numero');
    expect(response.body.id).toEqual(id);
    expect(response.body.tipoEstacao).toEqual('MESA');
    expect(response.body.numero).toEqual(1);
  });

  it('Deve cadastrar nova estação', async () => {
    const tipoEstacao = 'GUICHE';
    const numero = 24;
    const response = await request(app).post('/estacoes').send({ tipoEstacao, numero });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('tipoEstacao');
    expect(response.body).toHaveProperty('numero');
    expect(response.body.id).toEqual(4);
    expect(response.body.tipoEstacao).toBe(tipoEstacao);
    expect(response.body.numero).toBe(numero);
  });

  it('Deve atualizar estacao existente', async () => {
    const id = 1;
    const numero = 111;
    const response = await request(app).put(`/estacoes/${id}`).send({ numero });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('numero');
    expect(response.body.id).toEqual(id);
    expect(response.body.numero).toBe(numero);
  });

  it('Deve dar erro de validação "tipoEstacao" não informado', async () => {
    const estacao = { numero: 24 };
    const response = await request(app).post('/estacoes').send(estacao);
    expect(response.body.statusCode).toEqual(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe('"tipoEstacao" is required');
  });

  it('Deve dar erro de validação "numero" não informado', async () => {
    const estacao = { tipoEstacao: 'MESA' };
    const response = await request(app).post('/estacoes').send(estacao);
    expect(response.body.statusCode).toEqual(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe('"numero" is required');
  });

  it('Deve excluir estação', async () => {
    const id = 1;
    const response = await request(app).delete(`/estacoes/${id}`);
    expect(response.status).toEqual(204);
  });
});

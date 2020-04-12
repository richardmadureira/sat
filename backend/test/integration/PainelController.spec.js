const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Painéis', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await connection.seed.run();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Deve listar todos os painéis', async () => {
    const response = await request(app).get('/paineis');
    const arrayEsperado = [
      { id: 1, nome: 'Painel 1', descricao: 'Descrição do painel 1', mensagem: 'Mensagem do painel 1', ativo: true },
      { id: 2, nome: 'Painel 2', descricao: 'Descrição do painel 2', mensagem: 'Mensagem do painel 2', ativo: true },
      { id: 3, nome: 'Painel 3', descricao: 'Descrição do painel 3', mensagem: 'Mensagem do painel 3', ativo: false }
    ];
    expect(response.header['x-total-count']).toBe('3');
    expect(response.header['x-page-number']).toBe('1');
    expect(response.header['x-page-size']).toBe('5');
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
  });

  it('Deve listar todos os painéis inativos', async () => {
    const response = await request(app).get('/paineis').send({ ativo: false });
    const arrayEsperado = [{ id: 3, nome: 'Painel 3', descricao: 'Descrição do painel 3', mensagem: 'Mensagem do painel 3', ativo: false }];
    expect(response.header['x-total-count']).toBe('1');
    expect(response.header['x-page-number']).toBe('1');
    expect(response.header['x-page-size']).toBe('5');
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
  });

  it('Deve listar 2 primeiros painéis', async () => {
    const response = await request(app).get('/paineis?page=1&size=2');
    const arrayEsperado = [
      { id: 1, nome: 'Painel 1', descricao: 'Descrição do painel 1', mensagem: 'Mensagem do painel 1', ativo: true },
      { id: 2, nome: 'Painel 2', descricao: 'Descrição do painel 2', mensagem: 'Mensagem do painel 2', ativo: true },
    ];
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
    expect(response.header['x-total-count']).toEqual('3');
    expect(response.header['x-page-number']).toEqual('1');
    expect(response.header['x-page-size']).toEqual('2');
  });

  it('Deve retornar painel pesquisada pelo id', async () => {
    const id = 1;
    const response = await request(app).get(`/paineis/${id}`);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('descricao');
    expect(response.body).toHaveProperty('mensagem');
    expect(response.body).toHaveProperty('ativo');
    expect(response.body.id).toEqual(id);
    expect(response.body.nome).toEqual('Painel 1');
    expect(response.body.descricao).toEqual('Descrição do painel 1');
    expect(response.body.mensagem).toEqual('Mensagem do painel 1');
    expect(response.body.ativo).toEqual(true);
  });

  it('Deve cadastrar novo painel', async () => {
    const nome = 'Nome do Painel';
    const descricao = "Descrição do painel";
    const mensagem = "Mensagem do painel";
    const ativo = true;
    const listaIdsServicos = [ 1, 2, 3, 4, 5, 6];

    const response = await request(app).post('/paineis').send({ nome, descricao, mensagem, ativo, listaIdsServicos });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('descricao');
    expect(response.body).toHaveProperty('mensagem');
    expect(response.body).toHaveProperty('ativo');
    expect(response.body.id).toEqual(4);
    expect(response.body.nome).toBe(nome);
    expect(response.body.descricao).toBe(descricao);
    expect(response.body.mensagem).toBe(mensagem);
    expect(response.body.ativo).toBe(ativo);
  });

  it('Deve atualizar painel existente', async () => {
    const id = 1;
    const ativo = true;
    const listaIdsServicos = [1];
    const response = await request(app).put(`/paineis/${id}`).send({ ativo: ativo, listaIdsServicos });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('descricao');
    expect(response.body).toHaveProperty('mensagem');
    expect(response.body).toHaveProperty('ativo');
    expect(response.body).toHaveProperty('listaIdsServicos');
    expect(response.body.id).toEqual(id);
    expect(response.body.nome).toBe("Painel 1");
    expect(response.body.descricao).toBe("Descrição do painel 1");
    expect(response.body.mensagem).toBe("Mensagem do painel 1");
    expect(response.body.ativo).toBe(ativo);
    expect(response.body.listaIdsServicos).toEqual(expect.arrayContaining(listaIdsServicos));
  });

  // it('Deve dar erro de validação "nome" não informado', async () => {
  //   const painel = { descricao: 'Descrição do painel', mensagem: 'Mensagem do painel', ativo: true };
  //   const response = await request(app).post('/paineis').send(painel);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"nome" is required');
  // });

  // it('Deve dar erro de validação "descricao" não informado', async () => {
  //   const painel = { nome: 'Nome do Painel', mensagem: 'Mensagem do painel', ativo: true };
  //   const response = await request(app).post('/paineis').send(painel);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"descricao" is required');
  // });

  // it('Deve dar erro de validação "mensagem" não informado', async () => {
  //   const painel = { nome: 'Nome do Painel', descricao: 'Descrição do painel', ativo: true };
  //   const response = await request(app).post('/paineis').send(painel);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"mensagem" is required');
  // });

  // it('Deve dar erro de validação "ativo" não informado', async () => {
  //   const painel = { nome: 'Nome do Painel', descricao: 'Descrição do painel', mensagem: 'Mensagem do painel'};
  //   const response = await request(app).post('/paineis').send(painel);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"ativo" is required');
  // });

  // it('Deve excluir painel', async () => {
  //   const id = 1;
  //   const response = await request(app).delete(`/paineis/${id}`);
  //   expect(response.status).toEqual(204);
  // });
});

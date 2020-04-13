const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Atendentes', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await connection.seed.run();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Deve listar todos os atendentes', async () => {
    const response = await request(app).get('/atendentes');
    const arrayEsperado = [
      {
        id: 1,
        cpf: 1,
        nome: 'Nome do Atendente 1',
        email: 'nome.atendente1@email.com',
        sexo: 'Masculino',
        dataNascimento: new Date('2019-12-31 00:00:00').toISOString(),
        username: 'nome1.atendente',
        password: '123456',
        foto: 'http://localhost:3333/files/atendente1.png'
      },
      {
        id: 2,
        cpf: 2,
        nome: 'Nome do Atendente 2',
        email: 'nome.atendente2@email.com',
        sexo: 'Masculino',
        dataNascimento: new Date('2019-12-31 00:00:00').toISOString(),
        username: 'nome2.atendente',
        password: '123456',
        foto: 'http://localhost:3333/files/atendente2.png'
      },
      {
        id: 3,
        cpf: 3,
        nome: 'Nome do Atendente 3',
        email: 'nome.atendente3@email.com',
        sexo: 'Masculino',
        dataNascimento: new Date('2019-12-31 00:00:00').toISOString(),
        username: 'nome3.atendente',
        password: '123456',
        foto: 'http://localhost:3333/files/atendente3.png'
      },
      {
        id: 4,
        cpf: 4,
        nome: 'Nome do Atendente 4',
        email: 'nome.atendente4@email.com',
        sexo: 'Feminino',
        dataNascimento: new Date('2019-12-31 00:00:00').toISOString(),
        username: 'nome4.atendente',
        password: '123456',
        foto: 'http://localhost:3333/files/atendente4.png'
      },
      {
        id: 5,
        cpf: 5,
        nome: 'Nome do Atendente 5',
        email: 'nome.atendente5@email.com',
        sexo: 'Feminino',
        dataNascimento: new Date('2019-12-31 00:00:00').toISOString(),
        username: 'nome5.atendente',
        password: '123456',
        foto: 'http://localhost:3333/files/atendente5.png'
      }
    ];
    expect(response.header['x-total-count']).toBe('5');
    expect(response.header['x-page-number']).toBe('1');
    expect(response.header['x-page-size']).toBe('5');
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
  });

  it('Deve listar todos os atendentes do sexo "Feminino"', async () => {
    const response = await request(app).get('/atendentes').send({ sexo: 'Feminino' });
    const arrayEsperado = [
      {
        id: 4,
        cpf: 4,
        nome: 'Nome do Atendente 4',
        email: 'nome.atendente4@email.com',
        sexo: 'Feminino',
        dataNascimento: new Date('2019-12-31 00:00:00').toISOString(),
        username: 'nome4.atendente',
        password: '123456',
        foto: 'http://localhost:3333/files/atendente4.png'
      },
      {
        id: 5,
        cpf: 5,
        nome: 'Nome do Atendente 5',
        email: 'nome.atendente5@email.com',
        sexo: 'Feminino',
        dataNascimento: new Date('2019-12-31 00:00:00').toISOString(),
        username: 'nome5.atendente',
        password: '123456',
        foto: 'http://localhost:3333/files/atendente5.png'
      }
    ];
    expect(response.header['x-total-count']).toBe('2');
    expect(response.header['x-page-number']).toBe('1');
    expect(response.header['x-page-size']).toBe('5');
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
  });

  it('Deve listar 2 primeiros atendentes', async () => {
    const response = await request(app).get('/atendentes?page=1&size=2');
    const arrayEsperado = [
      {
        id: 1,
        cpf: 1,
        nome: 'Nome do Atendente 1',
        email: 'nome.atendente1@email.com',
        sexo: 'Masculino',
        dataNascimento: new Date('2019-12-31 00:00:00').toISOString(),
        username: 'nome1.atendente',
        password: '123456',
        foto: 'http://localhost:3333/files/atendente1.png'
      },
      {
        id: 2,
        cpf: 2,
        nome: 'Nome do Atendente 2',
        email: 'nome.atendente2@email.com',
        sexo: 'Masculino',
        dataNascimento: new Date('2019-12-31 00:00:00').toISOString(),
        username: 'nome2.atendente',
        password: '123456',
        foto: 'http://localhost:3333/files/atendente2.png'
      }
    ];
    expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
    expect(response.header['x-total-count']).toEqual('5');
    expect(response.header['x-page-number']).toEqual('1');
    expect(response.header['x-page-size']).toEqual('2');
  });

  it('Deve retornar atendente pesquisado pelo id', async () => {
    const id = 1;
    const response = await request(app).get(`/atendentes/${id}`);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('cpf');
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('sexo');
    expect(response.body).toHaveProperty('dataNascimento');
    expect(response.body).toHaveProperty('username');
    expect(response.body.id).toEqual(id);
    expect(response.body.cpf).toEqual(1);
    expect(response.body.nome).toEqual('Nome do Atendente 1');
    expect(response.body.email).toEqual('nome.atendente1@email.com');
    expect(response.body.sexo).toEqual('Masculino');
    expect(response.body.username).toEqual('nome1.atendente');
  });

  // it('Deve cadastrar novo atendente', async () => {
  //   const cpf = 17759021615
  //   const nome = 'Nilton Madureira Peres';
  //   const email = 'nilton.madureira@gmail.com';
  //   const sexo = 'Masculino';
  //   const dataNascimento = new Date('1950-07-10');
  //   const username = "nilton.madureira";
  //   const password = "123456";
  //   const response = await request(app).post('/estacoes').send({ cpf, nome, email, sexo, dataNascimento, username, password });
  //   expect(response.body).toHaveProperty('id');
  //   expect(response.body).toHaveProperty('cpf');
  //   expect(response.body).toHaveProperty('nome');
  //   expect(response.body).toHaveProperty('email');
  //   expect(response.body).toHaveProperty('sexo');
  //   expect(response.body).toHaveProperty('dataNascimento');
  //   expect(response.body).toHaveProperty('username');
  //   expect(response.body).toHaveProperty('password');
  //   //expect(response.body.id).toEqual(id);
  //   expect(response.body.cpf).toEqual(17759021615);
  //   expect(response.body.nome).toEqual(nome);
  //   expect(response.body.email).toEqual(email);
  //   expect(response.body.sexo).toEqual(sexo);
  //   expect(response.body.username).toEqual(username);
  //   expect(response.body.password).toEqual(password);
  // });

  // it('Deve atualizar atendente existente', async () => {
  //   const id = 1;
  //   const sexo = 'Feminino'
  //   const response = await request(app).put(`/atendentes/${id}`).send({ sexo });
  //   expect(response.body).toHaveProperty('id');
  //   expect(response.body).toHaveProperty('cpf');
  //   expect(response.body).toHaveProperty('nome');
  //   expect(response.body).toHaveProperty('email');
  //   expect(response.body).toHaveProperty('sexo');
  //   expect(response.body).toHaveProperty('dataNascimento');
  //   expect(response.body).toHaveProperty('username');
  //   expect(response.body).toHaveProperty('password');
  //   expect(response.body.id).toEqual(id);
  //   expect(response.body.cpf).toEqual(1);
  //   expect(response.body.nome).toEqual('Nome do Atendente 1');
  //   expect(response.body.email).toEqual('nome.atendente1@email.com');
  //   expect(response.body.sexo).toEqual('Feminino');
  //   expect(response.body.username).toEqual('nome.atendente1');
  //   expect(response.body.password).toEqual('123456');
  // });

  // it('Deve dar erro de validação "cpf" não informado', async () => {
  //   const atendente = { nome: 'Nome do Atendente', email: 'nome.atendente@email.com', sexo: 'Masculino', dataNascimento: new Date(), username: 'nome.atendente', password: '123456' };
  //   const response = await request(app).post('/atendente').send(atendente);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"cpf" is required');
  // });

  // it('Deve dar erro de validação "nome" não informado', async () => {
  //   const atendente = { cpf: 99999999999, email: 'nome.atendente@email.com', sexo: 'Masculino', dataNascimento: new Date(), username: 'nome.atendente', password: '123456' };
  //   const response = await request(app).post('/atendente').send(atendente);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"nome" is required');
  // });

  // it('Deve dar erro de validação "email" não informado', async () => {
  //   const atendente = { cpf: 99999999999, nome: 'Nome do Atendente', sexo: 'Masculino', dataNascimento: new Date(), username: 'nome.atendente', password: '123456' };
  //   const response = await request(app).post('/atendente').send(atendente);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"email" is required');
  // });

  // it('Deve dar erro de validação "sexo" não informado', async () => {
  //   const atendente = { cpf: 99999999999, nome: 'Nome do Atendente', email: 'nome.atendente@email.com', dataNascimento: new Date(), username: 'nome.atendente', password: '123456' };
  //   const response = await request(app).post('/atendente').send(atendente);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"sexo" is required');
  // });

  // it('Deve dar erro de validação "dataNascimento" não informado', async () => {
  //   const atendente = { cpf: 99999999999, nome: 'Nome do Atendente', email: 'nome.atendente@email.com', sexo: 'Masculino', username: 'nome.atendente', password: '123456' };
  //   const response = await request(app).post('/atendente').send(atendente);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"dataNascimento" is required');
  // });

  // it('Deve dar erro de validação "username" não informado', async () => {
  //   const atendente = { cpf: 99999999999, nome: 'Nome do Atendente', email: 'nome.atendente@email.com', sexo: 'Masculino', dataNascimento: new Date(), password: '123456' };
  //   const response = await request(app).post('/atendente').send(atendente);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"username" is required');
  // });

  // it('Deve dar erro de validação "password" não informado', async () => {
  //   const atendente = { cpf: 99999999999, nome: 'Nome do Atendente', email: 'nome.atendente@email.com', sexo: 'Masculino', dataNascimento: new Date(), username: 'nome.atendente'};
  //   const response = await request(app).post('/atendente').send(atendente);
  //   expect(response.body.statusCode).toEqual(400);
  //   expect(response.body.error).toBe('Bad Request');
  //   expect(response.body.message).toBe('"password" is required');
  // });

  // it('Deve excluir atendente', async () => {
  //   const id = 1;
  //   const response = await request(app).delete(`/atendentes/${id}`);
  //   expect(response.status).toEqual(204);
  // });
});

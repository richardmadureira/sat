// const request = require('supertest');

// const app = require('../../src/app');
// const connection = require('../../src/database/connection');

// describe('Serviços', () => {
//   beforeEach(async () => {
//     await connection.migrate.rollback();
//     await connection.migrate.latest();
//     await connection.seed.run();
//   });

//   afterAll(async () => {
//     await connection.destroy();
//   });

//   it('Deve listar Todas os serviços', async () => {
//     const response = await request(app).get('/servicos');
//     const arrayEsperado = [
//       {
//         id: 1,
//         nome: 'Serviço 1 Grupo 1',
//         sigla: 'S1',
//         descricao: 'Descrição do serviço 1 do grupo de serviço 1',
//         ativo: true,
//         id_grupo_servico: 1
//       },
//       {
//         id: 2,
//         nome: 'Serviço 2 Grupo 1',
//         sigla: 'S2',
//         descricao: 'Descrição do serviço 2 do grupo de serviço 1',
//         ativo: true,
//         id_grupo_servico: 1
//       },
//       {
//         id: 3,
//         nome: 'Serviço 3 Grupo 2',
//         sigla: 'S3',
//         descricao: 'Descrição do serviço 3 do grupo de serviço 2',
//         ativo: true,
//         id_grupo_servico: 2
//       },
//       {
//         id: 4,
//         nome: 'Serviço 4 Grupo 3',
//         sigla: 'S4',
//         descricao: 'Descrição do serviço 4 do grupo de serviço 3',
//         ativo: true,
//         id_grupo_servico: 3
//       },
//       {
//         id: 5,
//         nome: 'Serviço 5 Grupo 4',
//         sigla: 'S5',
//         descricao: 'Descrição do serviço 5 do grupo de serviço 4',
//         ativo: true,
//         id_grupo_servico: 4
//       }
//     ];
//     expect(response.header['x-total-count']).toBe('6');
//     expect(response.header['x-page-number']).toBe('1');
//     expect(response.header['x-page-size']).toBe('5');
//     expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
//   });

//   it('Deve listar Todos os serviço inativos', async () => {
//     const response = await request(app).get('/servicos').send({ ativo: false });
//     const arrayEsperado = [
//       {
//         id: 6,
//         nome: 'Serviço 6 Grupo 5',
//         sigla: 'S6',
//         descricao: 'Descrição do serviço 6 do grupo de serviço 5',
//         ativo: false,
//         id_grupo_servico: 5
//       }
//     ];
//     expect(response.header['x-total-count']).toBe('1');
//     expect(response.header['x-page-number']).toBe('1');
//     expect(response.header['x-page-size']).toBe('5');
//     expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
//   });

//   it('Deve listar 2 primeiros serviços', async () => {
//     const response = await request(app).get('/servicos?page=1&size=2');
//     const arrayEsperado = [
//       {
//         id: 1,
//         nome: 'Serviço 1 Grupo 1',
//         sigla: 'S1',
//         descricao: 'Descrição do serviço 1 do grupo de serviço 1',
//         ativo: true,
//         id_grupo_servico: 1
//       },
//       {
//         id: 2,
//         nome: 'Serviço 2 Grupo 1',
//         sigla: 'S2',
//         descricao: 'Descrição do serviço 2 do grupo de serviço 1',
//         ativo: true,
//         id_grupo_servico: 1
//       }
//     ];
//     expect(response.body).toEqual(expect.arrayContaining(arrayEsperado));
//     expect(response.header['x-total-count']).toEqual('6');
//     expect(response.header['x-page-number']).toEqual('1');
//     expect(response.header['x-page-size']).toEqual('2');
//   });

//   it('Deve retornar serviço pesquisado pelo id', async () => {
//     const id = 1;
//     const response = await request(app).get(`/servicos/${id}`);
//     expect(response.body).toHaveProperty('id');
//     expect(response.body).toHaveProperty('nome');
//     expect(response.body).toHaveProperty('sigla');
//     expect(response.body).toHaveProperty('descricao');
//     expect(response.body).toHaveProperty('ativo');
//     expect(response.body).toHaveProperty('id_grupo_servico');
//     expect(response.body.id).toEqual(id);
//     expect(response.body.nome).toEqual('Serviço 1 Grupo 1');
//     expect(response.body.sigla).toEqual('S1');
//     expect(response.body.descricao).toEqual('Descrição do serviço 1 do grupo de serviço 1');
//     expect(response.body.ativo).toEqual(true);
//     expect(response.body.id_grupo_servico).toEqual(1);
//   });

//   it('Deve cadastrar novo serviço', async () => {
//     const idservico = 1;
//     const nome = 'Nome do Serviço 7';
//     const sigla = 'S7';
//     const descricao = 'Descrição do serviço 7';
//     const ativo = true;
//     const response = await request(app).post(`/grupos-servicos/${idservico}`).send({ nome, sigla, descricao, ativo });
//     expect(response.body).toHaveProperty('id');
//     expect(response.body).toHaveProperty('nome');
//     expect(response.body).toHaveProperty('sigla');
//     expect(response.body).toHaveProperty('descricao');
//     expect(response.body).toHaveProperty('ativo');
//     expect(response.body).toHaveProperty('id_grupo_servico');
//     expect(response.body.id).toEqual(7);
//     expect(response.body.nome).toEqual(nome);
//     expect(response.body.sigla).toEqual(sigla);
//     expect(response.body.descricao).toEqual(descricao);
//     expect(response.body.ativo).toEqual(ativo);
//     expect(response.body.id_grupo_servico).toEqual(idservico);
//   });

//   it('Deve atualizar serviço existente', async () => {
//     const id = 1;
//     const ativo = false;
//     const response = await request(app).put(`/servicos/${id}`).send({ ativo });
//     expect(response.body).toHaveProperty('id');
//     expect(response.body).toHaveProperty('nome');
//     expect(response.body).toHaveProperty('sigla');
//     expect(response.body).toHaveProperty('descricao');
//     expect(response.body).toHaveProperty('ativo');
//     expect(response.body).toHaveProperty('id_grupo_servico');
//     expect(response.body.id).toEqual(id);
//     expect(response.body.nome).toEqual('Serviço 1 Grupo 1');
//     expect(response.body.sigla).toEqual('S1');
//     expect(response.body.descricao).toEqual('Descrição do serviço 1 do grupo de serviço 1');
//     expect(response.body.ativo).toEqual(ativo);
//     expect(response.body.id_grupo_servico).toEqual(1);
//   });

//   it('Deve dar erro de validação "nome" não informado', async () => {
//     const idGrupoServico = 1;
//     const servico = { sigla: 'S', descricao: 'Descrição do serviço', ativo: true };
//     const response = await request(app).post(`/grupos-servicos/${idGrupoServico}`).send(servico);
//     expect(response.body.statusCode).toEqual(400);
//     expect(response.body.error).toBe('Bad Request');
//     expect(response.body.message).toBe('"nome" is required');
//   });

//   it('Deve dar erro de validação "sigla" não informado', async () => {
//     const servico = { nome: 'Nome do Grupo de Serviço', descricao: 'Descrição do grupo de serviço', ativo: true };
//     const response = await request(app).post('/grupos-servicos').send(servico);
//     expect(response.body.statusCode).toEqual(400);
//     expect(response.body.error).toBe('Bad Request');
//     expect(response.body.message).toBe('"sigla" is required');
//   });

//   it('Deve dar erro de validação "descricao" não informado', async () => {
//     const servico = { nome: 'Nome do Grupo de Serviço', sigla: 'GS', ativo: true };
//     const response = await request(app).post('/grupos-servicos').send(servico);
//     expect(response.body.statusCode).toEqual(400);
//     expect(response.body.error).toBe('Bad Request');
//     expect(response.body.message).toBe('"descricao" is required');
//   });

//   it('Deve dar erro de validação "ativo" não informado', async () => {
//     const servico = { nome: 'Nome do Grupo de Serviço', sigla: 'GS', descricao: 'Descrição do grupo de serviço' };
//     const response = await request(app).post('/grupos-servicos').send(servico);
//     expect(response.body.statusCode).toEqual(400);
//     expect(response.body.error).toBe('Bad Request');
//     expect(response.body.message).toBe('"ativo" is required');
//   });

//   it('Deve lancar exceção para serviço ainda sendo referenciado em outra tabela', async () => {
//     const id = 1;
//     const response = await request(app).delete(`/servicos/${id}`);
//     expect(response.status).toEqual(400);
//     expect(response.body.message).toBe('Key (id)=(1) is still referenced from table "paineis_servicos".');
//   });

//   it('Deve excluir serviço não utilizado', async () => {
//     const id = 6;
//     const response = await request(app).delete(`/servicos/${id}`);
//     expect(response.status).toEqual(204);
//   });
// });

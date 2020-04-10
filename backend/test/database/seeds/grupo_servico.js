exports.seed = knex => {
  return knex('grupos_servicos')
    .del()
    .then(() => {
      return knex('grupos_servicos').insert([
        { nome: 'Nome do Grupo de Serviço 1', sigla: 'GS1', descricao: 'Descrição do grupo de serviço 1', ativo: true },
        { nome: 'Nome do Grupo de Serviço 2', sigla: 'GS2', descricao: 'Descrição do grupo de serviço 2', ativo: true },
        { nome: 'Nome do Grupo de Serviço 3', sigla: 'GS3', descricao: 'Descrição do grupo de serviço 3', ativo: true },
        { nome: 'Nome do Grupo de Serviço 4', sigla: 'GS4', descricao: 'Descrição do grupo de serviço 4', ativo: true },
        { nome: 'Nome do Grupo de Serviço 5', sigla: 'GS5', descricao: 'Descrição do grupo de serviço 5', ativo: true },
        { nome: 'Nome do Grupo de Serviço 6', sigla: 'GS6', descricao: 'Descrição do grupo de serviço 6', ativo: false }
      ]);
    });
};

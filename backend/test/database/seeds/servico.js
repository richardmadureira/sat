exports.seed = knex => {
  return knex('servicos')
    .del()
    .then(() => {
      return knex('servicos').insert([
        {
          nome: 'Serviço 1 Grupo 1',
          sigla: 'S1',
          descricao: 'Descrição do serviço 1 do grupo de serviço 1',
          ativo: true,
          id_grupo_servico: 1
        },
        {
          nome: 'Serviço 2 Grupo 1',
          sigla: 'S2',
          descricao: 'Descrição do serviço 2 do grupo de serviço 1',
          ativo: true,
          id_grupo_servico: 1
        },
        {
          nome: 'Serviço 3 Grupo 2',
          sigla: 'S3',
          descricao: 'Descrição do serviço 3 do grupo de serviço 2',
          ativo: true,
          id_grupo_servico: 2
        },
        {
          nome: 'Serviço 4 Grupo 3',
          sigla: 'S4',
          descricao: 'Descrição do serviço 4 do grupo de serviço 3',
          ativo: true,
          id_grupo_servico: 3
        },
        {
          nome: 'Serviço 5 Grupo 4',
          sigla: 'S5',
          descricao: 'Descrição do serviço 5 do grupo de serviço 4',
          ativo: true,
          id_grupo_servico: 4
        },
        {
          nome: 'Serviço 6 Grupo 5',
          sigla: 'S6',
          descricao: 'Descrição do serviço 6 do grupo de serviço 5',
          ativo: false,
          id_grupo_servico: 5
        }
      ]);
    });
};

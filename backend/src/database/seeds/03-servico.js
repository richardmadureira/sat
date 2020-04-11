exports.seed = knex => {
  return knex('servicos')
    .del()
    .then(() => {
      return knex('servicos').insert([
        {
          nome: 'Aposentadorias por Tempo de Contribuição',
          sigla: 'APOTC',
          descricao: 'Aposentadoria por tempo de contribuição previdenciária',
          ativo: true,
          id_grupo_servico: 1
        },
        {
          nome: 'Aposentadoria Rural',
          sigla: 'APOR',
          descricao: 'Aposentadoria para trabalhadores rurais',
          ativo: true,
          id_grupo_servico: 1
        },
        { nome: 'Aposentadoria por Idade', sigla: 'APOID', descricao: '', ativo: true, id_grupo_servico: 1 },
        { nome: 'Aposentadoria por Invalidez', sigla: 'APOIN', descricao: '', ativo: true, id_grupo_servico: 1 },
        { nome: 'Cadastro no CNIS', sigla: 'CNIS', descricao: 'Cadastro no CNIS', ativo: true, id_grupo_servico: 2 },
        { nome: 'Outros', sigla: 'GS3', descricao: 'Demais serviços', ativo: true, id_grupo_servico: 3 }
      ]);
    });
};

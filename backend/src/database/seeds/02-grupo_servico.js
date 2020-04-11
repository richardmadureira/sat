exports.seed = knex => {
  return knex('grupos_servicos')
    .del()
    .then(() => {
      return knex('grupos_servicos').insert([
        { nome: 'Aposentadorias e Afins', sigla: 'APOS', descricao: 'Serviços de aposentadorias diveras', ativo: true },
        { nome: 'Cadastros', sigla: 'CAD', descricao: 'Cadastros diversos', ativo: true },
        { nome: 'Outros', sigla: 'GS3', descricao: 'Demais serviços que não se enquadram nos outros grupos de serviços', ativo: true }
      ]);
    });
};

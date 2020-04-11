exports.seed = knex => {
  return knex('paineis_servicos')
    .del()
    .then(() => {
      return knex('paineis_servicos').insert([
        { id_painel: 1, id_servico: 1 },
        { id_painel: 1, id_servico: 2 },
        { id_painel: 1, id_servico: 3 },
        { id_painel: 2, id_servico: 1 },
        { id_painel: 2, id_servico: 2 },
        { id_painel: 2, id_servico: 3 },
        { id_painel: 3, id_servico: 1 },
        { id_painel: 3, id_servico: 2 },
        { id_painel: 3, id_servico: 3 }
      ]);
    });
};

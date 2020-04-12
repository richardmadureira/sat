exports.seed = knex => {
  return knex('paineis')
    .del()
    .then(() => {
      return knex('paineis').insert([
        { nome: 'Painel 1', descricao: 'Descrição do painel 1', mensagem: 'Mensagem do painel 1', ativo: true },
        { nome: 'Painel 2', descricao: 'Descrição do painel 2', mensagem: 'Mensagem do painel 2', ativo: true },
        { nome: 'Painel 3', descricao: 'Descrição do painel 3', mensagem: 'Mensagem do painel 3', ativo: false }
      ]);
    });
};

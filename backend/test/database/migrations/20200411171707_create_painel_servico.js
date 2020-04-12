exports.up = knex => {
  return knex.schema.createTable('paineis_servicos', table => {
    table.integer('id_painel').unsigned().notNullable().references('id').inTable('paineis').index();
    table.integer('id_servico').unsigned().notNullable().references('id').inTable('servicos').index();
    table.primary(['id_painel', 'id_servico']);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('paineis_servicos');
};

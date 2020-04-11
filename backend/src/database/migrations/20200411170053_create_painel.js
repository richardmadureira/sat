exports.up = knex => {
  return knex.schema.createTable('paineis', table => {
    table.increments().primary();
    table.string('nome').notNullable();
    table.string('descricao').notNullable();
    table.string('mensagem').notNullable();
    table.boolean('ativo').notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('paineis');
};

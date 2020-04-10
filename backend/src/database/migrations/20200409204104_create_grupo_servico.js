exports.up = knex => {
  return knex.schema.createTable('grupos_servicos', table => {
    table.increments().primary();
    table.string('nome').notNullable();
    table.string('sigla').notNullable();
    table.string('descricao').notNullable();
    table.boolean('ativo').notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('grupos_servicos');
};

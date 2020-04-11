exports.up = knex => {
  return knex.schema.createTable('servicos', table => {
    table.increments().primary();
    table.string('nome').notNullable();
    table.string('sigla').notNullable();
    table.string('descricao').notNullable();
    table.boolean('ativo').notNullable();
    table.integer('id_grupo_servico').unsigned().notNullable().references('id').inTable('servicos').onDelete('CASCADE').index();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('servicos');
};

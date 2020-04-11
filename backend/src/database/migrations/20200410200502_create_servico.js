exports.up = knex => {
  return knex.schema.createTable('servicos', table => {
    table.increments().primary();
    table.string('nome').notNullable();
    table.string('sigla').notNullable();
    table.string('descricao').notNullable();
    table.boolean('ativo').notNullable();
    table.integer('id_grupo_servico').unsigned().notNullable();
    table.foreign('id_grupo_servico').references('id').inTable('grupos_servicos');
    table.index(['id_grupo_servico'], 'idx_fk_grupo_servico');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('servicos');
};

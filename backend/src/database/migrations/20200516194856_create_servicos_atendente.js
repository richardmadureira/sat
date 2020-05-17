exports.up = knex => {
  return knex.schema.createTable('servicos_atendentes', table => {
    table.primary(['id_servico', 'id_atendente']);
    table.bigInteger('id_servico').notNullable().references('id').inTable('servicos');
    table.bigInteger('id_atendente').notNullable().references('id').inTable('atendentes');
    table.boolean("em_execucao").notNullable().default(false);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('paineis');
};

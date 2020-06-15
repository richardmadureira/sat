exports.up = knex => {
  return knex.schema.createTable('agendamentos', table => {
    table.increments().primary();
    table.date('horario_atendimento').notNullable();
    table.date('situacao_agendamento').notNullable();
    table.boolean('tipo_atendimento_personificado'); // ideal; obrigatorio,  excluido
    table.string('tipo_prioridade').notNullable(); // normal (default), prioritario menor que 65, prioritario 65 anos ou mais
    table.integer('id_pessoa').unsigned().notNullable().references('id').inTable('pessoas');
    table.integer('id_representante_legal').unsigned().notNullable().references('id').inTable('pessoas');
    table.integer('id_servico').unsigned().notNullable().references('id').inTable('servicos');
    table.integer('id_atendente_personificado').unsigned().notNullable().references('id').inTable('atendentes');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('agendamentos');
};

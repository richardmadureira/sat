exports.up = knex => {
  return knex.schema.createTable('atendimentos', table => {
    table.increments().primary();
    table.string('prefixo_senha').notNullable();
    table.string('senha').notNullable();
    table.date('horario_triagem').notNullable();
    table.date('horario_chamada');
    table.date('horario_inicio_atendimento');
    table.date('horario_termino_atendimento');
    table.date('situacao_atendimento').notNullable();
    table.boolean('tipo_atendimento_personificado'); // ideal; obrigatorio,  excluido
    table.integer('id_atendente_personificado').unsigned().notNullable().references('id').inTable('atendimentos');
    table.string('tipo_prioridade').notNullable(); // normal (default), prioritario menor que 65, prioritario 65 anos ou mais
    table.integer('id_pessoa').unsigned().notNullable().references('id').inTable('pessoas');
    table.integer('id_representante_legal').unsigned().notNullable().references('id').inTable('pessoas');
    table.integer('id_servico').unsigned().notNullable().references('id').inTable('servicos');
    table.integer('id_triador').unsigned().notNullable().references('id').inTable('atendentes');
    table.integer('id_atendente').unsigned().notNullable().references('id').inTable('atendentes');
    table.integer('id_atendimento_anterior').unsigned().notNullable().references('id').inTable('atendimentos');
    table.integer('id_agendamento').unsigned().notNullable().references('id').inTable('agendamentos');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('atendimentos');
};

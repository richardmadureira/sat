exports.up = knex => {
  return knex.schema.createTable('atendentes', table => {
    table.increments().primary();
    table.integer('cpf').notNullable();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('sexo').notNullable();
    table.date('data_nascimento').notNullable();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('foto').notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('atendentes');
};

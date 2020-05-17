exports.up = knex => {
  return knex.schema.createTable('pessoas', table => {
    table.increments().primary();
    table.bigInteger('cpf').notNullable();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('sexo').notNullable();
    table.date('data_nascimento').notNullable();
    table.string('foto').notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('pessoas');
};

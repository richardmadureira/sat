
exports.up = function(knex) {
    return knex.schema.createTable('estacoes', table => {
        table.increments().primary();
        table.string('tipoEstacao').notNullable();
        table.integer('numero').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('estacoes');
};

exports.up = knex => {
	return knex.schema.createTable('estacoes', table => {
		table.increments().primary();
		table.string('tipoEstacao').notNullable();
		table.integer('numero').notNullable();
	});
};

exports.down = knex => {
	return knex.schema.dropTable('estacoes');
};

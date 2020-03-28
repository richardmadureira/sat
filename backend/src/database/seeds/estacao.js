
exports.seed = function(knex) {
  return knex('estacoes').del()
    .then(function () {
      return knex('estacoes').insert([
        {id: 1, tipoEstacao: 'MESA', numero: 1},
        {id: 2, tipoEstacao: 'GUICHE', numero: 2},
        {id: 3, tipoEstacao: 'SALA', numero: 3}
      ]);
    });
};

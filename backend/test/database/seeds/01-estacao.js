exports.seed = knex => {
  return knex('estacoes')
    .del()
    .then(() => {
      return knex('estacoes').insert([
        { tipoEstacao: 'MESA', numero: 1 },
        { tipoEstacao: 'GUICHE', numero: 2 },
        { tipoEstacao: 'SALA', numero: 3 }
      ]);
    });
};

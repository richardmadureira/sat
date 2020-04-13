exports.seed = knex => {
  return knex('atendentes')
    .del()
    .then(() => {
      return knex('atendentes').insert([
        {
          cpf: 1,
          nome: 'Nome do Atendente 1',
          email: 'nome.atendente1@email.com',
          sexo: 'Masculino',
          data_nascimento: new Date('2020-01-01'),
          username: 'nome1.atendente',
          password: '123456',
          foto: 'http://localhost:3333/files/atendente1.png'
        },
        {
          cpf: 2,
          nome: 'Nome do Atendente 2',
          email: 'nome.atendente2@email.com',
          sexo: 'Masculino',
          data_nascimento: new Date('2020-01-01'),
          username: 'nome2.atendente',
          password: '123456',
          foto: 'http://localhost:3333/files/atendente2.png'
        },
        {
          cpf: 3,
          nome: 'Nome do Atendente 3',
          email: 'nome.atendente3@email.com',
          sexo: 'Masculino',
          data_nascimento: new Date('2020-01-01'),
          username: 'nome3.atendente',
          password: '123456',
          foto: 'http://localhost:3333/files/atendente3.png'
        },
        {
          cpf: 4,
          nome: 'Nome do Atendente 4',
          email: 'nome.atendente4@email.com',
          sexo: 'Feminino',
          data_nascimento: new Date('2020-01-01'),
          username: 'nome4.atendente',
          password: '123456',
          foto: 'http://localhost:3333/files/atendente4.png'
        },
        {
          cpf: 5,
          nome: 'Nome do Atendente 5',
          email: 'nome.atendente5@email.com',
          sexo: 'Feminino',
          data_nascimento: new Date('2020-01-01'),
          username: 'nome5.atendente',
          password: '123456',
          foto: 'http://localhost:3333/files/atendente5.png'
        }
      ]);
    });
};

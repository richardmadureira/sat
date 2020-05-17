exports.seed = knex => {
  return knex('pessoas')
    .del()
    .then(() => {
      return knex('pessoas').insert([
        {
          cpf: 3930263610,
          nome: 'Richard Mendes Madureira',
          email: 'richard.madureira@gmail.com',
          sexo: 'Masculino',
          data_nascimento: new Date('1980-07-11'),
          foto: 'http://localhost:3333/files/atendente1.png'
        },
        {
          cpf: 17759021615,
          nome: 'Nilton Madureira Peres',
          email: 'nilton.madureira@gmail.com',
          sexo: 'Masculino',
          data_nascimento: new Date('1950-07-09'),
          foto: 'http://localhost:3333/files/atendente2.png'
        },
        {
          cpf: 46421498051,
          nome: 'Elza Mendes Madureira',
          email: 'elza.madureira53@gmail.com',
          sexo: 'Feminino',
          data_nascimento: new Date('1953-08-18'),
          foto: 'http://localhost:3333/files/atendente3.png'
        },
        {
          cpf: 51159503087,
          nome: 'Edymar Patryk Madureira',
          email: 'edymarpatryk@email.com',
          sexo: 'Masculino',
          data_nascimento: new Date('1981-12-13'),
          foto: 'http://localhost:3333/files/atendente4.png'
        },
        {
          cpf: 69725839005,
          nome: 'Cíntia Madureira Orth',
          email: 'cintia.orth@gmail.com',
          sexo: 'Feminino',
          data_nascimento: new Date('1978-10-03'),
          foto: 'http://localhost:3333/files/atendente5.png'
        },
        {
          cpf: 69725839005,
          nome: 'Juciara Mendes Madureira',
          email: 'neguinhamm@gmail.com',
          sexo: 'Feminino',
          data_nascimento: new Date('1985-11-23'),
          foto: 'http://localhost:3333/files/atendente5.png'
        }
      ]);
    });
};

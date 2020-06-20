const Mail = require('../lib/Mail');

module.exports = {
    key: 'registration-mail',
    async handle({ data }){
        const { user } = data;
        const {name, email} = user;
        
        await Mail.sendMail({
            from: "Queue Test<queue@queuetst.com.br>",
            to: `${name}<${email}>`,
            subject: 'Cadastro de Usuário',
            html: `Olá, bem vindo ao sistema de filas da Rocketseat :D`
        });
    }
}
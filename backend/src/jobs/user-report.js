const Mail = require('../lib/Mail');

module.exports = {
    key: 'user-report',
    async handle({ data }){
        const { user } = data;
        console.log(user);
    }
}
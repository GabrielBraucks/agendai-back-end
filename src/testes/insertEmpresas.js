const knex = require('../database/knexSetup').db;
const { hashSenha } = require('../utils/bcrypt');

module.exports = async () => {
    const senha = await hashSenha('123123');
    await knex('Empresa').insert([
        {
            id: 1,
            cnpj: '45723174000110',
            nome: 'Tech Solution',
            email: 'contato@techsolution.com',
            senha: senha
        },
        {
            id: 2,
            cnpj: '11222333000181',
            nome: 'Health Care Plus',
            email: 'contato@healthcare.com',
            senha: senha
        }
    ]);
}
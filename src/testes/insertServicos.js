const knex = require('../database/knexSetup').db;

module.exports = async () => {
    await knex('Servico').insert([
        {
            id: 1,
            idEmpresa: 1,
            preco: 150,
            nome: 'Consultoria TI',
            duracao: '01:00',
            categoria: 'Tecnologia'
        },
        {
            id: 2,
            idEmpresa: 2,
            preco: 200,
            nome: 'Consulta Nutricional',
            duracao: '01:30',
            categoria: 'Saúde'
        }
    ]);
}
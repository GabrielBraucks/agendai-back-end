const knex = require('../database/knexSetup').db;

module.exports = async () => {
    return await knex.raw(`
        insert into Funcionario (cpf, nome, email, senha, telefone, idEmpresa)
        select '12345678901', 'Funcionário 1', 'funcionario1@email.com', '', '11999990021', 1 union all
        select '12345678902', 'Funcionário 2', 'funcionario2@email.com', '', '11999990022', 2
    `);
}
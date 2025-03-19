const knex = require('../database/knexSetup').db;

class EmpresaRepo {
    static async register({ cnpj, email, senha, endereco }) {
        await knex('Empresa').insert({ cnpj, email, senha, endereco });
    }

    static async getByEmail(email) {
        return await knex('Empresa').where({ email }).first();
    }
}

module.exports = EmpresaRepo;
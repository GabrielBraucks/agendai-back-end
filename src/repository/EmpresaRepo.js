const knex = require('../database/knexSetup').db;

class EmpresaRepo {
    static async register({ cnpj, email, nome, senha, endereco }) {
        await knex('Empresa').insert({ cnpj, email, nome, senha, endereco });
    }

    static async getByEmail(email) {
        return await knex('Empresa').where({ email }).first();
    }

    static async getById(id) {
        return await knex('Empresa').where({ id }).first();
    }
}

module.exports = EmpresaRepo;
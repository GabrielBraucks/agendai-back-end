const knex = require('../database/knexSetup').db;

class ClienteRepo {
    static async register({ cpf, email, nome, telefone, senha }) {
        return await knex('Cliente').insert({ cpf, email, nome, telefone, senha });
    }

    static async deleteById(id) {
        return await knex('Cliente').where({ id }).delete();
    }

    static async getByEmail(email) {
        return await knex('Cliente').where({ email }).first();
    }

    static async getByEmailAndEmpresa(email, idEmpresa) {
        return await knex('Cliente').where({ email, idEmpresa }).first();
    }

    // Para fazer o GetByEmpresa será necessário trabalhar os agendamentos

    static async getOne(id) {
        return await knex('Cliente')
            .where({ 'Cliente.id': id })
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo'
            ).first();
    }
}

module.exports = ClienteRepo;
const knex = require('../database/knexSetup').db;

class ClienteRepo {
    static async register({ cpf, email, nome, telefone, senha, idEmpresa }) {
        return await knex('Cliente').insert({ cpf, email, nome, telefone, senha, idEmpresa });
    }

    static async deleteById(id, idEmpresa) {
        return await knex('Cliente').where({ id, idEmpresa }).delete();
    }

    static async updateByIdAndIdEmpresa({ id, cpf, email, nome, telefone, idEmpresa }) {
        return await knex('Cliente')
            .where({ id, idEmpresa })
            .update({
                cpf,
                email,
                nome,
                telefone
            });
    }

    static async getAll() {
        return await knex('Cliente')
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo'
            );
    }

    static async getByEmpresa(idEmpresa) {
        return await knex('Cliente')
        .where({ idEmpresa })
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo'
            );
    }

    static async getByEmpresaAndCpfOrEmail({idEmpresa, cpf, email}) {
        return await knex('Cliente')
        .where({ idEmpresa,cpf })
        .orWhere({ idEmpresa,email })
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo'
            );
    }

    static async getByEmail(email) {
        return await knex('Cliente').where({ email }).first();
    }

    // Para fazer o GetByEmpresa será necessário trabalhar os agendamentos

    static async getOne(id, idEmpresa) {
        return await knex('Cliente')
            .where({ 'Cliente.id': id, idEmpresa })
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
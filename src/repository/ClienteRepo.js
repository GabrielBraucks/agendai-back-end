import { db } from "../database/knexSetup.js";

const knex = db;

export class ClienteRepo {
    static async register({ cpf, email, nome, senha, telefone, tipo, idEmpresa }) {
        return await knex('Cliente').insert({ cpf, email, nome, senha, telefone, tipo, idEmpresa });
    }

    static async updateOneByEmpresa({ cpf, email, nome, telefone, idEmpresa, id }) {
        return await knex('Cliente').where({ idEmpresa, id }).update({ cpf, email, nome, telefone });
    }

    static async deleteById(id) {
        return await knex('Cliente').where({ id }).delete();
    }

    static async deleteOneByEmpresaAndTipo({ id, idEmpresa, tipo }) {
        return await knex('Cliente').where({ id, idEmpresa, tipo }).delete();
    }

    static async getByEmail(email) {
        return await knex('Cliente').where({ email }).first();
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
    static async getByEmpresa(empresa) {
        return await knex('Cliente')
            .where({ 'Cliente.idEmpresa': empresa })
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo'
            );
    }
}
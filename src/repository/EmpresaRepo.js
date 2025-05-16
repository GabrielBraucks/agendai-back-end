import { db } from "../database/knexSetup.js";

const knex = db;

export class EmpresaRepo {
    static async register({ cnpj, email, nome, senha, endereco, perfil }) {
        return await knex('Empresa').insert({ cnpj, email, nome, senha, endereco, perfil }).returning();
    }

    static async getByEmail(email) {
        return await knex('Empresa').where({ email }).first();
    }

    static async getById(id) {
        return await knex('Empresa').where({ id }).first();
    }
}
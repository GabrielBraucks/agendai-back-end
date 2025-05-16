import { db } from "../database/knexSetup.js";

const knex = db;

export class FuncionarioRepo {
    static async register({ cpf, idEmpresa, nome, email, telefone, data_nasc, cargo, senha, perfil }) {
        return await knex('Funcionario').insert({ cpf, idEmpresa, nome, email, telefone, data_nasc, cargo, senha, perfil }).returning();
    }

    static async deleteById(id, idEmpresa) {
        return await knex('Funcionario').where({ id, idEmpresa }).delete();
    }
    static async getAll() {
        return await knex('Funcionario')
            .join("Empresa", "idEmpresa", "=", "Empresa.id")
            .select(
                'Funcionario.id',
                'Funcionario.cpf',
                'Funcionario.nome',
                'Funcionario.email',
                'Funcionario.telefone',
                'Funcionario.data_nasc',
                'Funcionario.cargo',
                'Empresa.nome as empresa');
    }
    static async getByEmpresa(idEmpresa) {
        return await knex('Funcionario')
            .join("Empresa", "idEmpresa", "=", "Empresa.id")
            .where('idEmpresa', idEmpresa)
            .select(
                'Funcionario.id',
                'Funcionario.perfil',
                'Funcionario.cpf',
                'Funcionario.nome',
                'Funcionario.email',
                'Funcionario.telefone',
                'Funcionario.data_nasc',
                'Funcionario.cargo',
                'Empresa.nome as empresa');
    }

    static async updateByIdAndIdEmpresa({ id, cpf, idEmpresa, nome, email, telefone, data_nasc, cargo, perfil }) {
        return await knex('Funcionario')
            .where({ idEmpresa, id })
            .update({
                cpf,
                nome,
                email,
                telefone,
                data_nasc,
                cargo,
                perfil
            });
    }

    static async updateSenhaByIdAndIdEmpresa({ id, idEmpresa, senha }) {
        return await knex('Funcionario')
            .where({ idEmpresa, id })
            .update({
                senha
            });
    }

    static async getOne(id, idEmpresa) {
        return await knex('Funcionario')
            .join("Empresa", "idEmpresa", "=", "Empresa.id")
            .where({ "Funcionario.id":id, idEmpresa })
            .select(
                'Funcionario.id',
                'Funcionario.cpf',
                'Funcionario.nome',
                'Funcionario.email',
                'Funcionario.telefone',
                'Funcionario.data_nasc',
                'Funcionario.cargo',
                'Empresa.nome as empresa').first();
    }
}
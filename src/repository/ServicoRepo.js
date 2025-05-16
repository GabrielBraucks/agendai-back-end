import { db } from "../database/knexSetup.js";

const knex = db;

export class ServicoRepo {
    static async register({ nome, idEmpresa, preco, duracao, categoria, foto, idFuncionario }) {
        await knex('Servico').insert({ nome, idEmpresa, preco, duracao, categoria, foto, idFuncionario });
    }

    static async deleteByIdAndIdEmpresa(id, idEmpresa) {
        return await knex('Servico').where('id', id).delete();
    }
    static async getAll() {
        const rows = await knex('Servico')
            .join("Empresa", "idEmpresa", "=", "Empresa.id")
            .join("Funcionario", "idFuncionario", "=", "Funcionario.id")
            .select(
                'Servico.id as servicoId',
                'Servico.foto',
                'Servico.nome as servicoNome',
                'Servico.preco',
                'Servico.duracao',
                'Servico.categoria',
                'Empresa.nome as empresa',
                'Funcionario.id as funcionarioId',
                'Funcionario.nome as funcionarioNome',
                'Funcionario.perfil as funcionarioPerfil'
            );

        // Estrutura os resultados no formato desejado
        return rows.map(row => ({
            id: row.servicoId,
            foto: row.foto,
            nome: row.servicoNome,
            preco: row.preco,
            duracao: row.duracao,
            categoria: row.categoria,
            empresa: row.empresa,
            funcionario: {
                id: row.funcionarioId,
                nome: row.funcionarioNome,
                perfil: row.funcionarioPerfil
            }
        }));
    }


    static async updateByIdAndIdEmpresa({ id, nome, idEmpresa, preco, duracao, categoria, foto, idFuncionario }) {
        return await knex('Servico')
            .where({ idEmpresa, id })
            .update({
                nome,
                foto,
                preco,
                duracao,
                categoria,
                idFuncionario
            });
    }

    static async getByIdEmpresa(idEmpresa) {
        const rows = await knex('Servico')
            .join("Empresa", "Servico.idEmpresa", "=", "Empresa.id")
            .join("Funcionario", "Servico.idFuncionario", "=", "Funcionario.id")
            .where({ 'Servico.idEmpresa': idEmpresa })
            .select(
                'Servico.id as servicoId',
                'Servico.foto',
                'Servico.nome as servicoNome',
                'Servico.preco',
                'Servico.duracao',
                'Servico.categoria',
                'Empresa.nome as empresa',
                'Funcionario.id as funcionarioId',
                'Funcionario.nome as funcionarioNome',
                'Funcionario.perfil as funcionarioPerfil'
            );

        return rows.map(row => ({
            id: row.servicoId,
            foto: row.foto,
            nome: row.servicoNome,
            preco: row.preco,
            duracao: row.duracao,
            categoria: row.categoria,
            empresa: row.empresa,
            funcionario: {
                id: row.funcionarioId,
                nome: row.funcionarioNome,
                perfil: row.funcionarioPerfil
            }
        }));
    }


    static async getOne(id) {
        return await knex('Servico')
            .join("Empresa", "idEmpresa", "=", "Empresa.id")
            .where('Servico.id', id)
            .select(
                'Servico.id',
                'Servico.nome',
                'Servico.preco',
                'Servico.duracao',
                'Servico.categoria',
                'Empresa.nome as empresa').first();
    }
}
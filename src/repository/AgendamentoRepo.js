import { db } from "../database/knexSetup.js";

const knex = db;

export class AgendamentoRepo {
    static async register({ idCliente, idServico, data, horario }) {
        await knex('Agendamento').insert({ idCliente, idServico, data, horario });
    }

    static async deleteById(id) {
        return await knex('Agendamento').where({ id }).delete();
    }

    static async getByIdEmpresa(idEmpresa) {
        return await knex('Agendamento')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .where('Empresa.id', idEmpresa)
            .select(
                'Agendamento.*',
                'Servico.nome as nomeServico',
                'Empresa.nome as nomeEmpresa',
                'Empresa.id as idEmpresa'
            );
    }

    static async getOne(id) {
        return await knex('Agendamento')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .where('Agendamento.id', id)
            .select(
                'Agendamento.*',
                'Servico.nome as nomeServico',
                'Empresa.nome as nomeEmpresa',
                'Empresa.id as idEmpresa'
            ).first();
    }
}
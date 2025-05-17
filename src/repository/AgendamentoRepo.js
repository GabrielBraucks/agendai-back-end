const knex = require('../database/knexSetup').db;

class AgendamentoRepo {
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
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Empresa.id', idEmpresa)
            .select(
                'Agendamento.*',
                'Cliente.nome as nomeCliente',
                'Servico.nome as nomeServico',
                'Servico.duracao as duracao',
                'Empresa.nome as nomeEmpresa',
                'Empresa.id as idEmpresa'
            );
    }
    static async getByIdClienteAndPeriodo(idCliente, data, horarioInicio, horarioFim) {
        return await knex('Agendamento')
            .where('data', '>=', data)
            .andWhereBetween('horario', [horarioInicio, horarioFim])
            .select()
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

module.exports = AgendamentoRepo;
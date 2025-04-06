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
            .where('Empresa.id', idEmpresa)
            .select(
                'Agendamento.*',
                'Empresa.nome as empresa'
            );
    }
}

module.exports = AgendamentoRepo;
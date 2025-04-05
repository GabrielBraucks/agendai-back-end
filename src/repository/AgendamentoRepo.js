const knex = require('../database/knexSetup').db;

class AgendamentoRepo {
    static async register({ idCliente, idServico, data, horario }) {
        await knex('Agendamento').insert({ idCliente, idServico, data, horario });
    }

    static async deleteById(id) {
        return await knex('Agendamento').where({ id }).delete();
    }

    // static async getByEmpresa(idEmpresa) {
    //     return await knex('Agendamento')
    //         .join
    // }
}
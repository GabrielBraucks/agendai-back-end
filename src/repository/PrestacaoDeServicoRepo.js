const knex = require('../database/knexSetup').db;

class PrestacaoDeServico {

    static async register({ idAgendamento, idFuncionario, inicio, termino }) {
        return await knex('Prestacao_de_servico').insert({ idAgendamento, idFuncionario }).returning('*');
    }
    static async deleteByIdAgendamento({idAgendamento}) {
        return await knex('Prestacao_de_servico').where({ idAgendamento }).delete();     
    }
    static async getByIdEmpresa(idEmpresa) {
        return await knex('Prestacao_de_servico')
            .join('Agendamento', 'Prestacao_de_servico.idAgendamento', 'Agendamento.id')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Empresa.id', idEmpresa)
            .select(
                'Prestacao_de_servico.*',
                'Agendamento.data as dataAgendamento',
                'Cliente.nome as nomeCliente',
                'Servico.nome as nomeServico',
                'Servico.preco as precoServico',
                'Empresa.nome as nomeEmpresa',
                'Empresa.id as idEmpresa'
            );
    }

    static async getByDayAndIdEmpresa(idEmpresa, day) {
        return await knex('Prestacao_de_servico')
            .join('Agendamento', 'Prestacao_de_servico.idAgendamento', 'Agendamento.id')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Empresa.id', idEmpresa)
            .whereRaw("strftime('%Y-%m-%d', Agendamento.data) = ?", [day])
            .select(
                'Prestacao_de_servico.*',
                'Agendamento.data as dataAgendamento',
                'Cliente.nome as nomeCliente',
                'Servico.nome as nomeServico',
                'Servico.preco as precoServico',
                'Empresa.nome as nomeEmpresa',
                'Empresa.id as idEmpresa'
            );
    }

    static async getByMonthAndIdEmpresa(idEmpresa, month) {
        return await knex('Prestacao_de_servico')
            .join('Agendamento', 'Prestacao_de_servico.idAgendamento', 'Agendamento.id')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Empresa.id', idEmpresa)
            .whereRaw("strftime('%Y-%m', Agendamento.data) = ?", [month])
            .select(
                'Prestacao_de_servico.*',
                'Agendamento.data as dataAgendamento',
                'Cliente.nome as nomeCliente',
                'Servico.nome as nomeServico',
                'Servico.preco as precoServico',
                'Empresa.nome as nomeEmpresa',
                'Empresa.id as idEmpresa'
            );
    }

    static async getByYearAndIdEmpresa(idEmpresa, year) {
        return await knex('Prestacao_de_servico')
            .join('Agendamento', 'Prestacao_de_servico.idAgendamento', 'Agendamento.id')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Empresa.id', idEmpresa)
            .whereRaw("strftime('%Y', Agendamento.data) = ?", [year])
            .select(
                'Prestacao_de_servico.*',
                'Agendamento.data as dataAgendamento',
                'Cliente.nome as nomeCliente',
                'Servico.nome as nomeServico',
                'Servico.preco as precoServico',
                'Empresa.nome as nomeEmpresa',
                'Empresa.id as idEmpresa'
            );
    }
}

module.exports = PrestacaoDeServico;
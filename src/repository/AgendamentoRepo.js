const knex = require('../database/knexSetup').db;
const timeUtils = require('../utils/time'); // Importação adicionada

class AgendamentoRepo {
    static async register({ idCliente, idServico, data, horario, googleCalendarEventId = null }) {
        return await knex('Agendamento')
            .insert({ idCliente, idServico, data, horario, googleCalendarEventId })
            .returning('*');
    }

    static async update({ id, idCliente, idServico, data, horario }) {
        return await knex('Agendamento').where({ id }).update({ idCliente, idServico, data, horario });
    }

    static async updateEventId(id, googleCalendarEventId) {
        return await knex('Agendamento').where({ id }).update({ googleCalendarEventId });
    }

    static async deleteById(id) {
        return await knex('Agendamento').where({ id }).delete();
    }

    static async getByIdEmpresa(idEmpresa) {
        return await knex('Agendamento')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .join('Prestacao_de_servico', 'Agendamento.id', 'Prestacao_de_servico.idAgendamento')
            .join('Funcionario', 'Prestacao_de_servico.idFuncionario', 'Funcionario.id')
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Empresa.id', idEmpresa)
            .select(
                'Agendamento.id',
                'Agendamento.idCliente',
                'Agendamento.idServico',
                knex.raw("strftime('%Y-%m-%d', Agendamento.data) as data"), // Formata a data
                'Agendamento.horario',
                'Agendamento.googleCalendarEventId',
                'Cliente.nome as nomeCliente',
                'Cliente.email as emailCliente',
                'Funcionario.nome as nomeFuncionario',
                'Servico.nome as nomeServico',
                'Servico.duracao as duracao',
                'Empresa.nome as nomeEmpresa',
                'Empresa.id as idEmpresa',
                'Empresa.endereco as enderecoEmpresa'
            );
    }
    
    static async getByIdClienteAndPeriodo(idCliente, data, horarioInicio, horarioFim) {
        // Lógica para evitar sobreposição de horários
        const agendamentos = await knex.raw(`
            SELECT A.*, S.duracao FROM Agendamento AS A
            JOIN Servico AS S ON A.idServico = S.id
            WHERE A.idCliente = ? AND strftime('%Y-%m-%d', A.data) = ?
        `, [idCliente, data]);
        
        return agendamentos.filter(ag => {
            const inicioAg = ag.horario;
            const fimAg = timeUtils.addDuration(inicioAg, ag.duracao);
            return (horarioInicio < fimAg && horarioFim > inicioAg);
        });
    }

    static async getByFuncionarioAndPeriodo(idFuncionario, data, horarioInicio, horarioFim) {
        const agendamentos = await knex.raw(`
            SELECT A.*, S.duracao FROM Agendamento AS A
            JOIN Servico AS S ON A.idServico = S.id
            JOIN Prestacao_de_servico AS P ON A.id = P.idAgendamento
            WHERE P.idFuncionario = ? AND strftime('%Y-%m-%d', A.data) = ?
        `, [idFuncionario, data]);
        
        return agendamentos.filter(ag => {
            const inicioAg = ag.horario;
            const fimAg = timeUtils.addDuration(inicioAg, ag.duracao);
            return (horarioInicio < fimAg && horarioFim > inicioAg);
        });
    }

    static async getOne(id) {
        return await knex('Agendamento')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .join('Prestacao_de_servico', 'Prestacao_de_servico.idAgendamento', 'Agendamento.id')
            .join('Funcionario', 'Prestacao_de_servico.idFuncionario', 'Funcionario.id')
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Agendamento.id', id)
            .select(
                'Agendamento.id',
                'Agendamento.idCliente',
                'Agendamento.idServico',
                knex.raw("strftime('%Y-%m-%d', Agendamento.data) as data"), // Formata a data
                'Agendamento.horario',
                'Agendamento.googleCalendarEventId',
                'Cliente.nome as nomeCliente',
                'Cliente.email as emailCliente',
                'Funcionario.nome as nomeFuncionario',
                'Servico.nome as nomeServico',
                'Servico.duracao as duracao',
                'Empresa.nome as nomeEmpresa',
                'Empresa.id as idEmpresa',
                'Empresa.endereco as enderecoEmpresa'
            ).first();
    }
}

module.exports = AgendamentoRepo;

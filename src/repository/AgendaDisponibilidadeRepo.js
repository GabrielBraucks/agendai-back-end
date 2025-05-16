const knex = require('../database/knexSetup').db;

class AgendaDisponibilidadeRepo {
    static async register({ idServico, cpfFuncionario, diaSemana, horarioInicio, horarioFim }) {
        await knex('Agenda_de_disponibilidade').insert({ idServico, cpfFuncionario, diaSemana, horarioInicio, horarioFim });
    }

    static async deleteById(id, idEmpresa) {
        return await knex('Funcionario').where({ id, idEmpresa }).delete();
    }
    static async getAll() {
        return await knex('Agenda_de_disponibilidade')
            .join("Servico", "idServico", "=", "Servico.id")
            .join("Funcionario", "cpfFuncionario", "=", "Funcionario.cpf")
            .select(
                'Servico.id as idServico',
                'Servico.nome as nomeServico',
                'Funcionario.cpf',
                'Funcionario.nome',
                'Agenda_de_disponibilidade.email',
                'Agenda_de_disponibilidade.horarioInicio',
                'Agenda_de_disponibilidade.horarioFim',
                'Agenda_de_disponibilidade.diaSemana',);
    }
    static async getByEmpresa(idEmpresa) {
        return await knex('Agenda_de_disponibilidade')
            .join("Servico", "idServico", "=", "Servico.id")
            .join("Funcionario", "cpfFuncionario", "=", "Funcionario.cpf")
            .where({ "Funcionario.idEmpresa": idEmpresa })
            .select(
                'Agenda_de_disponibilidade.id',
                'Servico.id as idServico',
                'Servico.nome as nomeServico',
                'Funcionario.cpf',
                'Funcionario.nome',
                'Agenda_de_disponibilidade.horarioInicio',
                'Agenda_de_disponibilidade.horarioFim',
                'Agenda_de_disponibilidade.diaSemana',);
    }

    static async updateByIdAndIdEmpresa({ id, cpfFuncionario, horarioInicio, horarioFim, diaSemana, idServico }) {
        return await knex('Agenda_de_disponibilidade')
            .where({ id })
            .update({
                cpfFuncionario,
                horarioInicio,
                horarioFim,
                diaSemana,
                idServico
            });
    }

    static async updateSenhaByIdAndIdEmpresa({ id, idEmpresa, senha }) {
        return await knex('Funcionario')
            .where({ idEmpresa, id })
            .update({
                senha
            });
    }

    static async getOne(id) {
        return await knex('Agenda_de_disponibilidade')
            .join("Servico", "idServico", "=", "Servico.id")
            .join("Funcionario", "cpfFuncionario", "=", "Funcionario.cpf")
            .where({ "Agenda_de_disponibilidade.id":id })
            .select(
                'Agenda_de_disponibilidade.id',
                'Servico.id as idServico',
                'Servico.idEmpresa',
                'Servico.nome as nomeServico',
                'Funcionario.cpf',
                'Funcionario.nome',
                'Agenda_de_disponibilidade.horarioInicio',
                'Agenda_de_disponibilidade.horarioFim',
                'Agenda_de_disponibilidade.diaSemana').first();
    }
}

module.exports = AgendaDisponibilidadeRepo;
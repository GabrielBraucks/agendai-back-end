const AgendaDisponibilidadeRepo = require('../repository/AgendaDisponibilidadeRepo');

async function register({ idServico, cpfFuncionario, diaSemana, horarioInicio, horarioFim }) {
    await AgendaDisponibilidadeRepo.register({ idServico, cpfFuncionario, diaSemana, horarioInicio, horarioFim });
}
module.exports = {
    register
}
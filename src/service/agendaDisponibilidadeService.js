const AgendaDisponibilidadeRepo = require('../repository/AgendaDisponibilidadeRepo');

async function register({ idServico, cpfFuncionario, diaSemana, horarioInicio, horarioFim }) {
    await AgendaDisponibilidadeRepo.register({ idServico, cpfFuncionario, diaSemana, horarioInicio, horarioFim });
}
async function list(id) {
    data = await AgendaDisponibilidadeRepo.getByEmpresa(id);
    return data;
}
async function updateById({ id, cpfFuncionario, horarioInicio, horarioFim, diaSemana, idServico, idEmpresa }) {
    const agenda = await AgendaDisponibilidadeRepo.getOne(id,idEmpresa);
    if (!agenda) {
        throw new Error('Agenda não encontrada');
    }else if (agenda.idEmpresa !== idEmpresa) {
        throw new Error('Agenda não pertence a empresa');
    }
    await AgendaDisponibilidadeRepo.updateByIdAndIdEmpresa({ id, cpfFuncionario, horarioInicio, horarioFim, diaSemana, idServico, idEmpresa });
}
module.exports = {
    register,
    list,
    updateById
}
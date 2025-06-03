const AgendamentoRepo = require('../repository/AgendamentoRepo');

async function getByMonthAndIdEmpresa(idEmpresa, month) {
    const agendamentos = await AgendamentoRepo.getByMonthAndIdEmpresa(idEmpresa, month);

    return [agendamentos, null];
}

async function getByYearAndIdEmpresa(idEmpresa, year) {
    const agendamentos = await AgendamentoRepo.getByYearAndIdEmpresa(idEmpresa, year);

    return [agendamentos, null]
}

async function getByIdEmpresa(idEmpresa) {
    const agendamentos = await AgendamentoRepo.getByIdEmpresa(idEmpresa);

    return [agendamentos, null]
}

module.exports = { getByMonthAndIdEmpresa, getByYearAndIdEmpresa, getByIdEmpresa };
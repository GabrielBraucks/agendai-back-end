const PrestacaoDeServico = require("../repository/PrestacaoDeServicoRepo");

async function getByIdEmpresa(idEmpresa) {
    const prestacoes = await PrestacaoDeServico.getByIdEmpresa(idEmpresa);

    return [prestacoes, null];
}

async function getByDayAndIdEmpresa(idEmpresa, day) {
    const prestacoes = await PrestacaoDeServico.getByDayAndIdEmpresa(idEmpresa, day);

    return [prestacoes, null];
}

async function getByMonthAndIdEmpresa(idEmpresa, month) {
    const prestacoes = await PrestacaoDeServico.getByMonthAndIdEmpresa(idEmpresa, month);

    return [prestacoes, null];
}

async function getByYearAndIdEmpresa(idEmpresa, year) {
    const prestacoes = await PrestacaoDeServico.getByYearAndIdEmpresa(idEmpresa, year);

    return [prestacoes, null];
}


module.exports = {
    getByIdEmpresa,
    getByDayAndIdEmpresa,
    getByMonthAndIdEmpresa,
    getByYearAndIdEmpresa
}
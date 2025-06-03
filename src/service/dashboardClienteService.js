const ClienteRepo = require("../repository/ClienteInternoRepo");

async function getByMonthAndIdEmpresa(idEmpresa, month) {
    const clientes = await ClienteRepo.getByMonthAndIdEmpresa(idEmpresa, month);

    return [clientes, null];
}

async function getByYearAndIdEmpresa(idEmpresa, year) {
    const clientes = await ClienteRepo.getByYearAndIdEmpresa(idEmpresa, year);

    return [clientes, null];
}

async function getByDayAndIdEmpresa(idEmpresa, day) {
    const clientes = await ClienteRepo.getByDayAndIdEmpresa(idEmpresa, day);

    return [clientes, null];
}

async function getByIdEmpresa(idEmpresa) {
    const clientes = await ClienteRepo.getByEmpresa(idEmpresa);

    return [clientes, null];
}

module.exports = {
    getByMonthAndIdEmpresa,
    getByYearAndIdEmpresa,
    getByDayAndIdEmpresa,
    getByIdEmpresa
};
const ServicoRepo = require('../repository/ServicoRepo');

async function register(data) {
    await ServicoRepo.register(data)
}
async function update(data) {
    await ServicoRepo.updateByIdAndIdEmpresa(data)
}

async function deletebyId(id, idEmpresa) {
    await ServicoRepo.deleteByIdAndIdEmpresa(id, idEmpresa)
}

async function list() {
    return await ServicoRepo.getAll()
}

async function getOne(id) {
    return await ServicoRepo.getOne(id)
}

module.exports = { register, deletebyId, list, update, getOne };
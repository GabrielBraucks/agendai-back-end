import {ServicoRepo} from '../repository/ServicoRepo.js'
export async function register(data) {
    await ServicoRepo.register(data)
}
export async function update(data) {
    await ServicoRepo.updateByIdAndIdEmpresa(data)
}

export async function deletebyId(id, idEmpresa) {
    await ServicoRepo.deleteByIdAndIdEmpresa(id, idEmpresa)
}

export async function list() {
    return await ServicoRepo.getAll()
}

export async function listByIdEmpresa(idEmpresa) {
    return await ServicoRepo.getByIdEmpresa(idEmpresa);
}

export async function getOne(id) {
    return await ServicoRepo.getOne(id)
}
const ClienteInternoRepo = require('../repository/ClienteInternoRepo');

async function register({ cpf, email, nome, telefone, idEmpresa }) {
    const existCliente = await ClienteInternoRepo.getByEmpresaAndCpfOrEmail({ cpf, email, idEmpresa });
    if (existCliente.length) {
        throw new Error('CPF ou email já cadastrado');
    }
    await ClienteInternoRepo.register({ cpf, email, nome, telefone, idEmpresa });
}

async function deleteById(id, idEmpresa) {
    await ClienteInternoRepo.deleteById(id, idEmpresa);
}

async function getOne(id, idEmpresa) {
    return await ClienteInternoRepo.getOne(id, idEmpresa);
}

async function getAll(idEmpresa) {
    return await ClienteInternoRepo.getByEmpresa(idEmpresa);
}

async function updateByEmpresa({ id, cpf, email, nome, telefone, idEmpresa }) {
    await ClienteInternoRepo.updateByIdAndIdEmpresa({ id, cpf, email, nome, telefone, idEmpresa });
}

module.exports = { register, deleteById, getOne, getAll, updateByEmpresa };
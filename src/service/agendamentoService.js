const AgendamentoRepo = require('../repository/AgendamentoRepo');
const ClienteRepo = require('../repository/ClienteRepo');

async function register({ email, idServico, data, horario }) {
    const idCliente = await ClienteRepo.getByEmail(email);
    console.log(idCliente);
    await AgendamentoRepo.register({ idCliente: idCliente.id, idServico, data, horario });
}

async function deleteById(id) {
    return await AgendamentoRepo.deleteById(id);
}

async function getByIdEmpresa(idEmpresa) {
    return await AgendamentoRepo.getByIdEmpresa(idEmpresa);
}

async function registerCliente({
    idServico, data, horario,
    cliente: {
        email, cpf, nome, telefone, senha
    }
}) {
    const obj = {
        idServico, data, horario,
        cliente: {
            email, cpf, nome, telefone, senha
        }
    }
    console.log(obj);
    const novo_cliente = await ClienteRepo.register(obj.cliente);
    console.log(novo_cliente);
}

module.exports = { register, deleteById, getByIdEmpresa, registerCliente };
const AgendamentoRepo = require('../repository/AgendamentoRepo');
const ClienteRepo = require('../repository/ClienteRepo');
const ServicoRepo = require('../repository/ServicoRepo');

async function register({ email, idServico, data, horario }) {
    const idCliente = await ClienteRepo.getByEmail(email);
    // console.log(idCliente);
    await AgendamentoRepo.register({ idCliente: idCliente.id, idServico, data, horario });
}

async function deleteById(id) {
    return await AgendamentoRepo.deleteById(id);
}

async function getByIdEmpresa(idEmpresa) {
    return await AgendamentoRepo.getByIdEmpresa(idEmpresa);
}

async function getOne(id) {
    return await AgendamentoRepo.getOne(id);
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

    const servico = await ServicoRepo.getOne(idServico);

    if (!servico) {
        return [null, { statusCode: 401, error: 'Serviço não encontrado' }];
    }

    const novo_cliente = (await ClienteRepo.register(obj.cliente))[0];

    return await [AgendamentoRepo.register({ idCliente: novo_cliente, idServico, data, horario }), null];
}

module.exports = { register, deleteById, getByIdEmpresa, registerCliente, getOne };
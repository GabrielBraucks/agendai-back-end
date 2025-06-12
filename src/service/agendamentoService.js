const AgendamentoRepo = require('../repository/AgendamentoRepo');
const ClienteRepo = require('../repository/ClienteRepo');
const ServicoRepo = require('../repository/ServicoRepo');

async function register({ idCliente, idServico, data, horario }) {
    // const idCliente = await ClienteRepo.getByEmail(email);
    // console.log(idCliente);
    await AgendamentoRepo.register({ idCliente, idServico, data, horario });
}

async function deleteById(id) {
    return await AgendamentoRepo.deleteById(id);
}

async function getByIdEmpresa(idEmpresa) {
    const agendamentos = await AgendamentoRepo.getByIdEmpresa(idEmpresa);
    return agendamentos.map(agendamento => {
        const inicio = new Date(`${agendamento.data}T${agendamento.horario}Z`);
        const fim = new Date(inicio.getTime() + parseInt(agendamento.duracao) * 60000);
        return {
            ...agendamento,
            nomeFuncionario: 'nomeFuncionario',
            inicio: inicio.toISOString(),
            fim: fim.toISOString()
        };
    });
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
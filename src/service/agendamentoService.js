import {AgendamentoRepo} from '../repository/AgendamentoRepo.js';
import {ClienteRepo} from '../repository/ClienteRepo.js';

export async function register({ email, idServico, data, horario }) {
    const idCliente = await ClienteRepo.getByEmail(email);
    await AgendamentoRepo.register({ idCliente: idCliente.id, idServico, data, horario });
}

export async function deleteById(id) {
    return await AgendamentoRepo.deleteById(id);
}

export async function getByIdEmpresa(idEmpresa) {
    return await AgendamentoRepo.getByIdEmpresa(idEmpresa);
}

export async function getOne(id) {
    return await AgendamentoRepo.getOne(id);
}

export async function registerCliente({
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
    const novo_cliente = (await ClienteRepo.register(obj.cliente))[0];
    
    return await AgendamentoRepo.register({ idCliente: novo_cliente, idServico, data, horario });
}
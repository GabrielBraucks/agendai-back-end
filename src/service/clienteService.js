import { ClienteRepo } from '../repository/ClienteRepo.js';
import { hashSenha, compararSenha } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';

export async function register(data) {
    const { cpf, email, nome, senha, telefone, tipo, idEmpresa } = data;
    const senhaHash = await hashSenha(senha);

    await ClienteRepo.register({ cpf, email, nome, senha: senhaHash, tipo, telefone, idEmpresa });
}

export async function updateInterno(data) {
    const { cpf, email, nome, telefone, tipo, idEmpresa, id } = data;

    await ClienteRepo.updateOneByEmpresa({ cpf, email, nome, telefone, tipo, idEmpresa, id });
}
export async function deleteByIdInterno({id, idEmpresa, tipo}) {
    await ClienteRepo.deleteOneByEmpresaAndTipo({id, idEmpresa, tipo});
}

export async function deleteById(id) {
    await ClienteRepo.deleteById(id);
}

export async function getByEmpresa(id) {
    return await ClienteRepo.getByEmpresa(id);
}

export async function getOne(id) {
    return await ClienteRepo.getOne(id);
}

export async function login(data) {
    const { email, senha } = data;
    const cliente = await ClienteRepo.getByEmail(email);

    if (!cliente) {
        return [null, { statusCode: 401, error: 'Cliente não encontrado' }];
    }

    const senhaCorreta = await compararSenha(senha, cliente.senha);
    if (!senhaCorreta) {
        return [null, { statusCode: 401, error: 'Senha incorreta' }];
    }

    const token = generateToken({ id: cliente.id, cpf: cliente.cpf, nome: cliente.nome, role: 'Cliente' });
    return [{
        message: 'Login bem sucedido!',
        cliente: {
            cpf: cliente.cpf, nome: cliente.nome, email: cliente.email, telefone: cliente.telefone
        },
        token
    }, null]
}
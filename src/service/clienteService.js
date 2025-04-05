const ClienteRepo = require('../repository/ClienteRepo');
const { hashSenha, compararSenha } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

async function register(data) {
    const { cpf, email, nome, senha, endereco } = data;
    const senhaHash = await hashSenha(senha);

    await ClienteRepo.register({ cpf, email, nome, senha: senhaHash, endereco });
}

async function deleteById(id) {
    await ClienteRepo.deleteById(id);
}

async function getOne(id) {
    return await ClienteRepo.getOne(id);
}

async function login(data) {
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

module.exports = { register, deleteById, getOne, login };
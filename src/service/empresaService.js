const { hashSenha, compararSenha } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

const EmpresaRepo = require('../repository/EmpresaRepo');

async function register(data) {
    const { cnpj, email, nome, senha, endereco } = data;
    const senhaHash = await hashSenha(senha);

    await EmpresaRepo.register({ cnpj, email, nome, senha: senhaHash, endereco })
}

async function login(data) {
    const { email, senha } = data;
    const empresa = await EmpresaRepo.getByEmail(email);

    if (!empresa) {
        return [null, { statusCode: 401, error: 'Empresa não encontrada' }];
    }

    const senhaCorreta = await compararSenha(senha, empresa.senha);
    if (!senhaCorreta) {
        return [null, { statusCode: 401, error: 'Senha incorreta' }];
    }

    const token = generateToken({ id: empresa.id, cnpj: empresa.cnpj, nome: empresa.nome, role: 'Empresa' });
    return [{
        message: 'Login bem sucedido!',
        empresa: {
            cnpj: empresa.cnpj, nome: empresa.nome, email: empresa.email, telefone: empresa.telefone
        },
        token
    }, null]
}

async function profile(id) {
    const empresa = await EmpresaRepo.getById(id);

    if (!empresa) {
        return [null, { statusCode: 401, error: 'Empresa não encontrada' }];
    }

    return [{
        user: 'empresa',
        empresa: {
            cnpj: empresa.cnpj, nome: empresa.nome, email: empresa.email, telefone: empresa.telefone
        },
    }, null]
}

module.exports = { register, login, profile };
const { hashSenha, compararSenha } = require('../utils/bcrypt');

const EmpresaRepo = require('../repository/EmpresaRepo');

async function register(data) {
    const { cnpj, email, nome, senha, endereco } = data;
    const senhaHash = await hashSenha(senha);

    await EmpresaRepo.register({ cnpj, email, nome, senha: senhaHash, endereco })
}

async function login(data) {
    const { email, senha } = data;
    const empresa = await EmpresaRepo.getByEmail(email);
    console.log(empresa);

    if (!empresa) {
        return [null, { statusCode: 401, error: 'Empresa não encontrada' }];
    }

    const senhaCorreta = await compararSenha(senha, empresa.senha);
    if (!senhaCorreta) {
        return [null, { statusCode: 401, error: 'Senha incorreta' }];
    }

    return [{ message: 'Login bem sucedido!' }, null]
}

module.exports = { register, login };
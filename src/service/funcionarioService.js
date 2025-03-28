const { hashSenha, compararSenha } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

const FuncionarioRepo = require('../repository/FuncionarioRepo');

async function register(data) {
    const { cpf, idEmpresa, nome, email, telefone, data_nasc, cargo, senha } = data;
    const senhaHash = await hashSenha(senha);
    await FuncionarioRepo.register({ cpf, idEmpresa, nome, email, telefone, data_nasc, cargo, senha: senhaHash })
}

async function list(idEmpresa) {
    const funcionarios = await FuncionarioRepo.getByEmpresa(idEmpresa);
    return funcionarios;
}

async function deleteById(id, idEmpresa) {
    await FuncionarioRepo.deleteById(id, idEmpresa);
}

async function update(data) {
    const { id, cpf, idEmpresa, nome, email, telefone, data_nasc, cargo } = data;
    await FuncionarioRepo.updateByIdAndIdEmpresa({ id, cpf, idEmpresa, nome, email, telefone, data_nasc, cargo });
}

async function getOne(id, idEmpresa) {
    const funcionario = await FuncionarioRepo.getOne(id, idEmpresa);
    return funcionario;
}
async function changePass(id, idEmpresa, senha) {
    const senhaHash = await hashSenha(senha);
    await FuncionarioRepo.updateSenhaByIdAndIdEmpresa({ id, idEmpresa, senha: senhaHash });    
}

module.exports = { register, list, deleteById, update, getOne, changePass };
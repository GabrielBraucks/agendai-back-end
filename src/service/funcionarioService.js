import { hashSenha, compararSenha } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';

import { FuncionarioRepo } from '../repository/FuncionarioRepo.js';

export async function register(data) {
    const { cpf, idEmpresa, nome, email, telefone, data_nasc, cargo, senha, perfil } = data;
    const senhaHash = await hashSenha(senha);
    return await FuncionarioRepo.register({ cpf, idEmpresa, nome, email, telefone, data_nasc, cargo, senha: senhaHash, perfil })
}

export async function list(idEmpresa) {
    const funcionarios = await FuncionarioRepo.getByEmpresa(idEmpresa);
    return funcionarios;
}

export async function deleteById(id, idEmpresa) {
    await FuncionarioRepo.deleteById(id, idEmpresa);
}

export async function update(data) {
    const { id, cpf, idEmpresa, nome, email, telefone, data_nasc, cargo, perfil } = data;
    await FuncionarioRepo.updateByIdAndIdEmpresa({ id, cpf, idEmpresa, nome, email, telefone, data_nasc, cargo, perfil });
}

export async function getOne(id, idEmpresa) {
    const funcionario = await FuncionarioRepo.getOne(id, idEmpresa);
    return funcionario;
}
export async function changePass(id, idEmpresa, senha) {
    const senhaHash = await hashSenha(senha);
    await FuncionarioRepo.updateSenhaByIdAndIdEmpresa({ id, idEmpresa, senha: senhaHash });
}
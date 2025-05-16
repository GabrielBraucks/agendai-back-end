import { hashSenha, compararSenha } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';

import {EmpresaRepo} from '../repository/EmpresaRepo.js';

export async function register(data) {
    const { cnpj, email, nome, senha, endereco, perfil } = data;
    const senhaHash = await hashSenha(senha);

    return await EmpresaRepo.register({ cnpj, email, nome, senha: senhaHash, endereco, perfil })
}

export async function login(data) {
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
            id: empresa.id, cnpj: empresa.cnpj, nome: empresa.nome, email: empresa.email, telefone: empresa.telefone
        },
        token
    }, null]
}

export async function profile(id) {
    const empresa = await EmpresaRepo.getById(id);

    if (!empresa) {
        return [null, { statusCode: 401, error: 'Empresa não encontrada' }];
    }

    return [{
        user: 'empresa',
        id,
        empresa: {
            cnpj: empresa.cnpj, nome: empresa.nome, email: empresa.email, telefone: empresa.telefone
        },
    }, null]
}
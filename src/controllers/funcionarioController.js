import * as funcionarioService from '../service/funcionarioService.js';
import {RegisterFuncionarioDTO} from '../dto/registerFuncionarioDTO.js';
import {UpdateFuncionarioDTO} from '../dto/updateFuncionarioDTO.js';

export async function registerFuncionario(req, res) {
    try {
        const dto = new RegisterFuncionarioDTO(req.body);
        await funcionarioService.register({ ...dto, idEmpresa: Number(req.user.id) });
        res.status(201).json({ message: 'Funcionário criado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao criar Funcionário: Dados errados ou funcionário já existe.' });
        }
    }
}

export async function updateFuncionario(req, res) {
    try {
        const dto = new UpdateFuncionarioDTO(req.body);
        const id = Number(req.params.id);

        await funcionarioService.update({ ...dto, id , idEmpresa:req.user.id});
        res.status(201).json({ message: 'Funcionário atualizado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao atualizar Funcionário' });
        }
    }
}

export async function deleteFuncionario(req, res) {
    try {
        await funcionarioService.deleteById(Number(req.params.id), req.user.id);
        res.status(201).json({ message: 'Funcionário deletado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao deletar Funcionário.' });
        }
    }
}

export async function listFuncionarios(req, res) {
    try {
        const result = await funcionarioService.list(Number(req.params.idEmpresa));
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao listar funcionários.' });
        }
    }
}

export async function getOneFuncionario(req, res) {
    try {
        const result = await funcionarioService.getOne(Number(req.params.id), req.user.id);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao consultar Funcionário.' });
        }
    }
}

export async function updatePasswordFuncionario(req, res) {
    try {
        const { senha } = new ChangePassFuncionarioDTO(req.body);
        await funcionarioService.changePass(Number(req.params.id), req.user.id, senha);
        res.status(201).json({ message: 'Senha atualizada com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao atualizar senha.' });
        }
    }
}
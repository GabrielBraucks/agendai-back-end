import * as clienteService from '../service/clienteService.js'
import {RegisterClienteDTO} from '../dto/registerClienteDTO.js'
import {RegisterClienteInternoDTO} from '../dto/registerClienteInternoDTO.js'

export async function registerCliente(req, res) {
    try {
        const dto = new RegisterClienteDTO(req.body);
        await clienteService.register({ ...dto });
        res.status(201).json({ message: 'Cliente criado com sucesso!' });
    } catch (error) {
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao criar cliente: dados incorretos ou cliente já existente.' });
        }
    }
}

export async function registerClienteInterno(req, res) {
    try {
        const dto = new RegisterClienteInternoDTO(req.body);
        await clienteService.register({ ...dto, tipo:0, senha: "", idEmpresa: req.user.id });
        res.status(201).json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
        console.error(error)
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao atualizar cliente: dados incorretos ou cliente não Existente.' });
        }
    }
}

export async function updateClienteInterno(req, res) {
    try {
        const dto = new RegisterClienteInternoDTO(req.body);
        await clienteService.updateInterno({ ...dto, tipo:0, senha: "", idEmpresa: req.user.id, id: req.params.id });
        res.status(201).json({ message: 'Cliente criado com sucesso!' });
    } catch (error) {
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao criar cliente: dados incorretos ou cliente já existente.' });
        }
    }
}

export async function deleteClienteInterno(req, res) {
    // O ideal seria verificar o tipo de cliente, se for criado pela empresa, a empresa pode apagar.
    try {
        await clienteService.deleteByIdInterno({ idEmpresa: req.user.id, id: req.params.id, tipo: 0 });
        res.status(201).json({ message: 'Cliente deletado com sucesso!' });
    } catch (error) {
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao tentar deletar cliente: dados incorretos ou cliente inexistente' });
        }
    }
}

export async function deleteCliente(req, res) {
    // O ideal seria verificar o tipo de cliente, se for criado pela empresa, a empresa pode apagar.
    try {
        await clienteService.deleteById(Number(req.params.id));
        res.status(201).json({ message: 'Cliente deletado com sucesso!' });
    } catch (error) {
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao tentar deletar cliente: dados incorretos ou cliente inexistente' });
        }
    }
}

export async function listClienteInterno(req, res) {
    try {
        const result = await clienteService.getByEmpresa(Number(req.user.id));
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao procurar cliente: dados incorretos ou cliente inexistente' });
        }
    }
}

export async function getOneCliente(req, res) {
    try {
        const result = await clienteService.getOne(Number(req.params.id));
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao procurar cliente: dados incorretos ou cliente inexistente' });
        }
    }
}

export async function loginCliente(req, res) {
  try {
    const [ result, err ] = await clienteService.login(req.body);

    if (err) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}
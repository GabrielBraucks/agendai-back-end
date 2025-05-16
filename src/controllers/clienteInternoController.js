const clienteInternoService = require('../service/clienteInternoService');

const RegisterClienteInternoDTO = require('../dto/registerClienteInternoDTO');

async function registerClienteInterno(req, res) {
    try {
        const dto = new RegisterClienteInternoDTO(req.body);
        await clienteInternoService.register({ ...dto, idEmpresa: req.user.id });
        res.status(201).json({ message: 'Cliente criado com sucesso!' });
    } catch (error) {
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao criar cliente: dados incorretos ou cliente já existente.' });
        }
    }
}

async function deleteClienteInterno(req, res) {
    try {
        await clienteInternoService.deleteById(Number(req.params.id), req.user.id);
        res.status(200).json({ message: 'Cliente deletado com sucesso!' });
    } catch (error) {
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao tentar deletar cliente: dados incorretos ou cliente inexistente' });
        }
    }
}

async function getOneClienteInterno(req, res) {
    try {
        const result = await clienteInternoService.getOne(Number(req.params.id), req.user.id);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao procurar cliente: dados incorretos ou cliente inexistente' });
        }
    }
}

async function updateClienteInterno(req, res) {
    try {
        const dto = new RegisterClienteInternoDTO(req.body);
        const id = Number(req.params.id);

        await clienteInternoService.updateByEmpresa({ ...dto, idEmpresa: req.user.id, id });
        res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao atualizar Cliente.' });
        }
    }
}

async function getAllClienteInterno(req, res) {
    try {
        const result = await clienteInternoService.getAll(req.user.id);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao procurar cliente: dados incorretos ou cliente inexistente' });
        }
    }
}

module.exports = {
    registerClienteInterno,
    deleteClienteInterno,
    updateClienteInterno,
    getOneClienteInterno,
    getAllClienteInterno,
};
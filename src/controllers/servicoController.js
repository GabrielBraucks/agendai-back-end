const servicoService = require('../service/servicoService');

const RegisterServicoDTO = require("../dto/registerServicoDTO");

async function registerServico(req, res) {
    try {
        const dto = new RegisterServicoDTO(req.body);
        await servicoService.register({ ...dto, idEmpresa: req.user.id });
        res.status(201).json({ message: 'Serviço criado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao criar serviço.' });
        }
    }
}

async function updateServico(req, res) {
    try {
        const dto = new RegisterServicoDTO(req.body);
        const id = Number(req.params.id);

        await servicoService.update({ ...dto, idEmpresa: req.user.id, id });
        res.status(201).json({ message: 'Serviço atualizado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao atualizar serviço.' });
        }
    }
}

async function deleteServico(req, res) {
    try {
        const id = Number(req.params.id);
        await servicoService.deletebyId(id, req.user.id);
        res.status(201).json({ message: 'Serviço deletado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao deletar serviço.' });
        }
    }
}

async function listServico(req, res) {
    try {
        const result = await servicoService.listByIdEmpresa(Number(req.params.idEmpresa));
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao listar serviços.' });
        }
    }
}

async function listServicoEmpresa(req, res) {
    try {
        const result = await servicoService.listByIdEmpresa(req.user.id);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao listar serviços.' });
        }
    }
}

async function getOneServico(req, res) {
    try {
        const result = await servicoService.getOne(Number(req.params.id));
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao consultar serviço.' });
        }
    }
}

module.exports = {
    registerServico,
    deleteServico,
    listServico,
    listServicoEmpresa,
    updateServico,
    getOneServico
};
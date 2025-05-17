const RegisterAgendamentoDTO = require('../dto/registerAgendamentoDTO');
const RegisterClienteAgendamentoDTO = require('../dto/registerClienteAgendamentoDTO');
const agendamentoService = require('../service/agendamentoService');

async function registerAgendamento(req, res) {
    try {
        const dto = new RegisterAgendamentoDTO(req.body);
        await agendamentoService.register({ ...dto });
        res.status(201).json({ message: 'Agendamento criado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao criar Agendamento.' });
        }
    }
}

async function registerAgendamentoAndCliente(req, res) {
    try {
        const dto = new RegisterClienteAgendamentoDTO(req.body);
        const [result, err] = await agendamentoService.registerCliente({ ...dto });

        if (err) {
            return res.status(err.statusCode).json(err);
        }

        return res.status(201).json({ message: 'Agendamento e Cliente criados com sucesso!' });
    } catch (error) {
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao criar Agendamento: dados errados ou o cliente já existe.' });
        }
    }
}

async function deleteAgendamentoById(req, res) {
    try {
        const id = Number(req.params.id);
        await agendamentoService.deleteById(id);
        res.status(201).json({ message: 'Serviço deletado com sucesso!' });
    } catch (error) {
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro deletar Agendamento.' });
        }
    }
}

async function listAgendamentos(req, res) {
    try {
        const result = await agendamentoService.getByIdEmpresa(Number(req.params.idEmpresa));
        res.status(201).json(result);
    } catch (error) {
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao listar Agendamentos.' });
        }
    }
}

async function getOneAgendamento(req, res) {
    try {
        const result = await agendamentoService.getOne(Number(req.params.id));
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
    registerAgendamento,
    registerAgendamentoAndCliente,
    deleteAgendamentoById,
    listAgendamentos,
    getOneAgendamento
}
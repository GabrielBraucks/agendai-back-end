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
        await agendamentoService.registerCliente({ ...dto });
        res.status(201).json({ message: 'Agendamento criado com sucesso!' });
    } catch (error) {
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao criar Agendamento.' });
        }
    }
}

module.exports = {
    registerAgendamento,
    registerAgendamentoAndCliente
}
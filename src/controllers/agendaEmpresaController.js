const RegisterAgendamentoDTO = require('../dto/registerAgendamentoDTO');
const agendaEmpresaService = require('../service/agendaEmpresaService');
const { ResponseError } = require('../utils/ResponseError');

async function registerAgendaEmpresa(req, res) {
    try {
        const dto = new RegisterAgendamentoDTO(req.body);
        await agendaEmpresaService.register({ ...dto, idEmpresa: req.user.id });
        res.status(201).json({ message: 'Agendamento criado com sucesso!' });
    } catch (error) {
        ResponseError(res, error);
    }
}
async function listAgendaEmpresa(req, res) {
    try {
        const result = await agendaEmpresaService.list(req.user.id);
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
    registerAgendaEmpresa,
    listAgendaEmpresa,
}
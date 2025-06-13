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
async function updateAgendaEmpresa(req, res) {
    try {
        console.log("update agenda");
        const dto = new RegisterAgendamentoDTO(req.body);
        await agendaEmpresaService.update({ ...dto, idEmpresa: req.user.id, id: req.params.id });
        res.status(200).json({ message: 'Agendamento criado com sucesso!' });
    } catch (error) {
        ResponseError(res, error);
    }
}
async function listAgendaEmpresa(req, res) {
    try {
        const result = await agendaEmpresaService.list(req.user.id);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao procurar empresa: dados incorretos ou empresa inexistente' });
        }
    }
}
async function removeAgendaEmpresa(req, res) {
    try {
        const { id } = req.params;
        await agendaEmpresaService.deleteById({
            id,
            idEmpresa: req.user.id
        });
        res.status(200).json({ message: 'Agendamento excluído com sucesso!' });
    } catch (error) {
        ResponseError(res, error);
    }
}
module.exports = {
    registerAgendaEmpresa,
    listAgendaEmpresa,
    removeAgendaEmpresa,
    updateAgendaEmpresa
}
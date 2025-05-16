const agendaDisponibilidadeService = require('../service/agendaDisponibilidadeService');
const RegisterAgendaDisponibilidadeDTO = require('../dto/registerAgendaDisponibilidadeDTO');

async function registerAgendaDisponibilidade(req, res) {
    try {
        const dto = new RegisterAgendaDisponibilidadeDTO(req.body);
        await agendaDisponibilidadeService.register({ ...dto });
        res.status(201).json({ message: 'Agenda criada com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao criar empresa' });
        }
    }
}

async function listAgendaDisponibilidade(req, res) {
    try {
        const data = await agendaDisponibilidadeService.list(req.user.id);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar Agenda' });

    }
}

async function updateAgendaDisponibilidade(req, res) {
    try {
        const dto = new RegisterAgendaDisponibilidadeDTO(req.body);
        await agendaDisponibilidadeService.updateById({ ...dto, idEmpresa: req.user.id, id: req.params.id });
        res.status(201).json({ message: 'Agenda de Disponibilidade atualizado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao atualizar Agenda' });
        }
    }
}

module.exports = {
    registerAgendaDisponibilidade,
    listAgendaDisponibilidade,
    updateAgendaDisponibilidade
};
import agendaDisponibilidadeService from '../service/agendaDisponibilidadeService.js';
import RegisterAgendaDisponibilidadeDTO from '../dto/registerAgendaDisponibilidadeDTO.js';

async function registerAgendaDisponibilidade(req, res) {
    try {
        const dto = new RegisterAgendaDisponibilidadeDTO(req.body);
        await agendaDisponibilidadeService.register({ ...dto });
        res.status(201).json({ message: 'Serviço criado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao criar empresa' });
        }
    }
}

module.exports = {
    registerAgendaDisponibilidade
};
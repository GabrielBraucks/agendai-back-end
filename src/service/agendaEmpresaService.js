const timeUtils = require('../utils/time');
const AgendamentoRepo = require('../repository/AgendamentoRepo');
const PrestacaoDeServicoRepo = require('../repository/PrestacaoDeServicoRepo');
const ServicoRepo = require('../repository/ServicoRepo');
const GoogleRepo = require('../repository/GoogleRepo');
const {
    sendGmail,
    createCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent
} = require('./googleService');

/**
 * Verifica conflitos de agendamento para cliente e funcionário.
 * @param {number} idCliente - ID do cliente.
 * @param {number} idFuncionario - ID do funcionário.
 * @param {string} data - Data do agendamento (YYYY-MM-DD).
 * @param {string} horaI - Horário de início (HH:MM:SS).
 * @param {string} horaF - Horário de fim (HH:MM:SS).
 * @param {number|null} idAgendamentoAtual - ID do agendamento atual (para o caso de atualização).
 */
async function checarConflitos(idCliente, idFuncionario, data, horaI, horaF, idAgendamentoAtual = null) {
    const agendamentosCliente = await AgendamentoRepo.getByIdClienteAndPeriodo(idCliente, data, horaI, horaF);
    const conflitosCliente = agendamentosCliente.filter(a => a.id !== idAgendamentoAtual);
    if (conflitosCliente.length > 0) {
        throw {
            type: 'ConflictError',
            message: 'O cliente já possui um agendamento neste horário.',
        };
    }

    const agendamentosFuncionario = await AgendamentoRepo.getByFuncionarioAndPeriodo(idFuncionario, data, horaI, horaF);
    const conflitosFuncionario = agendamentosFuncionario.filter(a => a.id !== idAgendamentoAtual);
    if (conflitosFuncionario.length > 0) {
        throw {
            type: 'ConflictError',
            message: 'O funcionário já possui um agendamento neste horário.',
        };
    }
}

/**
 * Cria o objeto de recurso do evento para a API do Google Calendar em UTC (GMT 0).
 * @param {object} agendamento - O objeto de agendamento com dados completos.
 * @param {string} horaI - Hora de início no formato 'HH:MM:SS'.
 * @param {string} horaF - Hora de fim no formato 'HH:MM:SS'.
 * @returns {object} Objeto de recurso do evento.
 */
function criarRecursoEvento(agendamento, horaI, horaF) {
    // Garante que a data/hora seja interpretada como UTC ao criar o objeto Date
    const inicio = new Date(`${agendamento.data}T${horaI}Z`).toISOString();
    const fim = new Date(`${agendamento.data}T${horaF}Z`).toISOString();

    return {
        summary: `Agendamento: ${agendamento.nomeServico} para ${agendamento.nomeCliente}`,
        location: agendamento.enderecoEmpresa || '',
        description: `Serviço agendado: ${agendamento.nomeServico}.\nCliente: ${agendamento.nomeCliente}.\nFuncionário: ${agendamento.nomeFuncionario}.`,
        start: { dateTime: inicio, timeZone: 'UTC' }, // Especifica o timezone como UTC
        end: { dateTime: fim, timeZone: 'UTC' },     // Especifica o timezone como UTC
        attendees: [{ email: agendamento.emailCliente }],
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 60 },
            ],
        },
    };
}


async function register({ idCliente, idServico, data, horario, idEmpresa, idFuncionario }) {
    const servico = await ServicoRepo.getOne(idServico);
    const duracao = timeUtils.extrairTempo(servico.duracao);

    // O 'Z' indica que a data/hora está em UTC (GMT 0)
    const dataHoraInicio = new Date(`${data}T${horario}Z`);
    const dataHoraFinal = new Date(dataHoraInicio.getTime() + (duracao.horas * 60 + duracao.minutos) * 60000);

    const horaI = dataHoraInicio.toISOString().split('T')[1].split('.')[0];
    const horaF = dataHoraFinal.toISOString().split('T')[1].split('.')[0];

    await checarConflitos(idCliente, idFuncionario, data, horaI, horaF);

    const novoAgendamentoArray = await AgendamentoRepo.register({ idCliente, idServico, data, horario });
    const novoAgendamento = novoAgendamentoArray[0];
    await PrestacaoDeServicoRepo.register({ idAgendamento: novoAgendamento.id, idFuncionario });

    const token = await GoogleRepo.getByEmpresaId(idEmpresa);
    if (token) {
        try {
            const agendamentoCompleto = await AgendamentoRepo.getOne(novoAgendamento.id);
            const recursoEvento = criarRecursoEvento(agendamentoCompleto, horaI, horaF);

            const eventoCalendario = await createCalendarEvent(token.accessToken, token.refreshToken, recursoEvento);

            if (eventoCalendario && eventoCalendario.id) {
                await AgendamentoRepo.updateEventId(novoAgendamento.id, eventoCalendario.id);
            }
        } catch (error) {
            console.error("Falha ao criar evento no Google Calendar, mas o agendamento local foi salvo.", error);
        }
    }

    return novoAgendamento;
}

async function update({ id, idCliente, idServico, data, horario, idEmpresa, idFuncionario }) {
    const agendamento = await AgendamentoRepo.getOne(id);
    if (!agendamento) {
        throw { type: 'NotFoundError', message: 'Agendamento não encontrado.' };
    }

    const servico = await ServicoRepo.getOne(idServico);
    const duracao = timeUtils.extrairTempo(servico.duracao);
    const dataHoraInicio = new Date(`${data}T${horario}Z`);
    const dataHoraFinal = new Date(dataHoraInicio.getTime() + (duracao.horas * 60 + duracao.minutos) * 60000);

    const horaI = dataHoraInicio.toISOString().split('T')[1].split('.')[0];
    const horaF = dataHoraFinal.toISOString().split('T')[1].split('.')[0];

    await checarConflitos(idCliente, idFuncionario, data, horaI, horaF, id);

    await AgendamentoRepo.update({ id, idCliente, idServico, data, horario });
    await PrestacaoDeServicoRepo.deleteByIdAgendamento({ idAgendamento: id });
    await PrestacaoDeServicoRepo.register({ idAgendamento: id, idFuncionario });

    const token = await GoogleRepo.getByEmpresaId(idEmpresa);
    if (token && agendamento.googleCalendarEventId) {
        try {
            const agendamentoAtualizado = await AgendamentoRepo.getOne(id);
            const recursoEvento = criarRecursoEvento(agendamentoAtualizado, horaI, horaF);

            await updateCalendarEvent(token.accessToken, token.refreshToken, agendamento.googleCalendarEventId, recursoEvento);
        } catch (error) {
            console.error("Falha ao atualizar evento no Google Calendar, mas o agendamento local foi atualizado.", error);
        }
    }
}

async function list(idEmpresa) {
    const agendamentos = await AgendamentoRepo.getByIdEmpresa(idEmpresa);
    return agendamentos.map(agendamento => {
        const inicio = new Date(`${agendamento.data}T${agendamento.horario}Z`);
        const duracao = timeUtils.extrairTempo(agendamento.duracao);
        const fim = new Date(inicio.getTime() + (duracao.horas * 60 + duracao.minutos) * 60000);
        
        return {
            ...agendamento,
            inicio: inicio.toISOString(),
            fim: fim.toISOString()
        };
    });
}

async function deleteById({ id, idEmpresa }) {
    const agendamento = await AgendamentoRepo.getOne(id);
    if (!agendamento) {
        throw { type: 'NotFoundError', message: 'Agendamento não encontrado' };
    }
    if (agendamento.idEmpresa !== idEmpresa) {
        throw { type: 'ForbiddenError', message: 'Você não tem permissão para excluir esse agendamento' };
    }

    const token = await GoogleRepo.getByEmpresaId(idEmpresa);

    if (token && agendamento.googleCalendarEventId) {
        try {
            await deleteCalendarEvent(token.accessToken, token.refreshToken, agendamento.googleCalendarEventId);
        } catch (error) {
            console.error("Não foi possível cancelar o evento no Google Calendar, mas o processo continuará localmente.", error);
        }
    }

    if (token) {
        try {
            await sendGmail(
                token.accessToken,
                token.refreshToken,
                agendamento.emailCliente,
                `Agendamento cancelado: ${agendamento.nomeEmpresa}`,
                `Olá, ${agendamento.nomeCliente}.\n\nSeu agendamento para o serviço "${agendamento.nomeServico}" foi cancelado.\nPara mais detalhes ou para reagendar, por favor, entre em contato.`
            );
        } catch (error) {
            console.error("Falha ao enviar e-mail de cancelamento.", error);
        }
    }

    await PrestacaoDeServicoRepo.deleteByIdAgendamento({ idAgendamento: id });
    return await AgendamentoRepo.deleteById(id);
}

module.exports = { register, list, deleteById, update };

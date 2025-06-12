const timeUtils = require('../utils/time');
const AgendamentoRepo = require('../repository/AgendamentoRepo');
const ClienteRepo = require('../repository/ClienteRepo');
const ServicoRepo = require('../repository/ServicoRepo');
const { sendGmail } = require('./googleService');
const GoogleRepo = require('../repository/GoogleRepo');

async function register({ idCliente, idServico, data, horario, idEmpresa }) {
    const dataHoraStr = `${data}T${horario}Z`; // Formato ISO 8601
    const dataHoraInicio = new Date(dataHoraStr);
    const dataHoraFinal = new Date(dataHoraStr);
    const servico = await ServicoRepo.getOne(idServico);
    const duracao = timeUtils.extrairTempo(servico.duracao);
    dataHoraFinal.setHours(dataHoraFinal.getHours() + duracao.horas);
    dataHoraFinal.setMinutes(dataHoraFinal.getMinutes() + duracao.minutos);
    const horaI = dataHoraInicio.toISOString().split('T')[1].split('.')[0];
    const horaF = dataHoraFinal.toISOString().split('T')[1].split('.')[0];
    const agendamentos = await AgendamentoRepo.getByIdClienteAndPeriodo(idCliente, data, horaI, horaF);
    if (agendamentos.length > 0) {
        throw {
            type: 'ConflictError',
            message: 'Já existe um agendamento nesse horário',
        };
    }
    await AgendamentoRepo.register({ idCliente, idServico, data, horario });
}

async function list(idEmpresa) {
    const agendamentos = await AgendamentoRepo.getByIdEmpresa(idEmpresa);
    agendamentos.map((ag) => {
        const dataHoraStr = `${ag.data}T${ag.horario}Z`; // Formato ISO 8601
        const dataHoraInicio = new Date(dataHoraStr);
        const dataHoraFinal = new Date(dataHoraStr);
        const duracao = timeUtils.extrairTempo(servico.duracao);
        dataHoraFinal.setHours(dataHoraFinal.getHours() + duracao.horas);
        dataHoraFinal.setMinutes(dataHoraFinal.getMinutes() + duracao.minutos);
        const horaI = dataHoraInicio.toISOString().split('T')[1].split('.')[0];
        const horaF = dataHoraFinal.toISOString().split('T')[1].split('.')[0];
        // return {

        // }
    })
    return agendamentos;

}

async function deleteById({ id, idEmpresa }) {
    try {
        const agendamento = await AgendamentoRepo.getOne(id);
        if (!agendamento) {
            throw {
                type: 'NotFoundError',
                message: 'Agendamento não encontrado',
            };
        } else if (agendamento.idEmpresa !== idEmpresa) {
            throw {
                type: 'ForbiddenError',
                message: 'Você não tem permissão para excluir esse agendamento',
            };
        }
        const token = await GoogleRepo.getByEmpresaId(idEmpresa);
        if (token) {
            await sendGmail(
                token.accessToken,
                token.refreshToken,
                agendamento.emailCliente,
                `${agendamento.nomeEmpresa} cancelou seu agendamento`,
                "olá, nos encontramos que seu agendamento foi cancelado, por favor agende novamente"
            )
        }
        return await AgendamentoRepo.deleteById(id);
    } catch (error) {
        throw error;
    }
}

module.exports = { register, list, deleteById };
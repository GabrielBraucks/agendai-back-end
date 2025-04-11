const timeUtils = require('../utils/time');
const AgendamentoRepo = require('../repository/AgendamentoRepo');
const ClienteRepo = require('../repository/ClienteRepo');
const ServicoRepo = require('../repository/ServicoRepo');

async function register({ email, idServico, data, horario, idEmpresa }) {
    const dataHoraStr = `${data}T${horario}Z`; // Formato ISO 8601
    const dataHoraInicio = new Date(dataHoraStr);
    const dataHoraFinal = new Date(dataHoraStr);
    const cliente = await ClienteRepo.getByEmailAndEmpresa(email, idEmpresa);
    const servico = await ServicoRepo.getOne(idServico);
    const duracao = timeUtils.extrairTempo(servico.duracao);
    dataHoraFinal.setHours(dataHoraFinal.getHours() + duracao.horas);
    dataHoraFinal.setMinutes(dataHoraFinal.getMinutes() + duracao.minutos);
    const horaI = dataHoraInicio.toISOString().split('T')[1].split('.')[0];
    const horaF = dataHoraFinal.toISOString().split('T')[1].split('.')[0];
    const agendamentos = await AgendamentoRepo.getByIdClienteAndPeriodo(cliente.id, data, horaI, horaF);
    if (agendamentos.length > 0) {
        throw {
            type: 'ConflictError',
            message: 'Já existe um agendamento nesse horário',
        };
    }
    await AgendamentoRepo.register({ idCliente: cliente.id, idServico, data, horario });
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
        return {
            
        }
    })
    return agendamentos;

}
module.exports = { register, list };
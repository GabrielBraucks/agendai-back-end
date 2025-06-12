const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");

class RegisterAgendamentoDTO {
    constructor(agendamento) {
        if((new NumberValidate(agendamento.idServico)).validate().result()){
            this.idServico = agendamento.idServico;
        }
        if((new NumberValidate(agendamento.idFuncionario)).validate().result()){
            this.idFuncionario = agendamento.idFuncionario;
        }
        if((new NumberValidate(agendamento.idCliente)).validate().result()){
            this.idCliente = agendamento.idCliente;
        }
        if((new StringValidate(agendamento.data)).validate().result()){
            this.data = agendamento.data;
        }
        if((new StringValidate(agendamento.horario)).validate().result()){
            this.horario = agendamento.horario;
        }
    }
}
module.exports = RegisterAgendamentoDTO;
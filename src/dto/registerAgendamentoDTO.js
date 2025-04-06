const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");

class RegisterAgendamentoDTO {
    constructor(agendamento) {
        if((new StringValidate(agendamento.email)).validate().result()){
            this.email = agendamento.email;
        }
        if((new NumberValidate(agendamento.idServico)).validate().result()){
            this.idServico = agendamento.idServico;
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
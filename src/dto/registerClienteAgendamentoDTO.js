const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");
const CPFValidate = require("../validate/CPFValidate");

class RegisterClienteAgendamentoDTO {
    constructor(agendamento) {
        if((new NumberValidate(agendamento.idServico)).validate().result()){
            this.idServico = agendamento.idServico;
        }
        if((new StringValidate(agendamento.data)).validate().result()){
            this.data = agendamento.data;
        }
        if((new StringValidate(agendamento.horario)).validate().result()){
            this.horario = agendamento.horario;
        }
        this.cliente = {};
        if((new StringValidate(agendamento.cliente.email)).validate().result()){
            this.cliente.email = agendamento.cliente.email;
        }
        if((new StringValidate(agendamento.cliente.nome)).validate().result()){
            this.cliente.nome = agendamento.cliente.nome;
        }
        if((new CPFValidate(agendamento.cliente.cpf)).validate().result()){
            this.cliente.cpf = agendamento.cliente.cpf;
        }
        if((new StringValidate(agendamento.cliente.telefone)).validate().result()){
            this.cliente.telefone = agendamento.cliente.telefone;
        }
        this.cliente.senha = "SenhaIndefinida";
    }
}
module.exports = RegisterClienteAgendamentoDTO;
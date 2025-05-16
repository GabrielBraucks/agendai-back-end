const CPFValidate = require("../validate/CPFValidate");
const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");

export class RegisterFuncionarioDTO {
    constructor(servico) {
        if((new NumberValidate(servico.idServico)).validate().result()){
            this.idServico = servico.idServico;
        }
        if((new CPFValidate(servico.cpfFuncionario)).validate().result()){
            this.cpfFuncionario = servico.cpfFuncionario;
        }
        if((new NumberValidate(servico.diaSemana)).validate().result()){
            this.diaSemana = servico.diaSemana;
        }
        if((new StringValidate(servico.horarioInicio)).validate().result()){
            this.horarioInicio = servico.horarioInicio;
        }
        if((new StringValidate(servico.horarioFim)).validate().result()){
            this.horarioFim = servico.horarioFim;
        }
    }
}
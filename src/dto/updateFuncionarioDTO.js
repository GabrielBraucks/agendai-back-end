const CPFValidate = require("../validate/CPFValidate");
const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");

class UpdateFuncionarioDTO {
    constructor(servico) {
        if((new StringValidate(servico.nome)).validate().result()){
            this.nome = servico.nome;
        }
        if((new StringValidate(servico.cargo)).validate().result()){
            this.cargo = servico.cargo;
        }
        if((new CPFValidate(servico.cpf)).validate().result()){
            this.cpf = servico.cpf;
        }
        if((new StringValidate(servico.email)).validate().result()){
            this.email = servico.email;
        }
        if((new StringValidate(servico.telefone)).validate().result()){
            this.telefone = servico.telefone;
        }
        if((new StringValidate(servico.data_nasc)).validate().result()){
            this.data_nasc = servico.data_nasc;
        }
    }
}
module.exports = UpdateFuncionarioDTO;
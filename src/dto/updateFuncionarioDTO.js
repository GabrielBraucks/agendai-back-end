const CPFValidate = require("../validate/CPFValidate");
const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");

class UpdateFuncionarioDTO {
    constructor(funcionario) {
        if((new StringValidate(funcionario.nome)).validate().result()){
            this.nome = funcionario.nome;
        }
        if((new StringValidate(funcionario.cargo)).validate().result()){
            this.cargo = funcionario.cargo;
        }
        if((new CPFValidate(funcionario.cpf)).validate().result()){
            this.cpf = funcionario.cpf;
        }
        if((new StringValidate(funcionario.email)).validate().result()){
            this.email = funcionario.email;
        }
        if((new StringValidate(funcionario.telefone)).validate().result()){
            this.telefone = funcionario.telefone;
        }
        if((new StringValidate(funcionario.data_nasc)).validate().result()){
            this.data_nasc = funcionario.data_nasc;
        }
    }
}
module.exports = UpdateFuncionarioDTO;
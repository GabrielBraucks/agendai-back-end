const CPFValidate = require("../validate/CPFValidate");
const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");
const EmailValidate = require("../validate/EmailValidate");

class RegisterClienteInternoDTO {
    constructor(cliente) {
        if((new StringValidate(cliente.nome)).validate().result()){
            this.nome = cliente.nome;
        }
        if((new CPFValidate(cliente.cpf)).validate().result()){
            this.cpf = cliente.cpf;
        }
        if((new EmailValidate(cliente.email)).validate().result()){
            this.email = cliente.email;
        }
        if((new StringValidate(cliente.telefone)).validate().result()){
            this.telefone = cliente.telefone;
        }
    }
}
module.exports = RegisterClienteInternoDTO;
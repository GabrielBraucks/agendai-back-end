const CPFValidate = require("../validate/CPFValidate");
const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");

class RegisterClienteDTO {
    constructor(cliente) {
        if((new StringValidate(cliente.nome)).validate().result()){
            this.nome = cliente.nome;
        }
        if((new CPFValidate(cliente.cpf)).validate().result()){
            this.cpf = cliente.cpf;
        }
        if((new StringValidate(cliente.email)).validate().result()){
            this.email = cliente.email;
        }
        if((new StringValidate(cliente.telefone)).validate().result()){
            this.telefone = cliente.telefone;
        }
        if((new StringValidate(cliente.senha)).validate().result()){
            this.senha = cliente.senha;
        }
    }
}
module.exports = RegisterClienteDTO;
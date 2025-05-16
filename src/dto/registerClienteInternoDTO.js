import { CPFValidate } from '../validate/CPFValidate.js'
import { StringValidate } from '../validate/StringValidate.js'

export class RegisterClienteInternoDTO {
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
    }
}
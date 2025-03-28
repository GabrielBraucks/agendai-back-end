const CPFValidate = require("../validate/CPFValidate");
const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");

class ChangePassFuncionarioDTO {
    constructor(servico) {
        if((new StringValidate(servico.senha)).validate().result()){
            this.senha = servico.senha;
        }
    }
}
module.exports = ChangePassFuncionarioDTO;
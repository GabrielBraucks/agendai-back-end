const CPFValidate = require("../validate/CPFValidate");
const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");

class ChangePassFuncionarioDTO {
    constructor(funcionario) {
        if((new StringValidate(funcionario.senha)).validate().result()){
            this.senha = funcionario.senha;
        }
    }
}
module.exports = ChangePassFuncionarioDTO;
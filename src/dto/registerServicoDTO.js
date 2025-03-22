const NumberValidate = require("../validate/NumberValidate");
const StringValidate = require("../validate/StringValidate");

class RegisterServicoDTO {
    constructor(servico) {
        if((new StringValidate(servico.nome)).validate().result()){
            this.nome = servico.nome;
        }
        if((new StringValidate(servico.categoria)).validate().result()){
            this.categoria = servico.categoria;
        }
        if((new StringValidate(servico.duracao)).validate().result()){
            this.duracao = servico.duracao;
        }
        if((new NumberValidate(servico.preco)).validate().result()){
            this.preco = servico.preco;
        }
    }
}
module.exports = RegisterServicoDTO;
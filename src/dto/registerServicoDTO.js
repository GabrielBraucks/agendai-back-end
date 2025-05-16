import { StringValidate } from '../validate/StringValidate.js'
import { NumberValidate } from '../validate/NumberValidate.js'
export class RegisterServicoDTO {
    constructor(servico) {
        if ((new StringValidate(servico.nome)).validate().result()) {
            this.nome = servico.nome;
        }
        if ((new StringValidate(servico.categoria)).validate().result()) {
            this.categoria = servico.categoria;
        }
        if ((new StringValidate(servico.foto)).validate().result()) {
            this.foto = servico.foto;
        }
        if ((new StringValidate(servico.duracao)).validate().result()) {
            this.duracao = servico.duracao;
        }
        if ((new NumberValidate(servico.preco)).validate().result()) {
            this.preco = servico.preco;
        }
        if ((new NumberValidate(servico.idFuncionario)).validate().result()) {
            this.idFuncionario = servico.idFuncionario;
        }
    }
}
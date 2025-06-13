const knex = require('../database/knexSetup').db;

class PrestacaoRepo {

    static async getByIdEmpresa(idEmpresa) {
        return await knex('Agendamento')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .join('Prestacao_de_servico', 'Agendamento.id', 'Prestacao_de_servico.idAgendamento')
            .join('Funcionario', 'Prestacao_de_servico.idFuncionario', 'Funcionario.id')
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Empresa.id', idEmpresa)
            .select(
                'Agendamento.*',
                'Cliente.id as idCliente',
                'Cliente.nome as nomeCliente',
                'Cliente.email as emailCliente',
                'Cliente.cpf as cpfCliente',
                'Cliente.telefone as telefoneCliente',
                'Funcionario.nome as nomeFuncionario',
                'Servico.id as idServico',
                'Servico.nome as nomeServico',
                'Servico.preco as precoServico',
                'Servico.duracao as duracaoServico',
                'Servico.categoria as categoriaServico',
                'Empresa.nome as nomeEmpresa',
                'Empresa.id as idEmpresa',
                'Prestacao_de_servico.id as idPrestacao',
                'Prestacao_de_servico.status as statusPrestacao',
                'Prestacao_de_servico.pagamento as pagamentoPrestacao',
                'Prestacao_de_servico.inicio as inicioPrestacao',
                'Prestacao_de_servico.termino as terminoPrestacao',
            );
    }

    static async updateStatus({id, status}) {
        return await knex('Prestacao_de_servico')
            .where('id', id)
            .update({ status: status });
    }
    static async updatePagamento({id, pagamento}) {
        return await knex('Prestacao_de_servico')
           .where('id', id)
           .update({ pagamento: pagamento });
    }
    static async updateInicio({id, inicio}) {
        return await knex('Prestacao_de_servico')
           .where('id', id)
          .update({ inicio: inicio });
    }
    static async updateTermino({id, termino}) {
        return await knex('Prestacao_de_servico')
          .where('id', id)
         .update({ termino: termino });
    }
}

module.exports = PrestacaoRepo;
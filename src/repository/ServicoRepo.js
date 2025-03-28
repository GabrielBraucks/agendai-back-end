const knex = require('../database/knexSetup').db;

class ServicoRepo {
    static async register({ nome, idEmpresa, preco, duracao, categoria }) {
        await knex('Servico').insert({ nome, idEmpresa, preco, duracao, categoria });
    }

    static async deleteByIdAndIdEmpresa(id, idEmpresa) {
        return await knex('Servico').where('id', id).delete();
    }
    static async getAll() {
        return await knex('Servico')
            .join("Empresa", "idEmpresa", "=", "Empresa.id")
            .select(
                'Servico.id',
                'Servico.nome',
                'Servico.preco',
                'Servico.duracao',
                'Servico.categoria',
                'Empresa.nome as empresa');
    }

    static async updateByIdAndIdEmpresa({ id ,nome, idEmpresa, preco, duracao, categoria }) {
        return await knex('Servico')
            .where({idEmpresa, id})
            .update({
                nome,
                preco,
                duracao,
                categoria
            });
    }
    static async getOne(id) {
        return await knex('Servico')
            .join("Empresa", "idEmpresa", "=", "Empresa.id")
            .where('Servico.id', id)
            .select(
                'Servico.id',
                'Servico.nome',
                'Servico.preco',
                'Servico.duracao',
                'Servico.categoria',
                'Empresa.nome as empresa').first();
    }
}

module.exports = ServicoRepo;
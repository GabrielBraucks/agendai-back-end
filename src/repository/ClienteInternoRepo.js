const knex = require('../database/knexSetup').db;

class ClienteRepo {
    static async register({ cpf, email, nome, telefone, senha, idEmpresa }) {
        return await knex('Cliente').insert({ cpf, email, nome, telefone, senha, idEmpresa });
    }

    static async deleteById(id, idEmpresa) {
        return await knex('Cliente').where({ id, idEmpresa }).delete();
    }

    static async updateByIdAndIdEmpresa({ id, cpf, email, nome, telefone, idEmpresa }) {
        return await knex('Cliente')
            .where({ id, idEmpresa })
            .update({
                cpf,
                email,
                nome,
                telefone
            });
    }

    static async getAll() {
        return await knex('Cliente')
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo'
            );
    }

    static async getByEmpresa(idEmpresa) {
        return await knex('Cliente')
            .where({ idEmpresa })
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo'
            );
    }

    static async getByMonthAndIdEmpresa(idEmpresa, month) {
        return await knex('Agendamento')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Empresa.id', idEmpresa)
            .whereRaw(`
                Agendamento.id IN (
                    SELECT MIN(a2.id)
                    FROM Agendamento a2
                    JOIN Servico s2 ON a2.idServico = s2.id
                    WHERE s2.idEmpresa = ?
                    GROUP BY a2.idCliente
                )
            `, [idEmpresa])
            .whereRaw("strftime('%Y-%m', Agendamento.data) = ?", [month])
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo',
                'Agendamento.data as dataPrimeiroAgendamento'
            );
    }

    static async getByYearAndIdEmpresa(idEmpresa, year) {
        return await knex('Agendamento')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Empresa.id', idEmpresa)
            .whereRaw(`
                Agendamento.id IN (
                    SELECT MIN(a2.id)
                    FROM Agendamento a2
                    JOIN Servico s2 ON a2.idServico = s2.id
                    WHERE s2.idEmpresa = ?
                    GROUP BY a2.idCliente
                )
            `, [idEmpresa])
            .whereRaw("strftime('%Y', Agendamento.data) = ?", [year])
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo',
                'Agendamento.data as dataPrimeiroAgendamento'
            );
    }

    static async getByDayAndIdEmpresa(idEmpresa, day) {
        return await knex('Agendamento')
            .join('Servico', 'Agendamento.idServico', 'Servico.id')
            .join('Empresa', 'Servico.idEmpresa', 'Empresa.id')
            .join('Cliente', 'Agendamento.idCliente', 'Cliente.id')
            .where('Empresa.id', idEmpresa)
            .whereRaw(`
                Agendamento.id IN (
                    SELECT MIN(a2.id)
                    FROM Agendamento a2
                    JOIN Servico s2 ON a2.idServico = s2.id
                    WHERE s2.idEmpresa = ?
                    GROUP BY a2.idCliente
                )
            `, [idEmpresa])
            .whereRaw("strftime('%Y-%m-%d', Agendamento.data) = ?", [day])
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo',
                'Agendamento.data as dataPrimeiroAgendamento'
            );
    }

    static async getByEmpresaAndCpfOrEmail({ idEmpresa, cpf, email }) {
        return await knex('Cliente')
            .where({ idEmpresa, cpf })
            .orWhere({ idEmpresa, email })
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo'
            );
    }

    static async getByEmail(email) {
        return await knex('Cliente').where({ email }).first();
    }

    // Para fazer o GetByEmpresa será necessário trabalhar os agendamentos

    static async getOne(id, idEmpresa) {
        return await knex('Cliente')
            .where({ 'Cliente.id': id, idEmpresa })
            .select(
                'Cliente.id',
                'Cliente.cpf',
                'Cliente.email',
                'Cliente.nome',
                'Cliente.telefone',
                'Cliente.tipo'
            ).first();
    }
}

module.exports = ClienteRepo;
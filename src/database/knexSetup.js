const knex = require('knex');
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database.sqlite'
    },
    useNullAsDefault: true
});

async function createTables() {
    try {
        // Cliente table
        if (!(await db.schema.hasTable('Cliente'))) {
            await db.schema.createTable('Cliente', table => {
                table.integer('id').primary();
                table.string('cpf', 45);
                table.string('email', 45);
                table.string('nome', 45);
                table.string('telefone', 45);
                table.string('senha', 45);
            });
        }

        // Empresa table
        if (!(await db.schema.hasTable('Empresa'))) {
            await db.schema.createTable('Empresa', table => {
                table.integer('id').primary();
                table.string('cnpj', 45).unique();
                table.string('nome', 45).unique();
                table.string('email', 45).unique();
                table.string('senha', 45);
                table.string('endereco', 45);
            });
        }

        // Funcionario table
        if (!(await db.schema.hasTable('Funcionario'))) {
            await db.schema.createTable('Funcionario', table => {
                table.integer('id').primary();
                table.string('cpf', 45).unique();
                table.integer('idEmpresa').references('id').inTable('Empresa');
                table.string('nome', 45);
                table.string('email', 45);
                table.string('telefone', 45);
                table.date('data_nasc');
                table.string('cargo', 45);
                table.string('senha', 45);
            });
        }

        // Servico table
        if (!(await db.schema.hasTable('Servico'))) {
            await db.schema.createTable('Servico', table => {
                table.integer('id').primary();
                table.integer('idEmpresa').references('id').inTable('Empresa');
                table.float('preco');
                table.string('nome', 45);
                table.string('duracao', 45);
                table.string('categoria', 45);
            });
        }

        // Agenda_de_disponibilidade table
        if (!(await db.schema.hasTable('Agenda_de_disponibilidade'))) {
            await db.schema.createTable('Agenda_de_disponibilidade', table => {
                    table.increments('id').primary();
                    table.integer('idServico').references('id').inTable('Servico');
                    table.string('cpfFuncionario', 45).references('cpf').inTable('Funcionario');
                    table.integer('diaSemana').notNullable();
                    table.time('horarioInicio').notNullable();
                    table.time('horarioFim').notNullable();
            });
        }

        // Agendamento table
        if (!(await db.schema.hasTable('Agendamento'))) {
            await db.schema.createTable('Agendamento', table => {
                table.integer('id').primary();
                table.integer('idCliente').references('id').inTable('Cliente');
                table.integer('idServico').references('id').inTable('Servico');
                table.date('data');
                table.time('horario');
            });
        }

        // Prestacao_de_servico table
        if (!(await db.schema.hasTable('Prestacao_de_servico'))) {
            await db.schema.createTable('Prestacao_de_servico', table => {
                table.integer('id').primary();
                table.integer('idAgendamento').references('id').inTable('Agendamento');
                table.string('cpfFuncionario', 45).references('cpf').inTable('Funcionario');
                table.integer('status');
                table.timestamp('inicio');
                table.timestamp('termino');
            });
        }

        // Avaliacao table
        if (!(await db.schema.hasTable('Avaliacao'))) {
            await db.schema.createTable('Avaliacao', table => {
                table.integer('id').primary();
                table.integer('idPrestacaoServico').references('id').inTable('Prestacao_de_servico');
                table.json('questoes');
                table.json('valores');
                table.string('comentario', 45);
            });
        }

        console.log('Tabelas verificadas/criadas com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
    }
}

module.exports = { db, createTables };

// createTables();
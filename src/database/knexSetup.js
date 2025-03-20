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
        await db.schema.createTable('Cliente', table => {
            table.integer('id').primary();
            table.string('cpf', 45);
            table.string('email', 45);
            table.string('nome', 45);
            table.string('telefone', 45);
            table.string('senha', 45);
        });

        await db.schema.createTable('Empresa', table => {
            table.integer('id').primary();
            table.string('cnpj', 45).unique();
            table.string('nome', 45).unique();
            table.string('email', 45).unique();
            table.string('senha', 45);
            table.string('endereco', 45);
        });

        await db.schema.createTable('Funcionario', table => {
            table.integer('id').primary();
            table.string('cpf', 45).unique();
            table.string('empresa', 45).references('cnpj').inTable('Empresa');
            table.string('nome', 45);
            table.string('email', 45);
            table.string('telefone', 45);
            table.timestamp('data_nasc');
            table.string('cargo', 45);
            table.string('senha', 45);
        });

        await db.schema.createTable('Servico', table => {
            table.integer('id').primary();
            table.string('empresa', 45).references('cnpj').inTable('Empresa');
            table.float('preco');
            table.string('nome', 45);
            table.string('duracao', 45);
            table.string('categoria', 45);
        });

        await db.schema.createTable('Agenda_de_disponibilidade', table => {
            table.timestamp('diasDisponives');
            table.integer('idServico').references('id').inTable('Servico');
            table.string('cpfFuncionario', 45).references('cpf').inTable('Funcionario');
            table.timestamp('horariosDisponiveis');
            table.primary(['diasDisponives', 'idServico', 'cpfFuncionario']);
        });

        await db.schema.createTable('Agendamento', table => {
            table.integer('id').primary();
            table.integer('idCliente').references('idCliente').inTable('Cliente');
            table.integer('idServico').references('idServico').inTable('Servico');
            table.date('data');
            table.time('horario');
        });

        await db.schema.createTable('Prestacao_de_servico', table => {
            table.integer('id').primary();
            table.integer('idAgendamento').references('id').inTable('Agendamento');
            table.string('cpfFuncionario', 45).references('cpf').inTable('Funcionario');
            table.integer('status');
            table.timestamp('inicio');
            table.timestamp('termino');
        });

        await db.schema.createTable('Avaliacao', table => {
            table.integer('id').primary();
            table.integer('idPrestacaoServico').references('id').inTable('Prestacao_de_servico');
            table.json('questoes');
            table.json('valores');
            table.string('comentario', 45);
        });

        console.log('Tabelas criadas com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
    } finally {
        db.destroy();
    }
}

module.exports = { db, createTables };

// createTables();
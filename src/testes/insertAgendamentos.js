const knex = require('../database/knexSetup').db;

let agendamentos = [];
let id = 1;

const meses = [
    { mes: 0, dias: [5, 8, 10, 12, 15, 16, 18, 20, 22, 24, 26, 27, 28, 29, 30] }, // Janeiro
    { mes: 1, dias: [1, 2, 3, 5, 7, 9, 10, 13, 15, 18, 20, 22, 24, 26, 28] },     // Fevereiro
    { mes: 2, dias: [1, 2, 3, 5, 6, 8, 9, 12, 14, 16, 18, 20, 23, 25, 27] }       // Março
];

meses.forEach(({ mes, dias }) => {
    dias.forEach((dia, i) => {
        const clienteId = ((id - 1) % 15) + 1;
        agendamentos.push({
            idCliente: clienteId,
            idServico: clienteId <= 8 ? 1 : 2,
            data: `2025-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`,
            horario: '10:00'
        });
        id++;
    });
});

module.exports = async () => {
    await knex('Agendamento').insert(agendamentos);
}

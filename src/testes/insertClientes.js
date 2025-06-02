const knex = require('../database/knexSetup').db;

const cpfsValidos = [
    '39053344705', '40364478820', '58197078004', '24843875060',
    '30679118000', '57462863042', '13444410003', '24888295050',
    '04198775009', '81847979034', '07130318080', '13275684011',
    '17439581070', '40950318027', '91290434037'
];

const clientes = cpfsValidos.map((cpf, i) => ({
    cpf,
    email: `cliente${i + 1}@email.com`,
    nome: `Cliente ${i + 1}`,
    telefone: `1199999000${i + 1}`,
    idEmpresa: i < 8 ? 1 : 2,
    senha: '',
    tipo: 0,
}));

module.exports = async () => {
    await knex('Cliente').insert(clientes);
}
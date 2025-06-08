async function inserts() {
    await require('./insertEmpresas')();
    await require('./insertServicos')();
    await require('./insertClientes')();
    await require('./insertAgendamentos')();
    await require('./insertFuncionarios')();
    await require('./insertPrestacoes')();
    return;
}

inserts();
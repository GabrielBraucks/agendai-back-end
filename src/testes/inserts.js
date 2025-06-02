async function inserts() {
    await require('./insertEmpresas')();
    await require('./insertServicos')();
    await require('./insertClientes')();
    await require('./insertAgendamentos')();
    return;
}

inserts();
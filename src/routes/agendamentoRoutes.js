const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const { registerAgendamento, registerAgendamentoAndCliente, deleteAgendamentoById, getOneAgendamento, listAgendamentos } = require('../controllers/agendamentoController');

routes.post('/register', authJwt, registerAgendamento);
routes.post('/registerCliente', authJwt, registerAgendamentoAndCliente);
routes.delete('/:id', authJwt, deleteAgendamentoById);
routes.get('/listarPelaEmpresa/:idEmpresa', listAgendamentos);
routes.get('/consultar/:id', getOneAgendamento);

module.exports = routes;
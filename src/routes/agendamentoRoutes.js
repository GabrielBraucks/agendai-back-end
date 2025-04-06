const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const { registerAgendamento, registerAgendamentoAndCliente } = require('../controllers/agendamentoController');

routes.post('/register', authJwt, registerAgendamento);
routes.post('/registerCliente', authJwt, registerAgendamentoAndCliente);

module.exports = routes;
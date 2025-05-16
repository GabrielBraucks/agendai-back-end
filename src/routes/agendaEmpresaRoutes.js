const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const controller = require('../controllers/agendaEmpresaController');
routes.post('/', authJwt, controller.registerAgendaEmpresa);
routes.get('/', authJwt, controller.listAgendaEmpresa);
// routes.put('/:id', authJwt, controller.updateAgendaDisponibilidade);
// routes.delete('/:id', authJwt, controller.deleteFuncionario);
// routes.put('/:id', authJwt, controller.updateFuncionario);
// routes.get('/:id', authJwt, controller.getOneFuncionario);

module.exports = routes;
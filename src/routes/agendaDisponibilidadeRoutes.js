const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const controller = require('../controllers/agendaDisponibilidadeController');
routes.post('/', authJwt, controller.registerAgendaDisponibilidade);
// routes.get('/', authJwt, controller.listFuncionarios);
// routes.put('/:id/senha', authJwt, controller.updatePasswordFuncionario);
// routes.delete('/:id', authJwt, controller.deleteFuncionario);
// routes.put('/:id', authJwt, controller.updateFuncionario);
// routes.get('/:id', authJwt, controller.getOneFuncionario);

module.exports = routes;
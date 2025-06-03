const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const dashboardAgendamentoController = require('../controllers/dashboardAgendamentoController');
const dashboardClienteController = require('../controllers/dashboardClienteController');
const dashboardPrestacaoDeServicoController = require('../controllers/dashboardPrestacaoDeServicoController');

routes.get('/agendamentosByMonth', authJwt, dashboardAgendamentoController.getByMonthAndIdEmpresa);
routes.get('/agendamentosByYear', authJwt, dashboardAgendamentoController.getByYearAndIdEmpresa);
routes.get('/agendamentos', authJwt, dashboardAgendamentoController.getByIdEmpresa);

routes.get('/clientesByDay', authJwt, dashboardClienteController.getByDayAndIdEmpresa);
routes.get('/clientesByMonth', authJwt, dashboardClienteController.getByMonthAndIdEmpresa);
routes.get('/clientesByYear', authJwt, dashboardClienteController.getByYearAndIdEmpresa);
routes.get('/clientes', authJwt, dashboardClienteController.getByIdEmpresa);

routes.get('/prestacoesDeServicos', authJwt, dashboardPrestacaoDeServicoController.getByIdEmpresa);
routes.get('/prestacoesDeServicosByDay', authJwt, dashboardPrestacaoDeServicoController.getByDayAndIdEmpresa);
routes.get('/prestacoesDeServicosByMonth', authJwt, dashboardPrestacaoDeServicoController.getByMonthAndIdEmpresa);
routes.get('/prestacoesDeServicosByYear', authJwt, dashboardPrestacaoDeServicoController.getByYearAndIdEmpresa);

module.exports = routes;
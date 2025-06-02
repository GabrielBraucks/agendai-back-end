const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const { getByMonthAndIdEmpresa, getByYearAndIdEmpresa } = require('../controllers/dashboardController');

routes.get('/agendamentosByMonth', authJwt, getByMonthAndIdEmpresa);
routes.get('/agendamentosByYear', authJwt, getByYearAndIdEmpresa);

module.exports = routes;
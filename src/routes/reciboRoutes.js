const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const controller = require('../controllers/reciboController');
routes.get('/', authJwt, controller.listRecibos);
routes.patch('/:id', authJwt, controller.updateRecibo);
// routes.get('/listarPelaEmpresa/:idEmpresa', authJwt, listServico);
// routes.delete('/:id', authJwt, deleteServico);
// routes.put('/:id', authJwt, updateServico);
// routes.get('/consultar/:id', authJwt, getOneServico);

module.exports = routes;
const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const { registerServico, deleteServico, listServico, updateServico, getOneServico, listServicoEmpresa } = require('../controllers/servicoController');
routes.post('/register', authJwt, registerServico);
routes.get('/listarPelaEmpresa/:idEmpresa', authJwt, listServico);
routes.get('/', authJwt, listServicoEmpresa);
routes.delete('/:id', authJwt, deleteServico);
routes.put('/:id', authJwt, updateServico);
routes.get('/consultar/:id', authJwt, getOneServico);

module.exports = routes;
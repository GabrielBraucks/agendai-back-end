const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const controller = require('../controllers/funcionarioController');
routes.post('/register', authJwt, controller.registerFuncionario);
routes.get('/listarPelaEmpresa/:idEmpresa', authJwt, controller.listFuncionarios);
routes.get('/', authJwt, controller.listFuncionariosEmpresa);
routes.put('/:id', authJwt, controller.updateFuncionario);
routes.put('/:id/senha', authJwt, controller.updatePasswordFuncionario);
routes.delete('/:id', authJwt, controller.deleteFuncionario);
routes.get('/consultar/:id', authJwt, controller.getOneFuncionario);

module.exports = routes;
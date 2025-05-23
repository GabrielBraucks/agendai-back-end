const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const controller = require('../controllers/clienteController');

routes.post('/register', controller.registerCliente);
routes.post('/login', controller.loginCliente);
routes.delete('/:id', authJwt, controller.deleteCliente);
routes.get('/consultar/:id', authJwt, controller.getOneCliente);
routes.get('/consultar_por_email', authJwt, controller.getByEmail);

module.exports = routes;
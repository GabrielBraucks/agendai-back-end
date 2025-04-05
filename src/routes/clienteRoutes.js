const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const controller = require('../controllers/clienteController');

routes.post('/register', controller.registerCliente);
routes.post('/login', controller.loginCliente);
routes.delete('/:id', authJwt, controller.deleteCliente);
routes.get('/:id', authJwt, controller.getOneCliente);

module.exports = routes;
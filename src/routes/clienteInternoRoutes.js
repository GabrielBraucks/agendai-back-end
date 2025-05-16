const express = require('express');
const { authJwt } = require('../utils/jwt');
const controller = require('../controllers/clienteInternoController');
// const controller2 = require('../controllers/clienteController');

const routes = express.Router();

routes.post('/register', authJwt, controller.registerClienteInterno);
routes.put('/:id', authJwt, controller.updateClienteInterno);
routes.delete('/:id', authJwt, controller.deleteClienteInterno);
routes.get('/', authJwt, controller.getAllClienteInterno);
routes.get('/:id', authJwt, controller.getOneClienteInterno);
// routes.get('/consultar_por_email', authJwt, controller2.getByEmail);

module.exports = routes;
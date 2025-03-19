const express = require('express');
const routes = express.Router();
const { cadastrarEmpresa, loginEmpresa } = require('../controllers/empresaController');

routes.post('/cadastrar', cadastrarEmpresa);
routes.post('/login', loginEmpresa);

module.exports = routes;
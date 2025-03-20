const express = require('express');
const routes = express.Router();
const { registerEmpresa, loginEmpresa } = require('../controllers/empresaController');

routes.post('/register', registerEmpresa);
routes.post('/login', loginEmpresa);

module.exports = routes;
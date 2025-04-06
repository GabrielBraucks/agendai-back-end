const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const { registerEmpresa, loginEmpresa, profileEmpresa } = require('../controllers/empresaController');

routes.post('/register', registerEmpresa);
routes.post('/login', loginEmpresa);
routes.get('/profile', authJwt, profileEmpresa);

// routes.get('/', authJwt, (req, res) => { res.json({ mensagem: `Empresa: ${req.user.nome} autenticada` }) });

module.exports = routes;
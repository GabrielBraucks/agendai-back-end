const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const { registerServico, deleteServico, listServico, updateServico, getOneServico } = require('../controllers/servicoController');
routes.get('/:idEmpresa', authJwt, listServico);
routes.post('/register', authJwt, registerServico);
routes.delete('/:id', authJwt, deleteServico);
routes.put('/:id', authJwt, updateServico);
routes.get('/consultar/:id', authJwt, getOneServico);

module.exports = routes;
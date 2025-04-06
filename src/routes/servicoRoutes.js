const express = require('express');
const { authJwt } = require('../utils/jwt');

const routes = express.Router();
const { registerServico, deleteServico, listServico, updateServico, getOneServico } = require('../controllers/servicoController');
routes.post('/register', authJwt, registerServico);
routes.get('/:idEmpresa', authJwt, listServico);
routes.delete('/:id', authJwt, deleteServico);
routes.put('/:id', authJwt, updateServico);
routes.get('/:id', authJwt, getOneServico);

module.exports = routes;
import { Router } from 'express';
import { authJwt } from '../utils/jwt.js';
import { deleteFuncionario, getOneFuncionario, listFuncionarios, registerFuncionario, updateFuncionario, updatePasswordFuncionario } from '../controllers/funcionarioController.js';

const routes = Router();
routes.post('/register', authJwt, registerFuncionario);
routes.get('/listarPelaEmpresa/:idEmpresa', authJwt, listFuncionarios);
routes.put('/:id', authJwt, updateFuncionario);
routes.put('/:id/senha', authJwt, updatePasswordFuncionario);
routes.delete('/:id', authJwt, deleteFuncionario);
routes.get('/consultar/:id', authJwt, getOneFuncionario);

export default routes;
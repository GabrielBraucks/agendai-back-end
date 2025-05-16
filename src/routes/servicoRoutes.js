import { Router } from 'express';
import { authJwt } from '../utils/jwt.js';
import { deleteServico, getOneServico, listServico, registerServico, updateServico } from '../controllers/servicoController.js';
const routes = Router();
routes.post('/register', authJwt, registerServico);
routes.get('/listarPelaEmpresa/:idEmpresa', authJwt, listServico);
routes.delete('/:id', authJwt, deleteServico);
routes.put('/:id', authJwt, updateServico);
routes.get('/consultar/:id', authJwt, getOneServico);

export default routes;
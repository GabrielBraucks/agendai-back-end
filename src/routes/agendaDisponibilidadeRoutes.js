import { Router } from 'express';
import { authJwt } from '../utils/jwt.js';

const routes = Router();
routes.post('/', authJwt, controller.registerAgendaDisponibilidade);
// routes.get('/', authJwt, controller.listFuncionarios);
// routes.put('/:id/senha', authJwt, controller.updatePasswordFuncionario);
// routes.delete('/:id', authJwt, controller.deleteFuncionario);
// routes.put('/:id', authJwt, controller.updateFuncionario);
// routes.get('/:id', authJwt, controller.getOneFuncionario);

export default routes;
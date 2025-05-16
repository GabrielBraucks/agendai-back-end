import { Router } from 'express';
import { authJwt } from '../utils/jwt.js';
import { registerAgendamento } from '../controllers/agendamentoController.js';

const routes = Router();

routes.post('/register', authJwt, registerAgendamento);
// routes.post('/registerCliente', authJwt, registerAgendamentoAndCliente);
// routes.delete('/:id', authJwt, deleteAgendamentoById);
// routes.get('/listarPelaEmpresa/:idEmpresa', listAgendamentos);
// routes.get('/consultar/:id', getOneAgendamento);

export default routes;
import { Router } from 'express';
import { authJwt } from '../utils/jwt.js';
import { registerCliente, loginCliente, deleteCliente, getOneCliente, registerClienteInterno, listClienteInterno, updateClienteInterno, deleteClienteInterno } from '../controllers/clienteController.js';

const routes = Router();

routes.post('/register', registerCliente);
routes.post('/register/interno',authJwt, registerClienteInterno);
routes.post('/login', loginCliente);
routes.delete('/:id', authJwt, deleteCliente);
routes.get('/consultar/:id', authJwt, getOneCliente);
routes.get('/interno', authJwt, listClienteInterno);
routes.put('/interno/:id', authJwt, updateClienteInterno);
routes.delete('/interno/:id', authJwt, deleteClienteInterno);

export default routes;
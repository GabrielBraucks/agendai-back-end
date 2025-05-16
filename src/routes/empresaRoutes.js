import { Router } from 'express';
import { authJwt } from '../utils/jwt.js';
import { loginEmpresa, profileEmpresa, registerEmpresa,registerAutoEmpresa } from '../controllers/empresaController.js';

const routes = Router();

routes.post('/register', registerEmpresa);
routes.post('/register/auto', registerAutoEmpresa);
routes.post('/login', loginEmpresa);
routes.get('/profile', authJwt, profileEmpresa);

// routes.get('/', authJwt, (req, res) => { res.json({ mensagem: `Empresa: ${req.user.nome} autenticada` }) });

export default routes;
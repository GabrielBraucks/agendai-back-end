import { Router } from "express";
import { authView } from "../utils/jwt.js";

const routes = Router();
routes.get('/', async (req, res) => {
    res.render('home', { title: 'Página Inicial', message: 'Bem-vindo ao sistema!' });
});
routes.get('/empresa/login', async (req, res) => {
    res.render('empresa/login', { title: 'Página Inicial', message: 'Bem-vindo ao sistema!' });
});
routes.get('/empresa/register', async (req, res) => {
    res.render('empresa/register', { title: 'Página Inicial', message: 'Bem-vindo ao sistema!' });
});
routes.get('/empresa/funcionarios',authView, async (req, res) => {
    res.render('empresa/funcionarios', { title: 'Página Inicial', message: 'Bem-vindo ao sistema!' });
});
routes.get('/empresa/servicos',authView, async (req, res) => {
    res.render('empresa/servicos', { title: 'Página Inicial', message: 'Bem-vindo ao sistema!' });
});
routes.get('/empresa/clientes',authView, async (req, res) => {
    res.render('empresa/clientes', { title: 'Página Inicial', message: 'Bem-vindo ao sistema!' });
});
routes.get('/empresa/agendamento',authView, async (req, res) => {
    res.render('empresa/agendamento', { title: 'Página Inicial', message: 'Bem-vindo ao sistema!' });
});
routes.get('/empresa',authView, async (req, res) => {
    res.render('empresa/index', { title: 'Página Inicial', message: 'Bem-vindo ao sistema!' });
});

export default routes;
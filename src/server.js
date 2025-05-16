import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Edge } from 'edge.js'
import dotenv from 'dotenv';

import empresaRoutes from './routes/empresaRoutes.js';
import viewsRoutes from './routes/viewRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import funcionarioRoutes from './routes/funcionarioRoutes.js';
import servicoRoutes from './routes/servicoRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';
// import agendaDisponibilidadeRoutes from './routes/agendaDisponibilidadeRoutes.js';
import { createTables } from './database/knexSetup.js';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const edge = new Edge();

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads',express.static(path.join(__dirname, '../uploads')));
edge.mount(path.join(__dirname, 'views'));
app.use((req, res, next) => {
    res.render = async function (view, data = {}) {
        const html = await edge.render(view, data);
        res.send(html);
    };
    next();
});

// MIDDLEWARE
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
app.use(cookieParser());
// ROTAS
app.use('/api/empresa', empresaRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/cliente', clienteRoutes);
// app.use('/api/agenda_disponibilidade', agendaDisponibilidadeRoutes);
app.use('/api/agendamentos', agendamentoRoutes);
// app.use('/api/agendamentos', agendamentoRoutes);
app.use('/', viewsRoutes);


// Middleware global para erros inesperados
app.use((err, req, res, next) => {
    console.log('---------ERRO---------');

    console.error(err.stack);

    console.log('----------------------');
    res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, () => {
    createTables();
    console.log(`http://${HOST}:${PORT}`);
});
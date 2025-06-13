require('dotenv').config;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const empresaRoutes = require('./routes/empresaRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const agendaDisponibilidadeRoutes = require('./routes/agendaDisponibilidadeRoutes');
const reciboRoutes = require('./routes/reciboRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const agendaEmpresaRoutes = require('./routes/agendaEmpresaRoutes');
const clienteInternoRoutes = require('./routes/clienteInternoRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const conexaoRoutes = require('./routes/conexaoRoutes');

const passport = require('./config/passport');

const { createTables } = require('./database/knexSetup');
const app = express();
app.use(session({
    secret: 'sua_chave_secreta_segura', // Troque por uma chave forte
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 15 * 60 * 1000 } // 15 minutos, por exemplo
}));
// MIDDLEWARE
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
app.use(passport.initialize());

// ROTAS
app.use('/empresa', empresaRoutes);
app.use('/servicos', servicoRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/agenda_disponibilidade', agendaDisponibilidadeRoutes);
app.use('/cliente', clienteRoutes);
app.use('/cliente_interno', clienteInternoRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/recibos', reciboRoutes);
app.use('/agenda_empresa', agendaEmpresaRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/conexao', conexaoRoutes);

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
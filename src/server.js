require('dotenv').config;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const empresaRoutes = require('./routes/empresaRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const { createTables } = require('./database/knexSetup');
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

// ROTAS
app.use('/empresa', empresaRoutes);
app.use('/servicos', servicoRoutes);
app.use('/funcionarios', funcionarioRoutes);

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
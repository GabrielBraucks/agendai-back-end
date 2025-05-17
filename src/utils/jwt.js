require('dotenv').config;
const jwt = require('jsonwebtoken');

const jwtSecret = `${process.env.JWT_SECRET}`;

function generateToken({ id, cnpj, nome, role }) {
    return jwt.sign({ id: parseInt(id), cnpj, nome, role }, jwtSecret, { expiresIn: '4h' });
}

function authJwt(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Pega o token do cabeçalho

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token ausente.' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado.' });
        }
        
        // console.log(decoded);
        req.user = decoded; // Adiciona o usuário no request
        next();
    });
}

module.exports = { generateToken, authJwt };
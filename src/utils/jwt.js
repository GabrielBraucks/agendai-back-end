import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config();
const jwtSecret = `${process.env.JWT_SECRET}`;

export function generateToken({ id, cnpj, nome, role }) {
    return jwt.sign({ id: parseInt(id), cnpj, nome, role }, jwtSecret, { expiresIn: '4h' });
}

export function authJwt(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Pega o token do cabeçalho

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token ausente.' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado.' });
        }
        
        // console.log(decoded);
        req.user = decoded;
        next();
    });
}

export function authView(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/');
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado.' });
        }
        
        // console.log(decoded);
        req.user = decoded;
        next();
    });
}
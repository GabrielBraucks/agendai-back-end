const express = require('express');
const { authJwt } = require('../utils/jwt');
const passport = require('../config/passport');
const { register } = require('../repository/GoogleRepo');
const GoogleRepo = require('../repository/GoogleRepo');

const routes = express.Router();
routes.get('/auth/google/redirect',
    passport.authenticate('google', {
        session: false,
        accessType: 'offline',
        prompt: 'consent',
        scope: ['profile', 'email', 'openid', "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/gmail.send"]
    })
);

routes.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const empresaId = req.session.empresaId;
        const token = req.session.token;

        if (!empresaId || !token) {
            return res.status(400).send("❌ Sessão inválida ou expirada");
        }

        console.log("🏢 Empresa ID:", empresaId);
        console.log("🔑 Token:", token);
        console.log("👤 Usuário autenticado:", req.user);
        GoogleRepo.register({
            idEmpresa: empresaId,
            profile: req.user.profile,
            accessToken: req.user.accessToken,
            refreshToken: req.user.refreshToken
        })
        console.log(req.session);
        // Limpa sessão se quiser
        req.session.destroy();

        res.redirect(`http://localhost:50396/#/connections?empresaId=${empresaId}&token=${encodeURIComponent(token)}`);
    }
);

routes.get('/google', (req, res) => {
    const { empresaId, token } = req.query;

    if (!empresaId || !token) {
        return res.status(400).send("Faltando empresaId ou token");
    }

    req.session.empresaId = empresaId;
    req.session.token = token;

    console.log("📦 Sessão salva:", req.session);

    // Redireciona para o Google OAuth
    res.redirect('/conexao/auth/google/redirect');
});

module.exports = routes;
const bcrypt = require('bcrypt');

const saltRounds = process.env.BCRYPT_SALT_ROUNDS;

async function hashSenha(senha) {
    return await bcrypt.hash(senha, saltRounds);
}

async function compararSenha(senha, hash) {
    return await bcrypt.compare(senha, hash);
}

module.exports = { hashSenha, compararSenha };
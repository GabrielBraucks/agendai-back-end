import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
dotenv.config();

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

export async function hashSenha(senha) {
    return await bcrypt.hash(senha, saltRounds);
}

export async function compararSenha(senha, hash) {
    return await bcrypt.compare(senha, hash);
}
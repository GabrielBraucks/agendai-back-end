const knex = require('../database/knexSetup').db;

class GoogleRepo {
    static async register({ idEmpresa, profile, accessToken, refreshToken }) {
        await knex('GoogleUser').insert({ idEmpresa, profile, accessToken, refreshToken });
    }
    static async getByEmpresaId(idEmpresa) {
        const googleUser = await knex('GoogleUser').where({ idEmpresa }).first();
        return googleUser;
    }
}

module.exports = GoogleRepo;
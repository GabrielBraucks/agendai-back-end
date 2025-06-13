const { hashSenha, compararSenha } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

const PrestacaoRepo = require('../repository/PrestacaoRepo');
async function list(idEmpresa) {
    const recibos = await PrestacaoRepo.getByIdEmpresa(idEmpresa);
    return recibos;
}

async function update(id, data) {
    if (data.pagamento) {
        const resultPagamento = await updatePagamento(id, data);
    }
    if (data.inicio) {
        const resultInicio = await updateInicio(id, data);
    }
    if (data.termino) {
        const resultTermino = await updateTermino(id, data);
    }
    if (data.status) {
        const resultStatus = await updateStatus(id, data);
    }
}

module.exports = { list, update };
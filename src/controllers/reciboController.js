const ReciboService = require('../service/reciboService');


async function listRecibos(req, res) {
    try {
        const result = await ReciboService.list(Number(req.user.id));
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao listar funcionários.' });
        }
    }
}

async function updateRecibo(req, res) {
    try {
        const result = await ReciboService.update(Number(req.params.id), req.body);
        res.status(200).json({ message: 'Recibo atualizado com sucesso.', result});
    } catch (error) {
        console.error(error);
        if (error.type === 'ValidationError') {
            res.status(500).json({ error: 'Erro de validação', details: error.message });
        } else {
            res.status(500).json({ error: 'Erro ao listar funcionários.' });
        }
    }
}

module.exports = {
    listRecibos,
    updateRecibo
};
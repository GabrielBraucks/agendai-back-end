function ResponseError(res, error) {
    console.error(error);
    if (error.type === 'ValidationError') {
        res.status(500).json({ error: 'Erro de validação', details: error.message });
    } else if (error.type === 'ConflictError') {
        res.status(409).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {ResponseError};
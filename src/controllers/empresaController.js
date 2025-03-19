const empresaService = require('../service/empresaService');

async function cadastrarEmpresa(req, res) {
  try {
    await empresaService.register(req.body);

    res.status(201).json({ message: 'Empresa criada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar empresa' });
  }
}

async function loginEmpresa(req, res) {
  try {
    const [ result, err ] = await empresaService.login(req.body);

    if (err) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

module.exports = { cadastrarEmpresa, loginEmpresa };
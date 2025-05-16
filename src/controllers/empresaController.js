import * as empresaService from '../service/empresaService.js';
import * as funcionarioService from '../service/funcionarioService.js';

export async function registerEmpresa(req, res) {
  try {
    await empresaService.register(req.body);

    res.status(201).json({ message: 'Empresa criada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar empresa' });
  }
}
export async function registerAutoEmpresa(req, res) {
  try {
    const empresa = await empresaService.register(req.body);
    req.body.idEmpresa=empresa[0]
    req.body.cargo="Proprietario"
    const funcionario = await funcionarioService.register(req.body)

    res.status(201).json({ message: 'Empresa criada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar empresa' });
  }
}

export async function loginEmpresa(req, res) {
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

export async function profileEmpresa(req, res) {
  try {
    const [ result, err ] = await empresaService.profile(req.user.id);

    if (err) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao consultar conta' });
  }
}
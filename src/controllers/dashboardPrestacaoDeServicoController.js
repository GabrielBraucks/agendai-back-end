const DashboardDTO = require('../dto/dashboardDTO');
const dashboardService = require('../service/dashboardPrestacaoDeServicoService');

async function getByIdEmpresa(req, res) {
    try {
        if (req.user.role != 'Empresa') return res.status(500).json({ error: 'O usuário logado precisa ser do tipo Empresa' });

        const idEmpresa = req.user.id;

        const [result, err] = await dashboardService.getByIdEmpresa(idEmpresa);

        if (err) return res.status(500).json(err);

        totalValor = 0;
        result.forEach(obj => totalValor += obj.precoServico);

        return res.status(201).json({ quantidede: result.length, receitaTotal: totalValor, agendamentos: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao consultar Agendamentos' });
    }
}

async function getByDayAndIdEmpresa(req, res) {
    try {
        if (req.user.role != 'Empresa') return res.status(500).json({ error: 'O usuário logado precisa ser do tipo Empresa' });

        const dto = new DashboardDTO(req.body);
        const idEmpresa = req.user.id;

        const [result, err] = await dashboardService.getByDayAndIdEmpresa(idEmpresa, dto.data);

        if (err) return res.status(500).json(err);

        totalValor = 0;
        result.forEach(obj => totalValor += obj.precoServico);

        return res.status(201).json({ quantidede: result.length, receitaTotal: totalValor, agendamentos: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao consultar Agendamentos' });
    }
}

async function getByMonthAndIdEmpresa(req, res) {
    try {
        if (req.user.role != 'Empresa') return res.status(500).json({ error: 'O usuário logado precisa ser do tipo Empresa' });

        const dto = new DashboardDTO(req.body);
        const idEmpresa = req.user.id;

        const [result, err] = await dashboardService.getByMonthAndIdEmpresa(idEmpresa, dto.data);

        if (err) return res.status(500).json(err);

        totalValor = 0;
        result.forEach(obj => totalValor += obj.precoServico);

        return res.status(201).json({ quantidede: result.length, receitaTotal: totalValor, agendamentos: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao consultar Agendamentos' });
    }
}

async function getByYearAndIdEmpresa(req, res) {
    try {
        if (req.user.role != 'Empresa') return res.status(500).json({ error: 'O usuário logado precisa ser do tipo Empresa' });

        const dto = new DashboardDTO(req.body);
        const idEmpresa = req.user.id;

        const [result, err] = await dashboardService.getByYearAndIdEmpresa(idEmpresa, dto.data);

        if (err) return res.status(500).json(err);

        totalValor = 0;
        result.forEach(obj => totalValor += obj.precoServico);

        return res.status(201).json({ quantidede: result.length, receitaTotal: totalValor, agendamentos: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao consultar Agendamentos' });
    }
}

module.exports = {
    getByIdEmpresa,
    getByDayAndIdEmpresa,
    getByMonthAndIdEmpresa,
    getByYearAndIdEmpresa
}
const connection = require('../database/connection');
const logger = require('../config/logger');

module.exports = {
  async create(req, res) {
    logger.debug('Iniciando criação de novo grupo de serviço');
    const { nome, sigla, descricao, ativo } = req.body;
    try {
      const response = await connection('grupos_servicos').insert({ nome, sigla, descricao, ativo }).returning('*');
      return res.json(response[0]);
    } catch (error) {
      logger.error(`Erro ao criar novo grupo de serviço: ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    logger.debug(`Iniciando atualização de grupo de serviço de id ${id}`);
    try {
      const result = await connection('grupos_servicos').where('id', id).select('*').first();
      if (result) {
        const { nome, sigla, descricao, ativo } = req.body;
        let data = {};
        if (nome && result.nome !== nome) {
          data.nome = nome;
        }
        if (sigla && result.sigla !== sigla) {
          data.sigla = sigla;
        }
        if (descricao && result.descricao !== descricao) {
          data.descricao = descricao;
        }
        if (ativo != undefined && result.ativo !== ativo) {
          data.ativo = ativo;
        }
        const response = await connection('grupos_servicos').where('id', id).update(data).returning('*');
        return res.json(response[0]);
      }
    } catch (error) {
      logger.error(`Erro ao atualizar grupo de serviço de id: ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    logger.debug(`Iniciando exclusão de grupo de serviço de id ${id}`);
    try {
      await connection('grupos_servicos').where('id', id).delete();
      return res.status(204).send();
    } catch (error) {
      if (error.detail) {
        logger.error(`Erro ao excluir serviço de id ${id}. ${error.detail}`);
        return res.status(400).json({ message: error.detail });
      }
      logger.error(`Erro ao excluir grupo de serviço de id ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async findById(req, res) {
    const { id } = req.params;
    logger.debug(`Pesquisando grupo de serviço pelo id ${id}`);
    try {
      const result = await connection('grupos_servicos').where('id', id).select('*').first();
      return res.json(result);
    } catch (error) {
      logger.error(`Erro ao pesquisar grupo de serviço de id ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async findAll(req, res) {
    const { page = 1, size = 5 } = req.query;
    logger.debug('Iniciando pesquisa paginada de grupos de serviços');
    try {
      const { nome, sigla, descricao, ativo } = req.body;
      const { whereRaw, args } = getClauseWhere(nome, sigla, descricao, ativo);
      const responseCount = await connection('grupos_servicos').whereRaw(whereRaw, args).count('id');
      const gruposServicos = await connection('grupos_servicos')
        .whereRaw(whereRaw, args)
        .select('*')
        .offset((page - 1) * size)
        .limit(size);
      res.header('X-Total-Count', responseCount[0].count);
      res.header('X-Page-Number', page);
      res.header('X-Page-Size', size);
      return res.json(gruposServicos);
    } catch (error) {
      logger.error(`Erro ao realizar pesquisa paginada de grupos de serviços. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  }
};

function getClauseWhere(nome, sigla, descricao, ativo) {
  let whereRaw = '';
  let args = [];
  let isClause = false;
  if (nome) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"nome" ilike ?');
    args[args.length] = '%' + nome.trim() + '%';
    isClause = true;
  }
  if (sigla) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"sigla" ilike ?');
    args[args.length] = '%' + sigla.trim() + '%';
    isClause = true;
  }
  if (descricao) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"descricao" ilike ?');
    args[args.length] = '%' + descricao.trim() + '%';
    isClause = true;
  }
  if (ativo != undefined) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('ativo = ?');
    args[args.length] = ativo;
    isClause = true;
  }
  return { whereRaw, args };
}

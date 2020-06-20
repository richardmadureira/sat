const connection = require('../database/connection');
const logger = require('../config/logger');

module.exports = {
  async create(req, res) {
    logger.debug('Iniciando criação de nova estação');
    const { tipoEstacao, numero } = req.body;
    try {
      const response = await connection('estacoes').insert({ tipoEstacao, numero }).returning('*');
      return res.json(response[0]);
    } catch (error) {
      logger.error(`Erro ao criar nova estação: ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    logger.debug(`Iniciando atualização de estação de id ${id}`);
    try {
      const result = await connection('estacoes').where('id', id).select('*').first();
      if (result) {
        const { tipoEstacao, numero } = req.body;
        const data = {};
        if (tipoEstacao && result.tipoEstacao !== tipoEstacao) {
          data.tipoEstacao = tipoEstacao;
        }
        if (numero && result.numero !== numero) {
          data.numero = numero;
        }
        const response = await connection('estacoes').where('id', id).update(data).returning('*');
        return res.json(response[0]);
      }
    } catch (error) {
      logger.error(`Erro ao atualizar estação de id: ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    logger.debug(`Iniciando exclusão de estação de id ${id}`);
    try {
      await connection('estacoes').where('id', id).delete();
      return res.status(204).send();
    } catch (error) {
      if (error.detail) {
        logger.error(`Erro ao excluir serviço de id ${id}. ${error.detail}`);
        return res.status(400).json({ message: error.detail });
      }
      logger.error(`Erro ao excluir estação de id ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async findById(req, res) {
    const { id } = req.params;
    logger.debug(`Pesquisando estação pelo id ${id}`);
    try {
      const result = await connection('estacoes').where('id', id).select('*').first();
      return res.json(result);
    } catch (error) {
      logger.error(`Erro ao pesquisar estação de id ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async findAll(req, res) {
    const { page = 1, size = 5 } = req.query;
    logger.debug('Iniciando pesquisa paginada de estações');
    try {
      const { tipoEstacao, numero } = req.body;
      const { whereRaw, args } = getClauseWhere(tipoEstacao, numero);
      const responseCount = await connection('estacoes').whereRaw(whereRaw, args).count('id');
      const estacoes = await connection('estacoes')
        .whereRaw(whereRaw, args)
        .select('*')
        .offset((page - 1) * size)
        .limit(size);
      res.header('X-Total-Count', responseCount[0].count);
      res.header('X-Page-Number', page);
      res.header('X-Page-Size', size);
      return res.json(estacoes);
    } catch (error) {
      logger.error(`Erro ao realizar pesquisa paginada de estações. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  }
};

function getClauseWhere(tipoEstacao, numero) {
  let whereRaw = '';
  const args = [];
  let isClause = false;
  if (tipoEstacao) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"tipoEstacao" ilike ?');
    args[args.length] = '%' + tipoEstacao.trim() + '%';
    isClause = true;
  }
  if (numero) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('numero = ?');
    args[args.length] = numero;
    isClause = true;
  }
  return { whereRaw, args };
}

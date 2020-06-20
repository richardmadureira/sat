const connection = require('../database/connection');
const logger = require('../config/logger');

module.exports = {
  async create(req, res) {
    logger.debug('Iniciando criação de novo painel');
    const { nome, descricao, mensagem, ativo, listaIdsServicos } = req.body;
    const servicos = [];

    try {
      const response = await connection('paineis').insert({ nome, descricao, mensagem, ativo }).returning('*');
      if (listaIdsServicos && Array.isArray(listaIdsServicos)) {
        for (const idServico of listaIdsServicos) {
          servicos.push({ id_painel: response[0].id, id_servico: idServico });
        }
      }
      const responseServicos = await connection('paineis_servicos').insert(servicos).returning('id_servico');
      const retorno = response[0];
      retorno.listaIdsServicos = responseServicos;
      return res.json(retorno);
    } catch (error) {
      logger.error(`Erro ao criar novo painel: ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    logger.debug(`Iniciando atualização de painel de id ${id}`);
    try {
      const result = await connection('paineis').where('id', id).select('*').first();
      const servicos = [];
      if (result) {
        let retorno = result;
        const { nome, descricao, mensagem, ativo, listaIdsServicos } = req.body;
        const data = {};
        if (nome && result.nome !== nome) {
          data.nome = nome;
          retorno.nome = nome;
        }
        if (descricao && result.descricao !== descricao) {
          data.descricao = descricao;
          retorno.descricao = descricao;
        }
        if (mensagem && result.mensagem !== mensagem) {
          data.mensagem = mensagem;
          retorno.mensagem = mensagem;
        }
        if (ativo !== undefined && result.ativo !== ativo) {
          data.ativo = ativo;
          retorno.ativo = ativo;
        }
        if (listaIdsServicos && Array.isArray(listaIdsServicos)) {
          for (const idServico of listaIdsServicos) {
            servicos.push({ id_painel: id, id_servico: idServico });
          }
        }
        if (Object.keys(data).length > 0) {
          const response = await connection('paineis').where('id', id).update(data).returning('*');
          retorno = response[0];
        }
        if (servicos.length > 0) {
          await connection('paineis_servicos').where('id_painel', id).delete();
          const responseServicos = await connection('paineis_servicos').insert(servicos).returning('id_servico');
          retorno.listaIdsServicos = responseServicos;
        }
        return res.json(retorno);
      }
    } catch (error) {
      logger.error(`Erro ao atualizar painel de id: ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    logger.debug(`Iniciando exclusão de painel de id ${id}`);
    try {
      await connection('paineis').where('id', id).delete();
      return res.status(204).send();
    } catch (error) {
      logger.error(`Erro ao excluir painel de id ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async findById(req, res) {
    const { id } = req.params;
    logger.debug(`Pesquisando painel pelo id ${id}`);
    try {
      const result = await connection('paineis').where('id', id).select('*').first();
      return res.json(result);
    } catch (error) {
      logger.error(`Erro ao pesquisar painel de id ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async findAll(req, res) {
    const { page = 1, size = 5 } = req.query;
    logger.debug('Iniciando pesquisa paginada de estações');
    try {
      const { nome, descricao, mensagem, ativo } = req.body;
      const { whereRaw, args } = getClauseWhere(nome, descricao, mensagem, ativo);
      const responseCount = await connection('paineis').whereRaw(whereRaw, args).count('id');
      const paineis = await connection('paineis')
        .whereRaw(whereRaw, args)
        .select('*')
        .offset((page - 1) * size)
        .limit(size);
      res.header('X-Total-Count', responseCount[0].count);
      res.header('X-Page-Number', page);
      res.header('X-Page-Size', size);
      return res.json(paineis);
    } catch (error) {
      logger.error(`Erro ao realizar pesquisa paginada de estações. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  }
};

function getClauseWhere(nome, descricao, mensagem, ativo) {
  let whereRaw = '';
  const args = [];
  let isClause = false;
  if (nome) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"nome" ilike ?');
    args[args.length] = '%' + nome.trim() + '%';
    isClause = true;
  }
  if (descricao) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"descricao" ilike ?');
    args[args.length] = '%' + descricao.trim() + '%';
    isClause = true;
  }
  if (mensagem) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"mensagem" ilike ?');
    args[args.length] = '%' + mensagem.trim() + '%';
    isClause = true;
  }
  if (ativo !== undefined) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('ativo = ?');
    args[args.length] = ativo;
    isClause = true;
  }
  return { whereRaw, args };
}

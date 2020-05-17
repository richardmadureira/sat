const connection = require('../database/connection');
const logger = require('../config/logger');

module.exports = {
  async create(req, res) {
    logger.debug('Iniciando criação de nova pessoa');
    const { cpf, nome, email, sexo, dataNascimento } = req.body;
    const { key } = req.file;
    try {
      const response = await connection('pessoas')
        .insert({ cpf, nome, email, sexo, data_nascimento: dataNascimento, foto: `http://localhost:3333/files/${key}` })
        .returning(['cpf', 'nome', 'email', 'sexo', 'data_nascimento as dataNascimento', 'foto']);
      return res.json(response[0]);
    } catch (error) {
      logger.error(`Erro ao criar nova pessoa: ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    logger.debug(`Iniciando atualização de pessoa de id ${id}`);
    try {
      const result = await connection('pessoas').where('id', id).select('*').first();
      if (result) {
        const { cpf, nome, email, sexo, dataNascimento } = req.body;
        let data = {};
        if (cpf && result.cpf !== cpf) {
          data.cpf = cpf;
        }
        if (nome && result.nome !== nome) {
          data.nome = nome;
        }
        if (email && result.email !== email) {
          data.email = email;
        }
        if (sexo && result.sexo !== sexo) {
          data.sexo = sexo;
        }
        if (dataNascimento && result.dataNascimento !== dataNascimento) {
          data.data_nascimento = dataNascimento;
        }
        const response = await connection('pessoas').where('id', id).update(data).returning('*');
        return res.json(response[0]);
      }
    } catch (error) {
      logger.error(`Erro ao atualizar pessoa de id: ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    logger.debug(`Iniciando exclusão de pessoa de id ${id}`);
    try {
      await connection('pessoas').where('id', id).delete();
      return res.status(204).send();
    } catch (error) {
      if (error.detail) {
        logger.error(`Erro ao excluir pessoa de id ${id}. ${error.detail}`);
        return res.status(400).json({ message: error.detail });
      }
      logger.error(`Erro ao excluir pessoa de id ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async findById(req, res) {
    const { id } = req.params;
    logger.debug(`Pesquisando pessoa pelo id ${id}`);
    try {
      const result = await connection('pessoas')
        .where('id', id)
        .select(['id', 'cpf', 'nome', 'email', 'sexo', 'data_nascimento as dataNascimento', 'foto'])
        .first();
      return res.json(result);
    } catch (error) {
      logger.error(`Erro ao pesquisar pessoa de id ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async findAll(req, res) {
    const { page = 1, size = 5 } = req.query;
    logger.debug('Iniciando pesquisa paginada de pessoas');
    try {
      const { cpf, nome, email, sexo, dataNascimento } = req.body;
      const { whereRaw, args } = getClauseWhere(cpf, nome, email, sexo, dataNascimento);
      const responseCount = await connection('pessoas').whereRaw(whereRaw, args).count('id');
      const pessoas = await connection('pessoas')
        .whereRaw(whereRaw, args)
        .select([
          'id',
          'cpf',
          'nome',
          'email',
          'sexo',
          'data_nascimento as dataNascimento',
          'foto'
        ])
        .offset((page - 1) * size)
        .limit(size);
      res.header('X-Total-Count', responseCount[0].count);
      res.header('X-Page-Number', page);
      res.header('X-Page-Size', size);
      return res.json(pessoas);
    } catch (error) {
      logger.error(`Erro ao realizar pesquisa paginada de pessoas. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
};

function getClauseWhere(cpf, nome, email, sexo, dataNascimento) {
  let whereRaw = '';
  let args = [];
  let isClause = false;
  if (cpf) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('cpf = ?');
    args[args.length] = cpf;
    isClause = true;
  }
  if (nome) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"nome" ilike ?');
    args[args.length] = '%' + nome.trim() + '%';
    isClause = true;
  }
  if (email) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"email" ilike ?');
    args[args.length] = '%' + email.trim() + '%';
    isClause = true;
  }
  if (sexo) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"sexo" ilike ?');
    args[args.length] = '%' + sexo.trim() + '%';
    isClause = true;
  }
  if (dataNascimento) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"data_nascimento" ilike ?');
    args[args.length] = '%' + nome.trim() + '%';
    isClause = true;
  }
  return { whereRaw, args };
}

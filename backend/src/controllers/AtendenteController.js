const connection = require('../database/connection');
const logger = require('../config/logger');

module.exports = {
  async create(req, res) {
    logger.debug('Iniciando criação de novo atendente');
    const { cpf, nome, email, sexo, dataNascimento, username, password } = req.body;
    try {
      const response = await connection('atendentes')
        .insert({ cpf, nome, email, sexo, data_nascimento: dataNascimento, username, password, foto: 'http://localhost:3333/foto1.png' })
        .returning('*');
      return res.json(response[0]);
    } catch (error) {
      logger.error(`Erro ao criar novo atendente: ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    logger.debug(`Iniciando atualização de atendente de id ${id}`);
    try {
      const result = await connection('atendentes').where('id', id).select('*').first();
      if (result) {
        const { cpf, nome, email, sexo, dataNascimento, username, password } = req.body;
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
        if (username && result.username !== username) {
          data.username = username;
        }
        if (password && result.password !== password) {
          data.password = password;
        }

        const response = await connection('atendentes').where('id', id).update(data).returning('*');
        return res.json(response[0]);
      }
    } catch (error) {
      logger.error(`Erro ao atualizar atendente de id: ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    logger.debug(`Iniciando exclusão de atendente de id ${id}`);
    try {
      await connection('atendentes').where('id', id).delete();
      return res.status(204).send();
    } catch (error) {
      if (error.detail) {
        logger.error(`Erro ao excluir atendente de id ${id}. ${error.detail}`);
        return res.status(400).json({ message: error.detail });
      }
      logger.error(`Erro ao excluir atendente de id ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async findById(req, res) {
    const { id } = req.params;
    logger.debug(`Pesquisando atendente pelo id ${id}`);
    try {
      const result = await connection('atendentes').where('id', id).select(["id", connection.raw('cpf::int'), "nome", "email", "sexo", "data_nascimento as dataNascimento", "username", "foto"]).first();
      return res.json(result);
    } catch (error) {
      logger.error(`Erro ao pesquisar atendente de id ${id}. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },
  async findAll(req, res) {
    const { page = 1, size = 5 } = req.query;
    logger.debug('Iniciando pesquisa paginada de atendentes');
    try {
      const { cpf, nome, email, sexo, dataNascimento, username, password } = req.body;
      const { whereRaw, args } = getClauseWhere(cpf, nome, email, sexo, dataNascimento, username, password);
      const responseCount = await connection('atendentes').whereRaw(whereRaw, args).count('id');
      const atendentes = await connection('atendentes')
        .whereRaw(whereRaw, args)
        .select(["id", connection.raw('cpf::int'), "nome", "email", "sexo", "data_nascimento as dataNascimento", "username", "password", "foto"])
        .offset((page - 1) * size)
        .limit(size);
      res.header('X-Total-Count', responseCount[0].count);
      res.header('X-Page-Number', page);
      res.header('X-Page-Size', size);
      return res.json(atendentes);
    } catch (error) {
      logger.error(`Erro ao realizar pesquisa paginada de atendentes. ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  }
};

function getClauseWhere(cpf, nome, email, sexo, dataNascimento, username, password) {
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
  if (username) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"username" ilike ?');
    args[args.length] = '%' + username.trim() + '%';
    isClause = true;
  }
  if (password) {
    if (isClause) whereRaw = whereRaw.concat(' and ');
    whereRaw = whereRaw.concat('"password" ilike ?');
    args[args.length] = '%' + password.trim() + '%';
    isClause = true;
  }
  return { whereRaw, args };
}

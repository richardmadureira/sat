const { celebrate, Segments, Joi } = require('celebrate');

function validateCreate() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idGrupoServico: Joi.number().integer().positive().required()
    }),
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      sigla: Joi.string().required(),
      descricao: Joi.string().required(),
      ativo: Joi.boolean().required()
    })
  });
}

function validateUpdate() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().positive().required()
    }),
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string(),
      sigla: Joi.string(),
      descricao: Joi.string(),
      ativo: Joi.boolean(),
      idGrupoServico: Joi.number().integer().positive()
    })
  });
}

function validateDelete() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().positive().required()
    })
  });
}

function validateFindById() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().positive().required()
    })
  });
}

function validateFindAll() {
  return celebrate({
    [Segments.QUERY]: {
      page: Joi.number().integer().positive().min(1),
      size: Joi.number().integer().positive().min(1)
    },
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string(),
      sigla: Joi.string(),
      descricao: Joi.string(),
      ativo: Joi.boolean()
    })
  });
}

module.exports = {
  validateCreate,
  validateUpdate,
  validateDelete,
  validateFindById,
  validateFindAll
};

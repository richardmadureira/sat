const { celebrate, Segments, Joi } = require('celebrate');

function validateCreate() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      descricao: Joi.string().required(),
      mensagem: Joi.string().required(),
      ativo: Joi.boolean().required(),
      listaIdsServicos: Joi.array().items(Joi.number())
    })
  });
}

function validateUpdate() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string(),
      descricao: Joi.string(),
      mensagem: Joi.string(),
      ativo: Joi.boolean(),
      listaIdsServicos: Joi.array().items(Joi.number())
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().positive().required()
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
      descricao: Joi.string(),
      mensagem: Joi.string(),
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

const { celebrate, Segments, Joi } = require('celebrate');

function validateCreate() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      tipoEstacao: Joi.string().required(),
      numero: Joi.number().integer().required()
    })
  });
}

function validateUpdate() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      tipoEstacao: Joi.string().required(),
      numero: Joi.number().integer().positive().required()
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
      tipoEstacao: Joi.string(),
      numero: Joi.number().integer().positive()
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

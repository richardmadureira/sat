const { celebrate, Segments, Joi } = require('celebrate');

function validateCreate() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      cpf: Joi.number().required(),
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      sexo: Joi.string().required(),
      dataNascimento: Joi.date().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      foto: Joi.link()
    })
  });
}

function validateUpdate() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      cpf: Joi.number(),
      nome: Joi.string(),
      email: Joi.string().email(),
      sexo: Joi.string(),
      dataNascimento: Joi.date(),
      username: Joi.string(),
      password: Joi.string(),
      foto: Joi.link()
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
      cpf: Joi.number(),
      nome: Joi.string(),
      email: Joi.string().email(),
      sexo: Joi.string(),
      dataNascimento: Joi.date(),
      username: Joi.string(),
      password: Joi.string(),
      foto: Joi.link()
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

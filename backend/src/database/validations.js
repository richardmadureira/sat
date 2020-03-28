const { celebrate, Segments, Joi } = require('celebrate');

function validateCreateEstacao() {
	return celebrate({
		[Segments.BODY]: Joi.object().keys({
			tipoEstacao: Joi.string().required(),
			numero: Joi.number()
				.integer()
				.required()
		})
	});
}

function validateUpdateEstacao() {
	return celebrate({
		[Segments.BODY]: Joi.object().keys({
			tipoEstacao: Joi.string().required(),
			numero: Joi.number()
				.integer()
				.positive()
				.required()
		}),
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number()
				.integer()
				.positive()
				.required()
		})
	});
}

function validateDeleteEstacao() {
	return celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number()
				.integer()
				.positive()
				.required()
		})
	});
}

module.exports = {
	validateCreateEstacao,
	validateUpdateEstacao,
	validateDeleteEstacao
};

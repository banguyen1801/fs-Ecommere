// VALIDATION
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().required(),
    role: Joi.array().min(1),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const productCreationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    categories: Joi.array().min(1).required(),
  });
};

module.exports = {
  registerValidation,
  loginValidation,
  productCreationValidation,
};

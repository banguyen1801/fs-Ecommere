// VALIDATION
import Joi from '@hapi/joi';

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const productCreationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    categories: Joi.array().required(),
  });

  return schema.validate(data);
};

export { registerValidation, loginValidation, productCreationValidation };

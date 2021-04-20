// VALIDATION
// import Joi from '@hapi/joi';
import Joi from 'joi-oid';

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

const orderCreationValidation = (data) => {
  const schema = Joi.object({
    user_id: Joi.string(),
    order_items: Joi.array(),
    detail: Joi.string(),
    total: Joi.number(),
    status: Joi.string(),
  });
  return schema.validate(data);
};

export {
  registerValidation,
  loginValidation,
  productCreationValidation,
  orderCreationValidation,
};

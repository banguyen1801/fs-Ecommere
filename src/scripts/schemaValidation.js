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

const cartCreationValidation = (data) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
  });
  return schema.validate(data);
};

const orderCreationValidation = (data) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    items: Joi.array(),
  });
  return schema.validate(data);
};

const orderUpdateValidation = (data) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    newStatus: Joi.string().valid('Completed', 'Pending', 'Canceled'),
  });
  return schema.validate(data);
};

const orderItemCreationValidation = (data) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    order_id: Joi.string().required(),
  });
  return schema.validate(data);
};

export {
  registerValidation,
  loginValidation,
  productCreationValidation,
  cartCreationValidation,
  orderCreationValidation,
  orderItemCreationValidation,
  orderUpdateValidation,
};

const badRequest = (res, msg) => {
  res.status(400).json(msg);
};

const internal = (res, msg) => {
  res.status(500).json(msg);
};

// user errors
const UserExistedErr = () => ({
  code: 'User Existed',
  status: 401,
  message: `User with this email already been created `,
});

// product errors
const ProductExistedErr = () => ({
  code: 'Product Existed',
  status: 401,
  message: `Product already exist! `,
});

// order errors
const OrderDBEmptyErr = () => ({
  code: 'Cannot find Order Doc in DB',
  status: 404,
  message: `Order collection is empty`,
});
const OrderNotExistErr = () => ({
  code: 'Order Not Existed',
  status: 404,
  message: `Order Not Existed!`,
});

export {
  badRequest,
  internal,
  UserExistedErr,
  ProductExistedErr,
  OrderDBEmptyErr,
  OrderNotExistErr,
};

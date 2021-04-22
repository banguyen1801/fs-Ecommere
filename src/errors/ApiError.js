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
const CartDBEmptyErr = () => ({
  code: 'Cannot find Cart Doc in DB',
  status: 404,
  message: `Cart collection is empty`,
});
const CartNotExistErr = () => ({
  code: 'Cart Not Existed',
  status: 404,
  message: `Cart Not Existed!`,
});

export {
  badRequest,
  internal,
  UserExistedErr,
  ProductExistedErr,
  CartDBEmptyErr,
  CartNotExistErr,
};

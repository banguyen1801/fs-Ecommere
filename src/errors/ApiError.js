const badRequest = (res, msg) => {
  res.status(400).json(msg);
};

const internal = (res, msg) => {
  res.status(500).json(msg);
};

// user errors
const userExistedErr = (email) => ({
  code: 'User Existed',
  status: 401,
  message: `${email} already been use `,
});

// product errors
const productExistedErr = (product) => ({
  code: 'Product Existed',
  status: 401,
  message: `${product} already exist! `,
});

//crud failed

const createFailed = (thingName) => ({
  code: 'Create operation failed',
  status: 400,
  message: `${thingName}: failed to create!`,
});
const removeFailed = (thingName) => ({
  code: 'Remove operation failed',
  status: 400,
  message: `${thingName}: failed to remove!`,
});
const updateFailed = (thingName) => ({
  code: 'Update operation failed',
  status: 400,
  message: `${thingName}: failed to update!`,
});
const deleteFailed = (thingName) => ({
  code: 'Delete operation failed',
  status: 400,
  message: `${thingName}: failed to delete!`,
});

export {
  badRequest,
  internal,
  userExistedErr,
  productExistedErr,
  createFailed,
  removeFailed,
  updateFailed,
  deleteFailed,
};

const badRequest = (res, msg) => {
  res.status(400).json(msg);
};

const internal = (res, msg) => {
  res.status(500).json(msg);
};

const userExistedErr = (email) => ({
  code: 'User Existed',
  status: 401,
  message: `${email} with already been use `,
});

export { badRequest, internal, userExistedErr };

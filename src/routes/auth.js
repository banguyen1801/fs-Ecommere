const router = require('express').Router();

const { verifyRefreshToken } = require('../services/jwtServices');

const {
  registerUserService,
  loginUserService,
} = require('../services/authServices');

// Register
router.post('/register', async (req, res) => {
  const savedUser = await registerUserService(req, res);
  res.send(savedUser);
});

// Login logic
router.post('/login', async (req, res) => {
  const [accessToken, refreshToken] = await loginUserService(req, res);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

// this route is used for verifying requestToken and gain user a new JWT accessToken
// TODO:
router.post('/token', async (req, res) => {
  const newAccessToken = verifyRefreshToken(req.body);
  res.json({ newAccessToken: newAccessToken });
});
module.exports = router;

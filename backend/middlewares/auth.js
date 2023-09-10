const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
// 401
const UnAuthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log("1", JWT_SECRET);
    return next(new UnAuthorizedError('Необходима авторизаци'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log("2", JWT_SECRET);
    return next(new UnAuthorizedError('Необходима авторизаци'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;

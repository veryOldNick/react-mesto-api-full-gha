const jwt = require('jsonwebtoken');
// 401
const UnAuthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthorizedError('Необходима авторизаци'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'bla bla bla');
  } catch (err) {
    return next(new UnAuthorizedError('Необходима авторизаци'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;

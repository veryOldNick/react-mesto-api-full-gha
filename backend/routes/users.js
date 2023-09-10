const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regUrl = require('../utils/constants');

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getInfoMe,
} = require('../controllers/users');

// // создаёт пользователя
// router.post('/', createUser);

// возвращает информацию о текущем пользователе
router.get('/me', getInfoMe);

// возвращает всех пользователей
router.get('/', getUsers);

// возвращает пользователя по _id
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUserById);

// обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

// обновляет аватар
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regUrl),
  }),
}), updateAvatar);

module.exports = router;

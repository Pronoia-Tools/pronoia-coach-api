export {}
const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    country: Joi.string().required(),
    notify: Joi.boolean().required(),
  }),
};
const updateUser = {
  body: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    currentEmail: Joi.string().required().email(),
    newEmail: Joi.string().required().email(),
    country: Joi.string().required(),
  }),
};
const updatePassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required().custom(password),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const refresh = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  })
}

// const logout = {
//   body: Joi.object().keys({
//     refreshToken: Joi.string().required(),
//   }),
// };

// const refreshTokens = {
//   body: Joi.object().keys({
//     refreshToken: Joi.string().required(),
//   }),
// };

// const forgotPassword = {
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//   }),
// };

// const resetPassword = {
//   query: Joi.object().keys({
//     token: Joi.string().required(),
//   }),
//   body: Joi.object().keys({
//     password: Joi.string().required().custom(password),
//   }),
// };

// const verifyEmail = {
//   query: Joi.object().keys({
//     token: Joi.string().required(),
//   }),
// };

module.exports = {
  register,
  login,
  updateUser,
  updatePassword
  // logout,
  // refreshTokens,
  // forgotPassword,
  // resetPassword,
  // verifyEmail,
};
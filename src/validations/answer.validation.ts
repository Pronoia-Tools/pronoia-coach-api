export {}
const Joi = require('joi');

const saveAnswer = {
  body: Joi.object().keys({
    answer: Joi.string().required(),
  }),
};
const editAnswer = {
  body: Joi.object().keys({
    answer: Joi.string().required(),
  }),
};


module.exports = {
  saveAnswer,
  editAnswer
};
const Joi = require("joi");

const loginval = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).max(40).required(),
});

const registerval = Joi.object({
  username: Joi.string().required(),
  phonenumber: Joi.number().required(),
  password: Joi.string().min(6).max(40).required(),
});

const forgetpasswordval = Joi.object({
  email: Joi.string().email().min(3).max(50).required(),
  username: Joi.string().required(),
});

const resetpasswordval = Joi.object({
  newpassword: Joi.string().min(6).max(40).required(),
  encrypted: Joi.string().required(),
});

module.exports = {
  loginval,
  registerval,
  forgetpasswordval,
  resetpasswordval,
};

const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const PutAuthenticationPayloadShema = Joi.object({
  refreshToken: Joi.string().required(),
});

const DeleteAuthenticationPayloadShema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadShema,
  DeleteAuthenticationPayloadShema,
};

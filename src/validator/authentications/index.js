const {
  PostAuthenticationPayloadShema,
  PutAuthenticationPayloadShema,
  DeleteAuthenticationPayloadShema,
} = require('./schema');
const InvariantError = require('../../excepcionts/InvariantError');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const validationResult = PostAuthenticationPayloadShema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutAuthenticationPayload: (payload) => {
    const validationResult = PutAuthenticationPayloadShema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateDeleteAuthenticationPayload: (payload) => {
    const validationResult = DeleteAuthenticationPayloadShema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AuthenticationsValidator;

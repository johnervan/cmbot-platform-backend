const responseUtil = require('./responseUtil');

const {
  invalidField,
  generalError,
  notFound,
} = responseUtil.error;

class InvalidFieldError extends Error {}

class GeneralError extends Error {}

class NotFoundError extends Error {}

function handleError(err, callback) {
  if (err instanceof InvalidFieldError) {
    responseUtil.response(invalidField.errorMessage, invalidField.statusCode, callback);
  } else if (err instanceof NotFoundError) {
    responseUtil.response(notFound.errorMessage, notFound.statusCode, callback);
  } else {
    responseUtil.response(generalError.errorMessage, generalError.statusCode, callback);
  }
}

module.exports = {
  handleError,
  InvalidFieldError,
  GeneralError,
  NotFoundError,
};

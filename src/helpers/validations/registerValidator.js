const Validator = require('validator')

const isEmpty = require('./isEmpty')
const constants = require('./constants')

module.exports = data => {
  const errors = []

  data.username = !isEmpty(data.username) ? data.username : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  if (Validator.isEmpty(data.username)) {
    errors.push({ type: 'username', message: constants.USERNAME_REQUIRED })
  } else if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.push({ type: 'username', message: constants.USERNAME_LENGTH_ERROR })
  }

  if (Validator.isEmpty(data.email)) {
    errors.push({ type: 'email', message: constants.EMAIL_REQUIRED })
  } else if (!Validator.isEmail(data.email)) {
    errors.push({ type: 'email', message: constants.EMAIL_INVALID_ERROR })
  }

  if (Validator.isEmpty(data.password)) {
    errors.push({ type: 'password', message: constants.PASSWORD_REQUIRED })
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.push({ type: 'password', message: constants.PASSWORD_LENGTH_ERROR })
  }

  if (Validator.isEmpty(data.password2)) {
    errors.push({ type: 'password', message: constants.PASSWORD_REQUIRED })
  } else if (!Validator.equals(data.password, data.password2)) {
    errors.push({
      type: 'password',
      message: constants.PASSWORD_MISMATCH_ERROR,
    })
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

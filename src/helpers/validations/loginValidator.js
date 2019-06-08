const Validator = require('validator')

const isEmpty = require('./isEmpty')
const constants = require('./constants')

module.exports = data => {
  const errors = []

  data.usernameOrEmail = !isEmpty(data.usernameOrEmail)
    ? data.usernameOrEmail
    : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (Validator.isEmpty(data.usernameOrEmail)) {
    errors.push({ type: 'Username/Email', message: constants.REQUIRED_FIELD })
  }

  if (Validator.isEmpty(data.password)) {
    errors.push({ type: 'password', message: constants.PASSWORD_REQUIRED })
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

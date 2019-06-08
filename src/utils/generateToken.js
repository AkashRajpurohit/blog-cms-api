const jwt = require('jsonwebtoken')

const { secret } = require('../config')

module.exports = async payload => {
  const token = await jwt.sign(payload, secret, {
    expiresIn: '7 days',
  })
  const bearer = 'Bearer ' + token
  return bearer
}

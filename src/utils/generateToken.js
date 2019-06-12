const jwt = require('jsonwebtoken')

const { accessTokenSecret, refreshTokenSecret } = require('../config')

const generateAccessToken = async payload => {
  const token = await jwt.sign(payload, accessTokenSecret, {
    expiresIn: '30min',
  })
  return token
}

const generateRefreshToken = async payload => {
  const token = await jwt.sign(payload, refreshTokenSecret, {
    expiresIn: '24 days',
  })
  return token
}
module.exports = {
  generateAccessToken,
  generateRefreshToken,
}

const { sign } = require('jsonwebtoken')

const { accessTokenSecret, refreshTokenSecret } = require('../config')

module.exports = user => {
  const accessToken = sign(
    { userId: user.id, userType: user.usertype },
    accessTokenSecret,
    {
      expiresIn: '30min',
    }
  )

  const refreshToken = sign(
    {
      userId: user.id,
      userType: user.usertype,
      count: user.count,
    },
    refreshTokenSecret,
    { expiresIn: '7 days' }
  )

  return { accessToken, refreshToken }
}

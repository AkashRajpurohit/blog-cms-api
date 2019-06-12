const { verify } = require('jsonwebtoken')

const User = require('../api/user/user.model')
const { accessTokenSecret, refreshTokenSecret } = require('../config')

const errorResponse = require('./errorResponse')
const constants = require('./constants')

const createTokens = require('./createTokens')

module.exports = async (req, res, next) => {
  const accessToken = req.cookies['access-token']
  const refreshToken = req.cookies['refresh-token']
  if (accessToken) {
    try {
      const { userId } = await verify(accessToken, accessTokenSecret)

      req.userId = userId
      // valid accessToken. Allow to go to next middleware
      console.log('Done')
      return next()
    } catch {}
    // if we reach here means access token is expired
    // check if refresh token is valid or not
    if (!refreshToken) {
      return res.status(400).json(errorResponse(constants.UNAUTHORIZED))
    }

    let data

    try {
      data = await verify(refreshToken, refreshTokenSecret)
    } catch {
      // Refresh token has also expired
      return res.status(400).json(errorResponse(constants.INVALID_TOKEN))
    }

    // refresh token is verified
    const user = await User.findById(data.userId)

    if (!user || data.count !== user.count) {
      // token has been invalidated
      return res.status(400).json(errorResponse(constants.INVALID_TOKEN))
    }

    // All ok finally xD
    const tokens = createTokens(user)

    res.cookie('access-token', tokens.accessToken)
    res.cookie('refresh-token', tokens.refreshToken)
    req.userId = user.id

    next()
  } else {
    res.status(400).json(errorResponse(constants.NO_TOKEN))
  }
}

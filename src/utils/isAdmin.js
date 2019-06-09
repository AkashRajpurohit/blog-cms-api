const jwt = require('jsonwebtoken')

const { secret } = require('../config')
// Error response
const errorResponse = require('./errorResponse')
// Constants
const constants = require('./constants')

module.exports = async (req, res, next) => {
  const bearerToken = req.headers['authorization']
  if (bearerToken) {
    const token = bearerToken.split(' ')[1]
    try {
      const { userId, userType } = await jwt.verify(token, secret)

      if (userType !== 'admin') {
        return res.status(401).json(errorResponse(constants.UNAUTHORIZED))
      }

      req.userId = userId

      // if everything works fine, go to next middleware
      next()
    } catch (err) {
      return res.status(400).json(errorResponse(constants.INVALID_TOKEN))
    }
  } else {
    res.status(400).json(errorResponse(constants.NO_TOKEN))
  }
}

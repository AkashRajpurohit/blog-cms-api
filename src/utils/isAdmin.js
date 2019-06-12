const errorResponse = require('./errorResponse')
const constants = require('./constants')

module.exports = (req, res, next) => {
  if (req.userType === 'admin') {
    return next()
  }
  return res.status(400).json(errorResponse(constants.UNAUTHORIZED))
}

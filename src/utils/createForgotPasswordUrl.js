const { baseUrl } = require('../config')

module.exports = (token) => `${baseUrl}/api/v1/user/change-password/?token=${token}`
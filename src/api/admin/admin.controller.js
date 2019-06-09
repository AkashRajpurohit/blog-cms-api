const User = require('../user/user.model')

const successResponse = require('../../utils/successResponse')
const errorResponse = require('../../utils/errorResponse')

const constants = require('../../utils/constants')

/*
 * ROUTE  - /api/v1/admin/get-users
 * METHOD - GET
 * ACCESS - Private
 * BODY   - None
 * DESC   - View all details of the user like email, username, usertype, createdAt, updatedAt
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      'username email usertype createdAt updatedAt'
    )

    if (!users) {
      return res.status(404).json(errorResponse(constants.ERROR_404))
    }

    res.json(successResponse(constants.BASIC_MESSAGE, users))
  } catch (e) {
    console.log('Error in fetching details by admin: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

module.exports = {
  getAllUsers,
}

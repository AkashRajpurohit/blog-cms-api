const bcrypt = require('bcryptjs')
const User = require('./user.model')

const successResponse = require('../../utils/successResponse')
const errorResponse = require('../../utils/errorResponse')

const constants = require('../../utils/constants')

/*
 * ROUTE  - /api/v1/user/register
 * METHOD - POST
 * ACCESS - Public
 * DESC   - Register a new user
 */
const register = async (req, res, next) => {
  // TODO: Add server side validations on input fields
  const { username, email, password } = req.body

  try {
    const emailExists = await User.findOne({ email })

    if (emailExists) {
      return res.status(400).json(errorResponse(constants.EMAIL_ALREADY_EXISTS))
    }

    const usernameTaken = await User.findOne({ username })

    if (usernameTaken) {
      return res.status(400).json(errorResponse(constants.USERNAME_EXISTS))
    }

    // All ok - Hash password and save
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    return res.json(successResponse(constants.BASIC_MESSAGE))
  } catch (e) {
    console.log('Error in Registration: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

module.exports = {
  register,
}

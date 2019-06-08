const bcrypt = require('bcryptjs')
const User = require('./user.model')

const successResponse = require('../../utils/successResponse')
const errorResponse = require('../../utils/errorResponse')

const constants = require('../../utils/constants')

const registerValidator = require('../../helpers/validations/registerValidator')

/*
 * ROUTE  - /api/v1/user/register
 * METHOD - POST
 * ACCESS - Public
 * BODY   - { username, email, password }
 * DESC   - Register a new user
 */
const register = async (req, res) => {
  const { errors, isValid } = registerValidator(req.body)

  if (!isValid) {
    return res
      .status(400)
      .json(errorResponse(constants.VALIDATION_ERROR, errors))
  }

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

/*
 * ROUTE  - /api/v1/user/login
 * METHOD - POST
 * ACCESS - Public
 * BODY   - { usernameOrEmail, password }
 * DESC   - Login a user and return a JWT token
 */
const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body

  try {
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    })

    if (!user) {
      return res.status(400).json(errorResponse(constants.AUTHENTICATION_ERROR))
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json(errorResponse(constants.AUTHENTICATION_ERROR))
    }

    // All ok
    // TODO: Generate Token

    res.json(successResponse(constants.BASIC_MESSAGE))
  } catch (e) {
    console.log('Error in Login: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

module.exports = {
  register,
  login,
}

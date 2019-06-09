const bcrypt = require('bcryptjs')
const User = require('./user.model')

const successResponse = require('../../utils/successResponse')
const errorResponse = require('../../utils/errorResponse')

const constants = require('../../utils/constants')

const registerValidator = require('../../helpers/validations/registerValidator')
const loginValidator = require('../../helpers/validations/loginValidator')

const generateToken = require('../../utils/generateToken')

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
  const { errors, isValid } = loginValidator(req.body)

  if (!isValid) {
    return res
      .status(400)
      .json(errorResponse(constants.VALIDATION_ERROR, errors))
  }

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
    const token = await generateToken({
      userId: user.id,
      userType: user.usertype,
    })

    res.json(successResponse(constants.BASIC_MESSAGE, { token }))
  } catch (e) {
    console.log('Error in Login: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

/*
 * ROUTE  - /api/v1/user/
 * METHOD - GET
 * ACCESS - Private
 * BODY   - None
 * DESC   - View all details of the user like email, username
 */
const getDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(401).json(errorResponse(constants.UNAUTHORIZED))
    }

    const userDetails = {
      username: user.username,
      email: user.email,
    }

    res.json(successResponse(constants.BASIC_MESSAGE, userDetails))
  } catch (e) {
    console.log('Error in fetching details: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

module.exports = {
  register,
  login,
  getDetails,
}

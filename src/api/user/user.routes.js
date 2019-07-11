const express = require('express')
const router = express.Router()

const isAuth = require('../../utils/isAuthenticated')

const { register, login, getDetails, forgotPassword, changePassword } = require('./user.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/change-password', changePassword)

router.get('/', isAuth, getDetails)

module.exports = router

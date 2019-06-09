const express = require('express')
const router = express.Router()

const isAuth = require('../../utils/isAuthenticated')

const { register, login, getDetails } = require('./user.controller')

router.post('/register', register)
router.post('/login', login)

router.get('/', isAuth, getDetails)

module.exports = router

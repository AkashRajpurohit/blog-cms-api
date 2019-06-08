const express = require('express')

const isAuth = require('../../utils/isAuthenticated')
const { addBlog } = require('./blog.controller')

const router = express.Router()

router.use(isAuth)

router.post('/', addBlog)

module.exports = router

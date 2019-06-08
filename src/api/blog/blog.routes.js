const express = require('express')

const isAuth = require('../../utils/isAuthenticated')
const { addBlog, editBlog } = require('./blog.controller')

const router = express.Router()

router.use(isAuth)

router.post('/', addBlog)
router.patch('/:blog_id', editBlog)

module.exports = router

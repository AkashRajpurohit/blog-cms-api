const express = require('express')
const router = express.Router()

const user = require('./api/user/user.routes')
const blog = require('./api/blog/blog.routes')

router.use('/user', user)
router.use('/blog', blog)

module.exports = router

const express = require('express')
const router = express.Router()

const user = require('./api/user/user.routes')
const blog = require('./api/blog/blog.routes')
const admin = require('./api/admin/admin.routes')

router.use('/user', user)
router.use('/blog', blog)
router.use('/admin', admin)

module.exports = router

const express = require('express')
const router = express.Router()

const isAdmin = require('../../utils/isAdmin')

const { getAllUsers, editBlog, deleteBlog } = require('./admin.controller')

router.use(isAdmin)

router.get('/get-users', getAllUsers)
router.patch('/blog/:blog_id', editBlog)
router.delete('/blog/:blog_id', deleteBlog)

module.exports = router

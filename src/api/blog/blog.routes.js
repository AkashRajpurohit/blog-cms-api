const express = require('express')

const isAuth = require('../../utils/isAuthenticated')
const { addBlog, editBlog, deleteBlog, getBlogs } = require('./blog.controller')

const router = express.Router()

router.use(isAuth)

router.post('/', addBlog)
router.patch('/:blog_id', editBlog)
router.delete('/:blog_id', deleteBlog)
router.get('/', getBlogs)

module.exports = router

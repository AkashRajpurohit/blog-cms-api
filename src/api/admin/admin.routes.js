const express = require('express')
const router = express.Router()

const isAdmin = require('../../utils/isAdmin')

const {
  getAllUsers,
  deleteUser,
  editBlog,
  deleteBlog,
} = require('./admin.controller')

router.use(isAdmin)

router.get('/get-users', getAllUsers)
router.delete('/user/:user_id', deleteUser)
router.patch('/blog/:blog_id', editBlog)
router.delete('/blog/:blog_id', deleteBlog)

module.exports = router

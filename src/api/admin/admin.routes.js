const express = require('express')
const router = express.Router()

const isAuth = require('../../utils/isAuthenticated')
const isAdmin = require('../../utils/isAdmin')

const {
  getAllUsers,
  deleteUser,
  createUser,
  changeUserToAdmin,
  editBlog,
  deleteBlog,
} = require('./admin.controller')

router.use(isAuth)
router.use(isAdmin)

router.get('/get-users', getAllUsers)
router.post('/user', createUser)
router.patch('/user/:user_id', changeUserToAdmin)
router.delete('/user/:user_id', deleteUser)
router.patch('/blog/:blog_id', editBlog)
router.delete('/blog/:blog_id', deleteBlog)

module.exports = router

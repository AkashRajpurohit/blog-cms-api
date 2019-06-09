const express = require('express')
const router = express.Router()

const isAdmin = require('../../utils/isAdmin')

const { getAllUsers } = require('./admin.controller')

router.use(isAdmin)

router.get('/get-users', getAllUsers)

module.exports = router

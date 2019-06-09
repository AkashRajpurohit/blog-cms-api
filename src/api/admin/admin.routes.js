const express = require('express')
const router = express.Router()

const isAdmin = require('../../utils/isAdmin')

router.use(isAdmin)

module.exports = router

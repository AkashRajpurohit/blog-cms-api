const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

module.exports = [
  express.urlencoded({ extended: false }),
  express.json(),
  cors(),
  morgan('dev'),
  helmet(),
]

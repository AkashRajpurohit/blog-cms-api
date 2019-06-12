const express = require('express')

const commonMiddlewares = require('./middlewares')
require('./helpers/dbConnection')

const routes = require('./routes')

const app = express()

app.use(...commonMiddlewares)

app.get('/', (_, res) => {
  res.json({
    message: 'Hello World!',
    'where to?': 'Read the docs at: /api/v1/docs',
  })
})

app.get('/api/v1/docs', (_, res) => {
  res.redirect('https://documenter.getpostman.com/view/4346639/S1TZzbts')
})

app.use('/api/v1', routes)

module.exports = app

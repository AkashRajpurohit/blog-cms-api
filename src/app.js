const express = require('express')

const commonMiddlewares = require('./middlewares')
require('./helpers/dbConnection')

const routes = require('./routes')

const app = express()

app.use(...commonMiddlewares)

app.get('/', (_, res) => {
  res.json({ message: 'Hello World!' })
})

app.use('/api/v1', routes)

module.exports = app

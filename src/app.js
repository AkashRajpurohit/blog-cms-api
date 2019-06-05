const express = require('express')

const commonMiddlewares = require('./middlewares')

const app = express()

app.use(...commonMiddlewares)

app.get('/', (_, res) => {
  res.json({ message: 'Hello World!' })
})

module.exports = app

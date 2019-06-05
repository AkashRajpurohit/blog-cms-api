const express = require('express')

const app = express()

app.get('/', (_, res) => {
  res.json({ message: "Hello World!" })
})

module.exports = app
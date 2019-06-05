const mongoose = require('mongoose')

const { mongoURI } = require('../config')

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Database Connected 🎉'))
  .catch(err => console.log(`😓 Error in DB connection: ${err}`))

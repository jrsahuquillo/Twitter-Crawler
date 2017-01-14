'use strict'

const mongoose = require("mongoose")
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Database connection error: ${err}`)
  }
  console.log('Successful database connection')

  app.listen(config.port, () => {
    console.log(`API REST runing in http://localhost:${config.port}`)
  })
})

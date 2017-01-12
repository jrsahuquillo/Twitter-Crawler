'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Xray = require("x-ray")
const mongoose = require("mongoose")

const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3001


app.use(bodyParser.urlencoded( {extended: false}))
app.use(bodyParser.json())

var xray = new Xray()
app.get('/api/user', (req, res) => {
  res.send(200, {users:[]})
})

app.get('/api/user/:username', (req, res) => {
  var user = xray(`http://twitter.com/${req.params.username}`, {
    name: 'h1 a',
    username: 'h2 a',
    image: 'img.ProfileAvatar-image@src',
    biography: '.ProfileHeaderCard > p',
    tweets: '.Grid-cell .ProfileNav-item--tweets .ProfileNav-value',
    following: '.Grid-cell .ProfileNav-item--following .ProfileNav-value',
    followers: ' .Grid-cell .ProfileNav-item--followers .ProfileNav-value'
  })((err,response) => {
    res.status(200).send({data: response})
  })
})



mongoose.connect('mongodb://localhost:27017/log', (err, res) => {
  if (err) {
    return console.log(`Database connection error: ${err}`)
  }
  console.log('Successful database connection')

  app.listen(port, () => {
    console.log(`API REST runing in http://localhost:${port}`)
  })
})

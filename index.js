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

app.get('/api/log/list', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({message: `Error al hacer la petición: ${err}`})
    if(!users) return res.status(404).send({message: 'Users not found'})
    res.status(200).send({users})
  })
})

var xray = new Xray()

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
    res.status(200).send(response)
    console.log(response)
    var test = new User({
      name: response.name,
      username: response.username,
      image: response.image,
      biography: response.biography,
      tweets: response.tweets,
      following: response.following,
      followers: response.followers
    })
    test.save((err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('success')
      }
    })
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

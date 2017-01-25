const express = require('express')
const User = require('../models/user')
const Xray = require("x-ray")
// const Crawler = require('../crawler')
//
//
// var xray = new Xray()
// function getUser(req,res) {
//   var nickname = `${req.params.username}`
//   Crawler.twitterCrawler(res, nickname)
//   console.log(response)
//   var userData = new User({
//     name: response.name,
//     username: response.username,
//     image: response.image,
//     biography: response.biography,
//     tweets: response.tweets,
//     following: response.following,
//     followers: response.followers
//   })
//   userData.save((err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('success')
//     }
//   })
// }



var xray = new Xray()
function getUser(req, res) {
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
}

function getUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({message: `Error al hacer la petición: ${err}`})
    if(!users) return res.status(404).send({message: 'Users not found'})
    res.status(200).send({users})
  })
}

module.exports = {
  getUser,
  getUsers
}

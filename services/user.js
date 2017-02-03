'use strict'

const User = require('../models/user')

function create(userData) {
  var user = new User({
    name: userData.name,
    username: userData.username,
    image: userData.image,
    biography: userData.biography,
    tweets: userData.tweets,
    following: userData.following,
    followers: userData.followers
  })
  save(user)
}

function save(user) {
  user.save((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('success')
    }
  })
}

function showUser(user, res){
  res.status(200).send(user)
}

function showError(error, res) {
  res.status(200).send(`Invalid user!`)
}

module.exports = {
  create,
  showUser,
  showError
}

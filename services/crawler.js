'use strict'

const Xray = require('x-ray')
const User = require('../models/user')
const userService = require('./user')
const userCtrl = require('../controllers/user')

var userSkeleton = {
  name: 'h1 a',
  username: 'h2 a',
  image: 'img.ProfileAvatar-image@src',
  biography: '.ProfileHeaderCard > p',
  tweets: '.Grid-cell .ProfileNav-item--tweets .ProfileNav-value',
  following: '.Grid-cell .ProfileNav-item--following .ProfileNav-value',
  followers: ' .Grid-cell .ProfileNav-item--followers .ProfileNav-value'
}

function userScraper(user,res){
  var xray = new Xray()
  xray(`http://twitter.com/${user}`, userSkeleton )((err,response) => {
    if (validUser(response.name)) {
      createUser(response)
      userService.showUser(response, res)
    }else{
      userService.showError(err, res)
    }
  })
}

function createUser(userData){
  userService.create(userData)
}

function validUser(username){
  return username != undefined
}

module.exports = {
  userScraper
}

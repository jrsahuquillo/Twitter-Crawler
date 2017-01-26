'use strict'

const Xray = require('x-ray')
const User = require('./models/user')
const userCtrl = require('./controllers/user')
const userService = require('./services/user')


function userScraper(user,res){
  var xray = new Xray()
  xray(`http://twitter.com/${user}`, {
    name: 'h1 a',
    username: 'h2 a',
    image: 'img.ProfileAvatar-image@src',
    biography: '.ProfileHeaderCard > p',
    tweets: '.Grid-cell .ProfileNav-item--tweets .ProfileNav-value',
    following: '.Grid-cell .ProfileNav-item--following .ProfileNav-value',
    followers: ' .Grid-cell .ProfileNav-item--followers .ProfileNav-value'
  })((err,response) => {
    if (response.name == undefined ) {
      userCtrl.showError(err, res)
    }else{
      var user = userService.create(response)
      userCtrl.showUser(response, res)
    }
  })
}

module.exports = {
  userScraper
}

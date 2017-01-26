'use strict'
const express = require('express')
const User = require('../models/user')
const Xray = require('x-ray')
const Crawler = require('../services/crawler')

//Scraps twitter user adding username to url /api/user/username
function getUser(req, res) {
  var required_user = req.params.username
  Crawler.userScraper(required_user, res)
}

//Lists scraped DB
function getUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({message: `Error: ${err}`})
    if(!users) return res.status(404).send({message: 'Users not found'})
    res.status(200).send({users})
  })
}

module.exports = {
  getUser,
  getUsers
}

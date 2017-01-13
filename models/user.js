'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  name: String,
  username: String,
  image: String,
  biography: String,
  tweets: String,
  following: String,
  followers: String
}, { timestamps: true})

module.exports = mongoose.model('User', UserSchema)

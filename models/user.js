'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  data: Object
})

module.exports = mongoose.model('User', UserSchema)

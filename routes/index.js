'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const api = express.Router()

api.get('/log/list', userCtrl.getUsers)
api.get('/user/:username', userCtrl.getUser)

module.exports = api

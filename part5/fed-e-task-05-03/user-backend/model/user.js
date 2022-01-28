const mongoose = require('mongoose')
const baseModel = require('./base-model')
const md5 = require('../util/md5')

module.exports = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    set: md5,
    select: false
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  ...baseModel
})


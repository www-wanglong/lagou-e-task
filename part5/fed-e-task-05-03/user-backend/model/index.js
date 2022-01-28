const mongoose = require('mongoose')
const { dbUrl } = require('../config/config.default')

mongoose.connect(dbUrl)

var db = mongoose.connection

db.on('error', (err) => {
  console.log('MongoDB 数据库连接失败', err)
})

db.once('open', () => {
  console.log('MongoDB 连接成功')
})

module.exports = {
  User: mongoose.model('User', require('./user'))
}
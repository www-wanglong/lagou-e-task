const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const { jwtSecret } = require('../config/config.default')

const sign = promisify(jwt.sign)
const verify = promisify(jwt.verify)
const decode = promisify(jwt.decode)

const getToken =  async (userId) => {
  return sign({
    userId
  }, jwtSecret, {
    expiresIn: 60 * 60 * 24
  })
}

exports.sign = sign
exports.verify = verify
exports.decode = decode
exports.getToken = getToken
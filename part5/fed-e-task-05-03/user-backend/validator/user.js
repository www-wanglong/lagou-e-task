const { body, validationResult } = require('express-validator')
const validations = require('../middleware/validate')
const { User } = require('../model')
const user = require('../model/user')

exports.register = validations([
  body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .bail()
    .custom(async (username) => {
      const user = await User.findOne({ username })
      if (user) {
        return Promise.reject('用户名已存在')
      }
    }),
  body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式不正确'),
  body('user.password')
    .notEmpty().withMessage('密码能为空'),
])
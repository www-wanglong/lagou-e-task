const { User } = require('../model')
const { getToken } = require('../util/jwt')

exports.register = async (req, res, next) => {
  try {

    let user = new User(req.body.user)
    await user.save()
    user = user.toJSON()
    delete user.password
    const token = await getToken(user._id)
    res.status(201).json({
      token,
      user
    })

  } catch (err) {
    next(err)
  }
}


exports.login = async (req, res, next) => {
  try {
    res.end('login')
  } catch (err) {
    next(err)
  }
}

exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    })
  } catch (err) {
    next(err)
  }
}

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (user) {
      res.status(200).json({
        user
      })
    }
    return res.status(404).end()
  } catch (err) {
    next(err)
  }
}
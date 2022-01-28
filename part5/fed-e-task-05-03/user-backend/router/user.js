const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users/register', userValidator.register, userCtrl.register)

router.post('/users/login', userCtrl.login)

router.get('/users/:username', userCtrl.getUser)

router.get('/user', auth, userCtrl.getCurrentUser)

module.exports = router
const express = require('express')
const router = express.Router()
const UserController = require('../users/controller')

router.post('/login', [], UserController.loginUser)

module.exports = router

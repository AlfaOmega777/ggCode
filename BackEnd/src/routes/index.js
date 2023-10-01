const todos = require('../services/todos/routes')
const users = require('../services/users/routes')
const express = require('express')
const router = express.Router()

router.use('/todos', todos)
router.use('/users', users)

module.exports = router

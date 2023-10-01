// app/routes/todoRoutes.js
const express = require('express')
const router = express.Router()
const todoController = require('../todos/controller')

router.get('/forUser/:userId', todoController.getTodosForUserId)

router.get('/:id', todoController.getTodoById)

router.post('/', todoController.createTodo)

router.put('/:id', todoController.updateTodoById)

router.delete('/:id', todoController.deleteTodoById)

module.exports = router

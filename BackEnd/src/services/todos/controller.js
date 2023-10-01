const axios = require('axios')
const headerCreator = (req) => {
  const { authorization } = req.headers
  const headers = {
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json'
    }
  }
  return headers
}

class TodoController {
  async getTodosForUserId (req, res) {
    const { userId } = req.params

    try {
      const header = headerCreator(req)
      const response = await axios.get(`https://dummyjson.com/auth/todos/user/${userId}`, header)

      if (response.status === 200) {
        const todos = response.data
        res.json({ todos })
      } else {
        res.status(response.status).json({ message: 'Error obtaining todos list' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error. Try again later.' })
    }
  }

  async getTodoById (req, res) {
    const { id } = req.params

    try {
      const response = await axios.get(`https://dummyjson.com/auth/todos/${id}`, headerCreator(req))

      if (response.status === 200) {
        const todo = response.data
        res.json({ todo })
      } else {
        res.status(response.status).json({ message: 'Error obtaining todo' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error. Try again later.' })
    }
  }

  async createTodo (req, res) {
    const { userId, todo, completed } = req.body

    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/todos/add',
        { todo, completed, userId },
        headerCreator(req)
      )

      if (response.status === 200) {
        const newTodo = response.data
        res.status(201).json({ todo: newTodo })
      } else {
        res.status(response.status).json({ message: 'Error creating todo' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error. Try again later.' })
    }
  }

  async updateTodoById (req, res) {
    const { id } = req.params
    const { todo, completed } = req.body

    try {
      const response = await axios.put(
        `https://dummyjson.com/auth/todos/${id}`,
        { todo, completed },
        headerCreator(req)
      )

      if (response.status === 200) {
        const updatedTodo = response.data
        res.json({ todo: updatedTodo })
      } else {
        res.status(response.status).json({ message: 'Error updating todo' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error. Try again later.' })
    }
  }

  async deleteTodoById (req, res) {
    const { id } = req.params

    try {
      const response = await axios.delete(`https://dummyjson.com/auth/todos/${id}`, headerCreator(req))

      if (response.status === 200) {
        const deletedTodo = response.data
        res.json({ todo: deletedTodo })
      } else {
        res.status(response.status).json({ message: 'Error deleting todo item' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error. Try again later.' })
    }
  }
}

module.exports = new TodoController()

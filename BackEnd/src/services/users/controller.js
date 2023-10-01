const axios = require('axios')

class UserController {
  async createUser (req, res) {
    try {
      const { firstName, lastName, age, email, username, password } = req.body
      const response = await axios.post('https://dummyjson.com/users/add', {
        firstName,
        lastName,
        age,
        email,
        username,
        password
      })

      if (response.statusCode === 200) {
        const newUser = response.data
        res.status(201).json({ user: newUser })
      } else {
        res.status(response.status).json({ message: 'Error creating user' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error. Try again later.' })
    }
  }

  async loginUser (req, res) {
    try {
      const { username, password } = req.body
      const expiresInMins = 60

      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
        expiresInMins
      })

      const { token, id, firstName, lastName } = response.data

      if (token) {
        res.json({ token, id, firstName, lastName })
      } else {
        res.status(401).json({ message: 'Authentication failed' })
      }
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: 'Invalid Credentials' })
    }
  }
}

module.exports = new UserController()

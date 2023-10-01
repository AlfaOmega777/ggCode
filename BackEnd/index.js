const express = require('express')
const app = express()
const routes = require('./src/routes/index')
const config = require('./src/config/index')
const bodyParser = require('body-parser')

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', routes)

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`)
})

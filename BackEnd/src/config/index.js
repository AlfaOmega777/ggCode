if (process.env.NODE_ENV !== 'production') {
  if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: 'test.env' })
  } else {
    require('dotenv').config()
  }
}

module.exports = {
  PORT: process.env.PORT,
  APPLICATION_NAME: process.env.APPLICATION_NAME
}

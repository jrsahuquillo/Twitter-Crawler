var MONGODB_URI ="mongodb://username:password@ds01316.mlab.com:1316/log"

module.exports = {
  port: process.env.PORT || 3001,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/log'
}

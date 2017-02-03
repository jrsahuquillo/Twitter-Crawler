var MONGODB_URI ="mongodb://username:password@ds139899.mlab.com:39899/influencity"


module.exports = {
  port: process.env.PORT || 3001,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/log'
}

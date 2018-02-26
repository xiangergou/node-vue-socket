module.exports = function (app) {

  app.use('/api/signup', require('./signup'))
  app.use('/api/login', require('./login'))
  app.use('/api/logout', require('./logout'))
  app.use('/api/addFriend', require('./addFriend'))
  app.use('/api/getContact', require('./getContact'))

}

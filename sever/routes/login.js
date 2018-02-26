var express = require('express')
var router = express.Router()
var userHandler = require('../modelhandlers')

router.post('/', function (req, res, next) {
  var user = req.body
  userHandler.login(user, function(obj) {
    req.session.user = user
    res.json(obj)
  })
})

module.exports = router
var express = require('express')
var router = express.Router()
var userHandler = require('../modelhandlers')

router.post('/', function (req, res, next) {
  var user = req.body
  
  userHandler.addUser(user, function(obj) {
    // if (obj.status === 'ok') {
    // }
    res.json(obj)
  })
})

module.exports = router
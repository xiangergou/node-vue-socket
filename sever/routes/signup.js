var express = require('express')
var router = express.Router()
var userHandler = require('../modelhandlers')
var path = require('path')
var fs = require('fs')
var formidable = require('formidable')

router.post('/', function (req, res, next) {
  var uploadDir = '../static/img/'
  var form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  //文件的上传路径
  form.uploadDir = uploadDir
  //文件的后缀名
  form.extensions = true
  //文件的大小限制
  form.maxFieldsSize = 2 * 1024 * 1024

  form.parse(req, function (err, fields, files) {
   //fields上传的string类型的信息
   //files为上传的文件
    var username = fields.username
    var password = fields.password
    var file = files.avatar

    var oldpath = path.normalize(file.path)//返回正确格式的路径

    var newfilename = file.name
    var newpath = uploadDir + newfilename

    var useres={
     username: username,
     password: password
    }

    // 将老的图片路径改为新的图片路径
    fs.rename(oldpath, newpath, function(err){
      if (err) {
       console.error("头像上传失败" + err)
      } else {
        console.error("头像上传成功")
        useres.avatar = newpath
        userHandler.addUser(useres, function(obj) {
          res.json(obj)
        })
      }
    })
  })
})

module.exports = router
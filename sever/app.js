var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const config = require('./nodeConfig')
var path = require('path')
var routes = require('./routes')
const bodyParser = require('body-parser')
var cors = require('cors')
var cookieParser = require('cookie-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cookieParser());

app.use(cors()) // 跨域相关
routes(app) // 路由

server.listen(9001, function() {
  console.log('app listen 9001')
})

var onlineUsers = {} //在线用户
var onlineCount = 0  //在线用户人数
var lock = {}
var user = ''
io.on('connection', function (socket) {

  var toUser = {}
  var fromUser = {}
  var msg = ''
 
  socket.on('setName',function (username) {
    io.sockets.emit("open", username)
    if(!onlineUsers.hasOwnProperty(username)) {
        onlineUsers[username] = socket
        onlineCount = onlineCount + 1
    }
    user = username
    console.log('在线人数：',onlineCount)


    socket.on('sayTo',function (msgContent) {
      if (msgContent.currentChatWay === 'chatRoom') {
        io.sockets.emit("msgto", msgContent)
      } else if (msgContent.currentChatWay === 'userList') {
        var toUser = msgContent.toUser
        var fromUser = msgContent.fromUser
        if (toUser in onlineUsers) {
          onlineUsers[toUser].emit('to' + toUser, msgContent)
          onlineUsers[fromUser].emit('to' + fromUser, msgContent)
        }
      }


      // var toUser = data.to
      // var fromUser = data.from || 'ergou'
      // var msg = data.msg
      // if (toUser in onlineUsers) {
      //   onlineUsers[toUser].emit('to' + toUser, msg)
      //   // onlineUsers[fromUser].emit('to' + fromUser, msg)
      // } else {
      //   console.log(toUser + '不在线')
      //   // console.log('socket.id', socket.id)
      //   onlineUsers[fromUser].emit('to' + fromUser, msg)
      // }
    })
  })
  
})

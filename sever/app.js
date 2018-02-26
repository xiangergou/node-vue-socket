var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const session = require('express-session')
const MongoStore = require('connect-mongo')(session) // 将 session 存储于 mongodb
const flash = require('connect-flash')
const config = require('./nodeConfig')
var path = require('path')
var routes = require('./routes')
const bodyParser = require('body-parser')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var _ = require('underscore')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cookieParser());
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  }
  // store: new MongoStore({// 将 session 存储到 mongodb
  //   url: config.mongodb// mongodb 地址
  // })
}))

// flash 中间件，用来显示通知
app.use(flash())

// 处理表单及文件上传的中间件
// app.use(require('express-formidable')({
//   uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
//   keepExtensions: true// 保留后缀
// }))

app.use(cors()) // 跨域相关
routes(app) // 路由

// server.listen(9001, function() {
//   console.log('app listen 9001')
// })
server.listen(9001)



var onlineUsers = {} //在线用户
var onlineCount = 0  //在线用户人数
var lock = {}
var user = ''
io.on('connection', function (socket) {
  let id = socket.id
  io.sockets.emit("open", id)
  var toUser = {}
  var fromUser = {}
  var msg = ''

 
  // socket.on('sendMsg', function (data) {
  //   data.id = id
  //   io.sockets.emit("msgto", data)
  //   // io.sockets.socket(data.socketid).emit("msgto", data.obj)
  // })
  socket.on('setName',function (username) {
    console.log(username, 'wocaocaocaocao')
    if(!onlineUsers.hasOwnProperty(username)) {
        onlineUsers[username] = socket
        onlineCount = onlineCount + 1
    }
    user = username
    console.log('在线人数：',onlineCount)

    socket.on('sayTo',function (data) {
      var toUser = data.to
      var fromUser = data.from || 'ergou'
      var msg = data.msg
      if (toUser in onlineUsers) {
        onlineUsers[toUser].emit('to' + toUser, msg)
        // onlineUsers[fromUser].emit('to' + fromUser, msg)
      } else {
        console.log(toUser + '不在线')
        // console.log('socket.id', socket.id)
        onlineUsers[fromUser].emit('to' + fromUser, msg)
      }
    })
  })
  
})

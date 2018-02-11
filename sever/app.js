var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)


server.listen(9001)

// var chat = io.on('connection', onSocketConnected)

// function onSocketConnected(socket){
//    console.log("connected :"+socket.id)
// }

io.on('connection', function (socket) {
  let id = socket.id
  // socket.emit('open', id)
  io.sockets.emit("open", id)
  socket.on('sendMsg', function (data) {
    data.id = id
    io.sockets.emit("msgto", data)
    // io.sockets.socket(data.socketid).emit("msgto", data.obj)
  })
})

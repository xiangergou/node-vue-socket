import io from 'socket.io-client'
import webConfig from './webConfig.js'

const CHAT = {
  msgArr: [],
  submit: function (obj) {
    this.socket.emit('sendMsg', obj)
  },
  message: function () {
    this.socket.on('msgto', function (obj) {
      CHAT.msgArr.push(obj)
      console.log('CHAT.msgArr', obj)
    })
  },
  init: function (username) {
    this.socket = io.connect(webConfig.socket)
    this.socket.on('open', function (id) {
      console.log('已连接', id)
    })
  }
}
export default CHAT

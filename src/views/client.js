import io from 'socket.io-client'
import webConfig from './webConfig.js'

const CHAT = {
  msgArr: [],
  currentUser: '',
  submit: function (obj) {
    this.socket.emit('sendMsg', obj)
  },
  message: function () {
    this.socket.on('msgto', function (obj) {
      let msgObj = {}
      msgObj.user = obj.id
      msgObj.content = obj.msg
      msgObj.fromUser = obj.user
      CHAT.msgArr.push(msgObj)
    })
  },
  init: function (username) {
    this.socket = io.connect(webConfig.socket)
    this.socket.on('open', function (id) {
      console.log('已连接')
      CHAT.msgArr.push(id)
    })
  },
  setUser (user) {
    CHAT.currentUser = user
  }
}
export default CHAT

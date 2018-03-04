import io from 'socket.io-client'
import webConfig from './webConfig.js'

const CHAT = {
  msgArr: [],
  currentUser: '',
  submit: function (msgContent) {
    this.socket.emit('sayTo', msgContent)
  },
  message: function (msgWayData) {
    // 聊天室
    this.socket.on('msgto', function (obj) {
      let msgObj = {}
      // msgObj.user = obj.fromUser
      msgObj.content = obj.msg
      msgObj.fromUser = obj.fromUser
      msgObj.currentUserAva = obj.currentUserAva
      CHAT.msgArr.push(msgObj)
    })
    // 私聊
    this.socket.on('to' + msgWayData.currentUser, function (obj) {
      let msgObj = obj
      msgObj.content = obj.msg
      CHAT.msgArr.push(msgObj)
      console.log('CHAT.msgArr', msgObj)
    })
    this.socket.on('warning' + msgWayData.currentUser, function (warning) {
      console.log(warning)
      window.alert(warning)
    })
  },
  init: function (username) {
    this.socket = io.connect(webConfig.socket)
    this.socket.on('open', function (username) {
      console.log('已连接', username)
      CHAT.msgArr.push(username)
    })
  },
  setUser (user) {
    CHAT.currentUser = user
    this.socket.emit('setName', user)
  },
  sayTo (data) {
    this.socket.emit('sayTo', data)
  }
}
export default CHAT

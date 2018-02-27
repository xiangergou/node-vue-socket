import io from 'socket.io-client'
import webConfig from './webConfig.js'

const CHAT = {
  msgArr: [],
  currentUser: '',
  submit: function (msgContent) {
    // this.socket.emit('sendMsg', obj)
    // let data = {
    //   to: 'ergou',
    //   msg: obj.msg,
    //   from: CHAT.currentUser
    // }
    this.socket.emit('sayTo', msgContent)
  },
  message: function (msgWayData) {
    // if (msgWayData.currentChatWay === 'chatRoom') {

    // }
    this.socket.on('msgto', function (obj) {
      let msgObj = {}
      // msgObj.user = obj.fromUser
      msgObj.content = obj.msg
      msgObj.fromUser = obj.fromUser
      msgObj.currentUserAva = obj.currentUserAva
      CHAT.msgArr.push(msgObj)
    })
    // this.socket.on('to' + msgWayData.currentUser, function (obj) {
    //   console.log(obj, 'obj')
    //   CHAT.msgArr.push(obj)
    //   console.log('CHAT.msgArr', obj)
    // })
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
  // setName (user) {
  //   this.socket.emit('setName', user)
  // },
  sayTo (data) {
    // let data = {
    //   to: 'ergou',
    //   msg: data,
    //   from: CHAT.currentUser
    // }
    this.socket.emit('sayTo', data)
  }
}
export default CHAT

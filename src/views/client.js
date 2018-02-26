import io from 'socket.io-client'
import webConfig from './webConfig.js'

const CHAT = {
  msgArr: [],
  currentUser: '',
  submit: function (obj) {
    // this.socket.emit('sendMsg', obj)
    let data = {
      to: 'ergou',
      msg: obj.msg
    }
    this.socket.emit('sayTo', data)
  },
  message: function (username) {
    console.log(username, 'username')
    // this.socket.on('msgto', function (obj) {
    //   console.log(obj, 'obj')
    //   let msgObj = {}
    //   // msgObj.user = obj.id
    //   msgObj.content = obj
    //   // msgObj.fromUser = obj.user
    //   CHAT.msgArr.push(msgObj)
    // })
    this.socket.on('to' + username, function (obj) {
      console.log('dsadsadsadsad')
      console.log(obj, 'obj')
      CHAT.msgArr.push(obj)
      console.log('CHAT.msgArr', obj)
    })
  },
  init: function (username) {
    this.socket = io.connect(webConfig.socket)
    this.socket.on('open', function (id) {
      console.log('已连接', CHAT.currentUser)
      CHAT.msgArr.push(CHAT.currentUser)
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

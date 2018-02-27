'use strict'

const main = resolve => { require(['../views/main'], resolve) }
const chat = resolve => { require(['../views/main/chat'], resolve) }
const head = resolve => { require(['../views/main/head'], resolve) }
const userList = resolve => { require(['../views/main/userList'], resolve) }
const chatList = resolve => { require(['../views/main/chatList'], resolve) }
const chatRoom = resolve => { require(['../views/main/chatRoom'], resolve) }

const subSites = [{
  path: 'head',
  name: 'head',
  component: head
}, {
  path: 'head/userList',
  name: 'userList',
  component: userList
}, {
  path: 'head/chat',
  name: 'chat',
  component: chat
}, {
  path: 'head/chatList',
  name: 'chatList',
  component: chatList
}, {
  path: 'head/chatRoom',
  name: 'chatRoom',
  component: chatRoom
}]

module.exports = {
  name: 'main',
  path: '/main',
  component: main,
  redirect: '/main/head',
  children: subSites
}

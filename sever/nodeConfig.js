module.exports = {
  host: 'mongodb://localhost',
  database: 'chat-node-vue',
  port: 9001,
  session: {
    secret: 'mychat',
    key: 'mychat',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27018/chat-node-vue'
}
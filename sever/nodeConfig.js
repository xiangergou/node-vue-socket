module.exports = {
  host: 'mongodb://localhost',
  database: 'mychat',
  port: 9001,
  session: {
    secret: 'mychat',
    key: 'mychat',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27018/mychat'
}
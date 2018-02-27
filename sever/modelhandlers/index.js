var User = require('../models/user')

var userHandler = {
  addUser: function addUser(user, callback) {
    User.getUser(user, function(err, data) {
      if (err) {
        return callback({
          status: 'err',
          success: false,
          msg: '服务器错误'
        })
      } else if (data) {
        return callback({
          status: 'err',
          success: false,
          msg: '用户名已被占用！'
        })
      } else {
        let userModel = new User(user)
        userModel.save(user, function(err, u) {
          if (err) {
            return callback({
              status: 'err',
              success: false,
              msg: '服务器错误'
            })
          } else {
            return callback({
              status: 'ok',
              success: true,
              msg: '注册成功',
              data: u
            })
          }
        })
      }
    })
  },

  login: function(user, callback) {
    if(!user.username || !user.password) {
      return callback({
        status: 'ERROR',
        data: { user: null },
        msg: '请输入用户名密码'
      })
    } else {
      User.getUser(user, function(err, u) {
        if(err) {
          return callback({status: 'ERROR',meta: 'user',data: {user: null},msg: '服务器出错',success :false})
        } else if (!u) {
          return callback({status: 'ERROR',meta: 'user',data: {user: null},msg: '没有该用户',success :false})
        } else if (u.password !== user.password) {
          return callback({status: 'ERROR',meta: 'user',data: {user: null},msg: '请输入正确密码',success :false})
        } else {
          return callback({status: 'OK',meta: 'user',data: {user: u},msg: '登陆验证成功', success: true})
        }
      })
    }
  },

  addFriend: function(user, callback) {
    User.getUser(user, function(err, data) {
      if (err) {
        return callback({
          status: 'err',
          success: false,
          msg: '服务器错误'
        })
      } else if (data) {
        User.addFriend(user, function(err, data) {
          if (err) {
            return callback({
              status: 'err',
              success: false,
              msg: '服务器错误2'
            })
          }
          return callback({
            status: 'ok',
            success: true,
            msg: '添加成功',
            data: data
          })
        })
      } 
    })
  },

  getContact: function (user, callback) {
    User.getUser(user, function(err, data) {
      if (err) {
        return callback({
          status: 'err',
          success: false,
          msg: '服务器错误'
        })
      }
      return callback({
        status: 'ok',
        success: true,
        data: data.friendslist
      })
    })
  }
}

module.exports = userHandler

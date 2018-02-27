const mongoose = require('../lib/db')

const UserSchema = mongoose.Schema({
  username: { type: 'string', required: true },
  password: { type: 'string', required: true },
  friendslist: Array,
  avatar: { type: 'string', required: false }
})

var UserModule = mongoose.model('UserModule', UserSchema)

function User(user) {
  this.username = user.username
  this.password = user.password
  this.friendslist = user.friendslist
  this.avatar = user.avatar
}

User.prototype.save = function(user, callback) {
  var user = {
    username: this.username,
    password: this.password,
    avatar: this.avatar
  }
  var newUser = new UserModule(user)
  newUser.save(function (err, user) {
    if (err) {
      return callback(err)
    }
    return callback(null, user)
  })
}

User.getUser = function (username, callback) {
  UserModule.findOne({username: username}, ((err, data) => {
    if (err) {
      return callback(err)
    } else {
      return callback(null, data)
    }
  }))
}

User.addFriend = function (addData, currentUser, callback) {
  UserModule.update({
    username: currentUser
  }, {
    // $unset: {
    //   "friendslist": []
    // }
    $push:{
      friendslist: addData
    }
  }, ((err, u) => {
    if (err) {
      return callback(err)
    } else {
      return callback(null, addData)
    }
  }))
}

module.exports = User

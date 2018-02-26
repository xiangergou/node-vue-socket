const mongoose = require('../lib/db')

const UserSchema = mongoose.Schema({
  username: { type: 'string', required: true },
  password: String,
  friendslist: Array,
  avatar: String
})
// UserSchema.index({ username: 1 }, { unique: true }).exec()

var UserModule = mongoose.model('UserModule', UserSchema)

function User(user) {
  this.username = user.username
  this.password = user.password
  this.friendslist = user.friendslist
  this.avatar = user.avatar || ''
}

User.prototype.save = function(user, callback) {
  var user = {
    username: this.username,
    password: this.password
  }
  var newUser = new UserModule(user)
  newUser.save(function (err, user) {
    if (err) {
      return callback(err)
    }
    return callback(null, user)
  })
}

User.getUser = function (user, callback) {
  UserModule.findOne({username: user.username}, ((err, data) => {
    if (err) {
      return callback(err)
    } else {
      return callback(null, data)
    }
  }))
}

User.addFriend = function (user, callback) {
  UserModule.update({
    username: user.username
  }, {
    // $unset: {
    //   "friendslist": []
    // }
    $push:{
      friendslist: user.friendName
    }
  }, ((err, u) => {
    if (err) {
      return callback(err)
    } else {
      return callback(null, user.username)
    }
  }))
}

module.exports = User

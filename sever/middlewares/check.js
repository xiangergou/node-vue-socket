module.exports = {
  checkLogin: function checkLogin (req, res, next) {
    console.log(req.session)
    if (!req.session.user) {
      console.log('error', '未登录')
      req.flash('error', '未登录')
      return false
      // return res.redirect('/signin')
    }
    next()
  },

  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      console.log('error', '已登录')
      req.flash('error', '已登录')
      return false
      // return res.redirect('back')// 返回之前的页面
    }
    next()
  }
}
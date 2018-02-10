
const root = {
  path: '',
  redirect: '../login'
}

const login = {
  path: '/login',
  name: 'login',
  component: resolve => { require(['../views/login'], resolve) }
}
const routes = [
  root,
  login,
  require('./main'),
  {
    path: '*',
    redirect: ''
  }
]

module.exports = routes

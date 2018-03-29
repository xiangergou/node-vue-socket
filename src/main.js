// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import routes from './router'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min' // 不能与flexbile共用
import * as mutTypes from './store/mutation-types'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import 'lib-flexible/flexible'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueCookie)
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history' // 去掉地址中的'#' 以便接受微信登录授权回调参数
})

// 随机生成用户名(无需注册登录操作的聊天室专用)
// let randomUser = Math.random().toString(36).substr(2)
// store.commit(mutTypes.RANDOM_USER, randomUser)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  watch: {
    '$route': 'checkLogin'
  },
  // 进入页面时
  mounted () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      NProgress.start()
      // cookie操作方法在源码里有或者参考网上的即可
      if (!this.$cookie.get('user')) {
        // 如果没有登录状态则跳转到登录页
        this.$router.push('/login')
        NProgress.done()
      } else {
        let userCookie = this.$cookie.get('user')
        store.commit(mutTypes.COOKIE_USER, userCookie)
        this.$router.push('/main/head')
        NProgress.done()
        // store.commit(mutTypes.RANDOM_USER, userCookie)
        // 否则跳转到登录后的页面
        // this.$router.push('/user_info');
      }
    }
  }
})

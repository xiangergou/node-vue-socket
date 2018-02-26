<template>
  <div class="container">
    <form class="form-horizontal" role="form">
      <legend class="text-center">{{title}}
        <span class="col-md-2 col-md-offset-1 right" style="color: red">{{user}}</span>
        <button class="btn btn-group" style="float:right" type="button" @click="logout">登出</button>
      </legend>
       <div class="form-group">
          <label for="ds_host">Username</label>
          <input class="form-control" id="ds_host" type="text" v-model="username" placeholder="Enter Username"/>
       </div>
       <div class="form-group">
          <label for="ds_name">password</label>
          <input class="form-control" id="ds_name" type="text" v-model="password" placeholder="password"/>
       </div>
       <div class="form-group">
         <label for="inputfile">上传头像</label>
           <input type="file" class="" id="inputfile" v-on:change="fileChange">
       </div>
       <button class="btn form-control" @click="submit" type="button">提交</button>
       <span class="form-control tips" @click="switchMenu"> {{switchName}} </span>
    </form>
  </div>
</template>
<script>
import CHAT from './client'
const signButton = '老夫且先注册个'
const loginButton = '待朕前去登录'

export default {
  data () {
    return {
      username: '',
      password: '',
      isLogin: true,
      user: '',
      avater: ''
    }
  },
  computed: {
    switchName () {
      return (this.isLogin ? signButton : loginButton)
    },
    title () {
      return (this.isLogin ? 'login' : 'signup')
    }
  },
  methods: {
    switchMenu () {
      this.isLogin = !this.isLogin
    },
    submit () {
      this.isLogin ? this.login() : this.signup()
    },
    fileChange (e) {
      this.avater = e
      console.log(e)
    },
    signup () {
      let params = {
        username: this.username,
        password: this.password
      }
      this.$http.post('http://127.0.0.1:9001/api/signup', params).then((res) => {
        window.alert('注册成功！')
        this.isLogin = true
      }).catch((err) => {
        console.log(err, 'err')
      })
    },
    login () {
      let params = {
        username: this.username,
        password: this.password
      }
      let self = this
      this.$http.post('http://127.0.0.1:9001/api/login', params).then((res) => {
        self.user = res.body.data.user.username
        self.$cookie.set('user', self.user, 1)
        CHAT.setName(self.user)
        self.$router.push('head')
      }).catch((res) => {
      })
    },
    logout () {
      this.$http.post('http://127.0.0.1:9001/api/logout').then((res) => {
        window.alert('登出成功！')
      }).catch((res) => {
      })
    }
  }
}
</script>

<style lang="css" scoped="">
.form-horizontal{
  padding: 100px 0;
  box-sizing: border-box;
}
fieldset{
  margin: 0 auto;
  display: block;
  width: auto;
}
.btn{
  color: #fff;
  background-color: #da2b65;
}
.tips{
  border: none;
  text-align: right;
  color: #da2b65;
}
</style>

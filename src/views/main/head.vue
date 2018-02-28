<template>
  <div class="container-fluid">
    <div class="container-left">
      <header class="container-left-tab">
        <img :src="currentUserAavatar" alt="">
        <strong>{{username || '未登录'}}</strong>
        <span class="nav-font" @click="addContact">
          <i class="iconfont">&#xe623;</i>
        </span>
        <div class="add-contact" v-show="isShowaddPrompt">
          <label for="" class="label-default">添加好友</label>
          <input type="text" class="" v-model="friendName">
          <button class="btn" @click="addFriend">添加</button>
        </div>
        <p>双目失明，丝毫不影响我带崩三路</p>
        <div class="index-foot">
          <!-- 不知道为什么,用列表渲染，icon会出bug -->
         <!--  <ul>
            <li v-for="(item, index) in iconArr" :key="item">
              <i class="iconfont">{{item}}</i>
            </li>
          </ul> -->
          <span :class="{'active': currentView == 'chatList'}" @click="toggleTabs('chatList')">
            <i class="iconfont">&#xe624;</i>
          </span>
          <span :class="{'active': currentView == 'userList'}" @click="toggleTabs('userList')">
            <i class="iconfont">&#xe783;</i>
          </span>
          <span :class="{'active': currentView == 'chatRoom'}" @click="toggleTabs('chatRoom')">
            <i class="iconfont">&#xe628;</i>
          </span>
        </div>
      </header>
      <article class="container-left-userlist">
         <component :is="currentView" keep-alive :username="username"></component>
      </article>
    </div>
    <div class="container-right">
        <chat :currentChatWay="currentChatWay"></chat>
    </div>
  </div>
</template>

<script>
import userList from './userList'
import chat from './chat'
import chatList from './chatList'
import chatRoom from './chatRoom'
import CHAT from '../client'
import eventVue from '../../utils/eventVue'

export default {
  name: 'chat-header',
  data () {
    return {
      currentView: 'chatRoom',
      currentUser: '',
      isShowaddPrompt: false,
      username: '',
      friendName: '',
      avatar: '',
      currentUserAavatar: null,
      currentChatWay: 'chatRoom'
      // iconArr: ['&#xe624;', '&#xe783;', '&#xe628;']
    }
  },
  components: {
    userList,
    chat,
    chatList,
    chatRoom
  },
  computed: {
  },
  methods: {
    toggleTabs (routeName) {
      this.currentView = routeName
      this.currentChatWay = routeName
    },
    addContact () {
      this.isShowaddPrompt = !this.isShowaddPrompt
    },
    addFriend () {
      let params = {
        friendName: this.friendName,
        currentUser: this.username
      }
      let self = this
      self.$http.post('http://127.0.0.1:9001/api/addFriend', params).then((res) => {
        if (res.body.success) {
          alert('添加成功')
          self.isShowaddPrompt = false
          eventVue.$emit('addFriendSuccess', self.isShowaddPrompt)
          // self.$router.push('head')
        } else {
          alert(res.body.msg)
        }
      })
    }
  },
  mounted () {
    this.currentUser = JSON.parse(this.$store.state.cookieUser)
    this.username = JSON.parse(this.$store.state.cookieUser).username
    this.currentUserAavatar = this.currentUser.avatar
    CHAT.setUser(this.username)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/main.scss';

  .index-foot .active{
    color: $activecolor !important;
  }
</style>
<style lang="css" scoped="">
  .container-fluid{
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .container-left{
    width: 280px;
    float: left;
    background-color: #292c31;
  }
  header{
    width:100%;
    height: 180px;
    background: #292c31;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 9999;
  }
  header strong{
    color: #fff;
  }
  header img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  .nav-font{
    position: relative;
    float:right;
    cursor: pointer;
  }
  .nav-font .iconfont{
    color: #9b9b9b;
  }
  header p{
    font-size: 14px;
    color: #9b9b9b;
    margin-top: 5px;
  }
  .index-foot{
    display: flex;
    height: auto;
    padding: none;
    width: 100%;
    float: left;
    box-sizing: border-box;
  }
  .index-foot span{
    display: inline-block;
    flex: 1;
    height: 100%;
    padding: 20px;
    cursor: pointer;
    box-sizing: border-box;
    color: #9b9b9b;
  }
  .index-foot .iconfont{
    font-size: 30px;
  }
  .add-contact{
    position: absolute;
    right: 1%;
    top:30%;
    background-color: #f4f4f4;
    /*width: 18%;*/
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .add-contact label{
    display: block;
    text-align: center;
    font-size: 14px;
  }
  .add-contact input{
    margin-top: 10px;
    border:none;
    border-radius: 5px;
    width: 75%;
    outline:medium;
    padding: 0 5px;
    box-sizing: border-box;
  }
  .add-contact button{
    margin-left: 10px;
    padding: 0 8px;
    box-sizing: border-box;
    background-color: #da2b65;
    color: #fff;
    font-size: 13px;
  }
  .container-left-userlist{
    position: absolute;
    height: 100%;
    top: 0;
    padding-top: 180px;
    width: 280px;
    background-color: #292c31;
    float: left;
    color: #fff;
    font-weight: lighter;
  }
</style>

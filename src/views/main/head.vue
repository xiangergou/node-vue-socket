<template>
  <div class="container-fluid">
    <div class="container-left">
      <header class="container-left-tab">
        <img src="../../assets/logo.png" alt="">
        <strong>向二狗</strong>
        <span class="nav-font" @click="addContact">
          <i class="iconfont">&#xe623;</i>
        </span>
        <div class="add-contact" v-show="isShowaddPrompt">
          <label for="" class="label-default">添加好友</label>
          <input type="text" class="">
          <button class="btn">添加</button>
        </div>
        <p>双目失明，丝毫不影响我带崩三路</p>
        <div class="index-foot">
          <!-- 不知道为什么,用列表渲染，icon会出bug -->
         <!--  <ul>
            <li v-for="(item, index) in iconArr" :key="item">
              <i class="iconfont">{{item}}</i>
            </li>
          </ul> -->
          <span :class="{'active': currentView == 'userList'}" @click="toggleTabs('userList')">
            <i class="iconfont">&#xe624;</i>
          </span>
          <span :class="{'active': currentView == 'chat'}" @click="toggleTabs('chat')">
            <i class="iconfont">&#xe783;</i>
          </span>
          <span>
            <i class="iconfont">&#xe628;</i>
          </span>
        </div>
      </header>
      <article class="container-left-userlist">
         <component :is="currentView" keep-alive></component>
      </article>
    </div>
    <div class="container-right">
        <chat></chat>
    </div>
  </div>
</template>

<script>
import userList from './userList'
import chat from './chat'

export default {
  name: 'chat-header',
  data () {
    return {
      currentView: 'userList',
      isShowaddPrompt: false
      // iconArr: ['&#xe624;', '&#xe783;', '&#xe628;']
    }
  },
  components: {
    userList,
    chat
  },
  methods: {
    toggleTabs (routeName) {
      this.currentView = routeName
    },
    addContact () {
      this.isShowaddPrompt = !this.isShowaddPrompt
    }
  },
  mounted () {
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
  }
  .container-left{
    width: 280px;
    float: left;
    background-color: #292c31;
  }
  header{
    width:100%;
    height: 25vh;
    background: #292c31;
    padding: 20px 10px;
    box-sizing: border-box;
    position: relative;
  }
  header strong{
    color: #fff;
  }
  header img{
    width: 40px;
    height: 40px;
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
    width: 100%;
    height: 75vh;
    background-color: #292c31;
    float: left;
    color: #fff;
    font-weight: lighter;
  }
</style>

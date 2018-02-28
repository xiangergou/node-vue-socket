<template>
  <div>
    <span>{{chat}} <button class="btn btn-group return" type="button" @click="logout">退出</button></span>
    <hr style="width: 100%">
    <div class="chat-content">
      <ul id="chatContainer">
        <li v-for="item in CHAT.msgArr" :key="item.id">
          <p v-show="typeof(item) !== 'object' ">欢迎 <i style="color: red">{{item}}</i> 来到聊天室</p>
          <div class="self-speak" v-if="(item.fromUser === currentUser)">
              <p class="content">
                <i>{{item.fromUser}}</i>
                <em v-show="item.content" class="box box-right">{{item.content}}</em>
              </p>
              <strong v-show="item.fromUser">
                <img :src="item.currentUserAva" alt="">
              </strong>
          </div>
          <div v-else class="othsers-speak">
              <strong v-show="item.fromUser">
                <img :src="item.currentUserAva" alt="">
              </strong>
              <p class="content">
                <i>{{item.fromUser}}</i>
                <em v-show="item.content" class="box box-left">{{item.content}}</em>
              </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="msgedit">
      <textarea name="" id="" cols="" rows="" autocomplete="off" placeholder="take your message and send by Enter" v-model="msg"  @keyup="sendMessage()"></textarea>
    </div>
  </div>
</template>

<script>
import CHAT from '../client'
import eventVue from '../../utils/eventVue'

export default {
  name: 'chat',
  components: {},
  data () {
    return {
      msg: '',
      socket: null,
      chatList: [],
      CHAT,
      currentUser: this.$store.state.currentUser,
      currentUserAavatar: '',
      toUser: ''
    }
  },
  props: {
    currentChatWay: ''
  },
  computed: {
    chatData () {
      return CHAT.msgArr
    },
    chat () {
      return (this.currentChatWay === 'chatRoom' ? '此乃聊天室也' : this.currentChatWay === 'userList' ? (this.toUser || '私聊') : '群聊')
    }
  },
  watch: { // 动态添加数据,滚动条滚动到底部问题
    chatData () {
      this.$nextTick(() => {
        let list = this.$el.querySelector('#chatContainer')
        list.scrollTop = list.scrollHeight
      })
    }
  },
  methods: {
    sendMessage (e) {
      var et = e || window.event
      var keycode = et.charCode || et.keyCode
      if (keycode === 13 && keycode) {
        if (window.event) {
          window.event.returnValue = false
        } else {
          e.preventDefault()
        }
        var msgContent = {
          msg: this.msg,
          fromUser: this.currentUser,
          currentChatWay: this.currentChatWay,
          toUser: this.toUser,
          currentUserAva: this.currentUserAavatar
        }
        CHAT.submit(msgContent)
        this.msg = ''
      }
    },
    logout () {
      this.$cookie.delete('user')
      alert('登出成功')
      this.$router.push('/login')
    }
  },
  mounted () {
    CHAT.init()
    let user = JSON.parse(this.$store.state.cookieUser)
    this.currentUser = user.username
    this.currentUserAavatar = user.avatar
    let msgWayData = {
      currentUser: this.currentUser,
      currentChatWay: this.currentChatWay
    }
    CHAT.message(msgWayData)
    eventVue.$on('talkto', (username) => {
      this.toUser = username
      this.CHAT.msgArr = []
    })
  }
}
</script>

<style lang="css" scope>
  ::-webkit-scrollbar {display:none}
  #chatContainer{
    height: 100%;
    overflow-y: scroll;
  }
   .container-right{
    /*width: 80%;*/
    margin-left: 280px;
    height: 100%;
    background-color: #f1f1f1;
    position: relative;
  }
  .container-right span{
    display: block;
    text-align: center;
    padding: 3vh;
    box-sizing: border-box;
  }
  .container-right hr{
    height: 0;
    margin: 0;
  }
  .container-right .msgedit{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f1f1f1;
    box-sizing: border-box;
  }
  .msgedit textarea{
    width: 100%;
    height: 30vh;
    border: none;
    background-color: #f1f1f1;
    border-top: 1px solid #ccc;
    outline:medium;
    padding: 10px;
    box-sizing: border-box;
  }
   .chat-content{
    /*padding: 10px;*/
    box-sizing: border-box;
    height: 60vh;
    overflow-y: scroll;
   }
   .chat-content p{
    text-align: center;
    margin-bottom: 20px;
   }
   .chat-content ul{
    list-style: none;
    width: 100%;
    padding: 0;
   }
   .chat-content ul li{
    text-align: left;
    margin: 10px 0;
    padding: 0 10px;
   }
   .chat-content ul li em{
    font-style: normal;
    font-size: 15px;
   }
   .self-speak{
    text-align: right;
   }
   .self-speak strong{
    display: inline-block;
    /*float: right;*/
   }
  .box{
    color: #fff;
    font-size: 14px;
    position: relative;
    padding: 5px 10px;
    background: #da2b65;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }
  .box:before{
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    top: 4px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  .box-left{
    top: 5px;
    left: 10px;
  }
  .box-left:before{
    right: 100%;
    border-right: 13px solid #da2b65;
  }
  .box-right{
    top: 5px;
    right: 10px;
  }
  .box-right:before{
    left: 100%;
    border-left: 13px solid #da2b65;
  }
  .return{
    margin-right: 20px;
    float: right;
    color: #fff;
    background-color: #da2b65;
  }
  .chat-content img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-right: 14px;
    display: inline-block;
  }
  .content{
    display: inline-block;
    padding: 0;
  }
  .content i{
    display: block;
    font-size: 15px;
    font-style: normal;
    color: #9b9b9b;
  }
  .self-speak img{
    float: right;
  }
  .othsers-speak img{
    float: left;
  }
</style>

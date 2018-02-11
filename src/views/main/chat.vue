<template>
  <div>
    <span>title</span>
    <hr style="width: 100%">
    <div class="chat-content">
      <ul id="chatContainer">
        <li v-for="item in CHAT.msgArr" :key="item.id">
          <p v-show="typeof(item) !== 'object' ">欢迎 <i style="color: red">{{item}}</i> 来到聊天室</p>
          <div class="self-speak" v-if="(item.fromUser === currentUser)">
              <em v-show="item.content" class="box box-right">{{item.content}}</em>
              <strong v-show="item.user">: {{item.user}}</strong>
          </div>
          <div v-else class="othsers-speak">
              <strong v-show="item.user">{{item.user}}: </strong>
              <em v-show="item.content" class="box box-left">{{item.content}}</em>
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

export default {
  name: 'chat',
  components: {},
  data () {
    return {
      msg: '',
      socket: null,
      chatList: [],
      CHAT,
      currentUser: this.$store.state.currentUser
    }
  },
  computed: {
    chatData () {
      return CHAT.msgArr
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
          user: this.$store.state.currentUser
        }
        CHAT.submit(msgContent)
        this.msg = ''
      }
    }
  },
  mounted () {
    CHAT.init()
    CHAT.message()
    CHAT.setUser(this.$store.state.currentUser)
  }
}
</script>

<style lang="css">
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
    padding: 20px 10px;
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
   }
   .chat-content ul li{
    text-align: left;
    margin: 30px 0;
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
    top:10px;
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
    top: 5px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  .box-left{
    left:20px;
  }
  .box-left:before{
    right: 100%;
    border-right: 13px solid #da2b65;
  }
  .box-right{
    right: 20px;
  }
  .box-right:before{
    left: 100%;
    border-left: 13px solid #da2b65;
  }
</style>

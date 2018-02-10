<template>
  <div>
    <span>title</span>
    <hr style="width: 100%">
    <div class="chat-content">
      <ul>
        <li v-for="item in CHAT.msgArr" :key="item.id">
          <em>{{item}}</em>
        </li>
      </ul>
    </div>
    <div class="msgedit">
      <textarea name="" id="" cols="" rows="" autocomplete="off" placeholder="take your message and send by Enter" v-model="msg"  @keyup="sendMessage()"></textarea>
      <!-- <button class="btn btn-danger"  @click="sendMessage">send</button> -->
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
      CHAT
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
        CHAT.submit(this.msg)
        this.msg = ''
      }
    }
  },
  mounted () {
    CHAT.init()
    CHAT.message()
  }
}
</script>

<style lang="css">
   .container-right{
    width: 80%;
    float: left;
    height: 100%;
    background-color: #ddd;
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
    height: 30vh;
    background-color: #d8d8d8;
    box-sizing: border-box;
  }
  .msgedit textarea{
    width: 100%;
    height: 23vh;
    border: none;
    background-color: #d8d8d8;
    border-top: 1px solid #ccc;
    outline:medium;
    padding: 10px;
    box-sizing: border-box;
  }
   .msgedit  button{
    float: right;
    margin-right: 30px;
    padding: 4px 14px;
    box-sizing: border-box;
   }
   .chat-content{
    padding: 10px;
    box-sizing: border-box;
    height: 60vh;
    overflow-y: scroll;
   }
   .chat-content ul{
    list-style: none;
    width: 100%;
   }
   .chat-content ul li{
    text-align: left;
    margin-top: 15px;
   }
   .chat-content ul li em{
    font-style: normal;
      padding: 5px 10px;
      box-sizing: border-box;
      background-color: #96e350;
      border-radius: 10px;
   }
</style>

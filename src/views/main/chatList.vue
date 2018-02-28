<template>
  <div class="container-fluid-chatlist">
    <ul class="chat-ul" @click="talkto">
      <li>
        <div class="avater">
          <img src="../../assets/logo.jpeg" alt="">
        </div>
        <div class="msg">
          <p>name <em>time</em></p>
          <span>msg</span><br>
          <strong>ps: 此组件本预留消息列表，然做至彼时发觉此处意义已然不大,遂留空，有缘再续。</strong>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'chatList',
  components: {},
  data () {
    return {
      rev: ''
    }
  },
  methods: {
    talkto () {
      console.log('talk to other')
    }
  },
  mounted () {
  }
}
</script>

<style lang="css" scoped>
  .container-fluid-chatlist{
    width: 100%;
    color: #fff;
  }
  .chat-ul{
    width: 100%;
    list-style: none;
    height: 40px;
    padding: 0;
  }
  .chat-ul li{
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #d5265a;
    cursor: po
  }
  .chat-ul .avater{
    flex: 1;
  }
  .chat-ul .msg{
    flex: 7;
  }
  .avater img{
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  .msg{
    padding: 0px 10px;
    box-sizing: border-box;
  }
  .msg p{
    margin: 0;
  }
  .msg p em{
    float: right;
    font-style: normal;
    color: #9b9b9b;
  }
  .msg span{
    color: #9b9b9b;
  }
</style>

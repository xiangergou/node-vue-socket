<template>
  <div class="container-fluid-chatlist">
    <ul class="chat-ul" @click="talkto">
      <p>此乃聊天室也</p>
      <li>
        <div class="avater">
          <img src="../../assets/logo.jpeg" alt="">
        </div>
        <div class="msg">
          <p>聊天室 <em>{{time}}</em></p>
          <!-- <span>msg</span> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'chatRoom',
  components: {},
  data () {
    return {
      rev: ''
    }
  },
  methods: {
    talkto () {
      console.log('talk to other')
    },
    getNowFormatDatetwo () {
      var date = new Date()
      var seperator1 = '/' // 设置成自己想要的日期格式 年/月/日
      var seperator2 = ':' // 设置成自己想要的时间格式 时:分:秒
      var month = date.getMonth() + 1 // 月
      var strDate = date.getDate() // 日
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
      return currentdate
    }
  },
  computed: {
    time () {
      return this.getNowFormatDatetwo()
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
    cursor: pointer;
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
    font-size: 12px;
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

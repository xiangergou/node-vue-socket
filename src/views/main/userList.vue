<template>
  <div class="container-fluid-chatlist">
    <ul class="chat-ul">
      <li v-for="(item, index) in contacts" :key="index" :class="{'active': index === selectedList}" @click="talkto(index, item)">
        <div class="avater">
          <img :src="item.avatar" alt="">
        </div>
        <div class="msg">
          <p>{{item.username}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import eventVue from '../../utils/eventVue'

export default {
  name: 'userList',
  components: {},
  props: {
    // username: ''
  },
  data () {
    return {
      contacts: [],
      selectedList: null,
      username: ''
    }
  },
  methods: {
    talkto (index, item) {
      this.selectedList = index
      console.log('talk to ' + item.username)
      eventVue.$emit('talkto', item.username)
    },
    getContacts () {
      let params = {
        username: this.username
      }
      this.$http.post('http://127.0.0.1:9001/api/getContact', params).then((res) => {
        if (res.body.success) {
          if (res.body.data && res.body.data.friendslist.length >= 1) {
            this.contacts = res.body.data.friendslist.reverse()
          }
        }
      })
    }
  },
  mounted () {
    this.username = JSON.parse(this.$store.state.cookieUser).username
    this.getContacts()
    eventVue.$on('addFriendSuccess', (addFlag) => {
      if (!addFlag) {
        this.getContacts()
      }
    })
  }
}
</script>

<style lang="css" scoped>
  .container-fluid-chatlist{
    width: 100%;
    height: 90%;
    color: #fff;
    overflow-y: scroll;
  }
  .chat-ul{
    width: 100%;
    list-style: none;
    height: 40px;
    padding: 0;
  }
  .chat-ul li{
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #d5265a;
    cursor: pointer;
  }
  .chat-ul li:last-child{
    border-bottom: none
  }
  .chat-ul .avater{
    flex: 1;
  }
  .chat-ul .msg{
    flex: 7;
  }
  .avater img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  .msg{
    padding: 0px 20px;
    padding-top: 5px;
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
  .active{
    background-color: #efefef;
    color: #000;
  }
</style>

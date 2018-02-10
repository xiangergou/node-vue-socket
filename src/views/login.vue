<template>
  <div class="container">
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'helloworld',
  components: {},
  data () {
    return {
      rev: ''
    }
  },
  mounted () {
  }
}
</script>

<style lang="css">
  .container {
    width: 100%;
    height: 100%;
    font-size: 10px;
    background-color: #f4f4f4;
  }
</style>

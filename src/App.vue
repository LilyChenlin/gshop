<template>
  <div id="app">
   <router-view></router-view>
   <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
// 引入底部组件
import FooterGuide from './components/FooterGuide/FooterGuide.vue';
import {reqCategorys} from './api/index'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  async mounted () {
    // 通过this.$store.dispatch 方法触发调用Action
    // this.$store.dispatch('getAddress')
    this.getAddress()
    this.getUserInfo()
  },

  //注册组件
  components: {
    FooterGuide
  },
  methods:{
    ...mapActions(['getAddress','getUserInfo'])
  }
}
</script>

<style>

</style>

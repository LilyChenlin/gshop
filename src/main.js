// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//引入fastClick 库
import FastClick from 'fastclick';
FastClick.attach(document.body);

//引入mint-ui的标签组件库
import {Button} from 'mint-ui'
Vue.component(Button.name,Button)

//引入mock模拟数据
import './mock/mockServer.js'

// 引入自定义过滤器 加载
import './filters'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  
})

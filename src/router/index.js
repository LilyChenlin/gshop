import Vue from 'vue'
import Router from 'vue-router'

//引入路由组件文件夹下的组件
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter:true
      }
    },
    {
      path: '/Profile',
      component: Profile,
      meta: {
        showFooter:true
      }
    },
    {
      path:'/',
      redirect: '/msite'
    },
    {
      path:'/login',
      component:Login 
    }
  ]
})

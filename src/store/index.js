import Vue from 'vue'
import Vuex from 'vuex'


//  引入四个基本模块
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//声明使用插件
Vue.use(Vuex)

// 把store对象提供给“store”选项，这可以把store的实例注入到所有的子组件
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
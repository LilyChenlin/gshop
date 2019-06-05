import {reqAddress,reqCategorys,reqShops} from '../api/index'
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS} from './mutations-type'

export default {
    //异步获取地址
    async getAddress ({commit,state}) {
        // 从state状态中获取到经纬度用来设置reqAddress的参数
        const geohash = state.latitude + ',' + state.longitude

        // 1.发送异步ajax请求
        const result = await reqAddress(geohash)
        
        // 2.根据结果提交一个mutation
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, {address})
        }
    
    },

    //异步获取分类列表
    async getCategorys ({commit}) {
        const result = await reqCategorys()
        commit(RECEIVE_CATEGORYS,{categorys : result.data})
    },

    //异步获取商家列表
    async getShops ({commit,state}) {
        //对象的解构赋值
        const {latitude,longitude} = state

        //注意参数的顺序
        const result = await reqShops({latitude,longitude})

        commit(RECEIVE_SHOPS,{shops : result.data})
    }
}
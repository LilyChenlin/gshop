import {reqAddress,reqCategorys,reqShops,reqUserInfo,reqLogout, reqShopInfo, reqShopGoods, reqShopRatings} from '../api/index'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART

} from './mutations-type'

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
    },
    //同步记录登录用户信息
    recordUser ({commit},userInfo) {
        commit(RECEIVE_USER_INFO,{userInfo})
    },
    //异步获取用户信息
    async getUserInfo ({commit}) {
        const result = await reqUserInfo()
        //成功
        if (result.code === 0) {
            const userInfo = result.data
            commit(RECEIVE_USER_INFO,{userInfo})
        }
    },

    //异步退出
    async logout ({commit}) {
        const result = await reqLogout()
        //代表已经登录了
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },

    //异步获取商家信息
    async getShopInfo({commit}) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO,{info})
        }
    },
    //异步获取商家商品数组
    async getShopGoods ({commit},callback) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS,{goods})

            //数据更新 通知组件 
            callback && callback()
        }
    },
    //异步获取商家评论
    async getShopRatings ({commit}) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS,{ratings})
        } 
    },

    //同步更新food中的count值
    updateFoodCount ({commit},{isAdd,food}) {
        if (isAdd) {
            commit(INCREMENT_FOOD_COUNT,{food})
        } else {
            commit(DECREMENT_FOOD_COUNT,{food})
        }
    },
    clearCart ({commit}) {
        commit (CLEAR_CART)
    }

}
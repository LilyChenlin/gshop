import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATINGS
} from './mutations-type'

// [方法名](state,{param}){}
export default {
    [RECEIVE_ADDRESS] (state,{address}) {
        state.address = address
    },
    [RECEIVE_CATEGORYS] (state,{categorys}) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS] (state,{shops}) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO] (state,{userInfo}) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO] (state) {
        state.userInfo = {}
    },
    [RECEIVE_INFO] (state,{info}) {
        state.info = info
    },
    [RECEIVE_RATINGS] (state,{ratings}) {
        state.rating = ratings
    },
    [RECEIVE_GOODS] (state,{goods}) {
        state.goods = goods
    }
}
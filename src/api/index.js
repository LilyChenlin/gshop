import ajax from './ajax'

// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

/**
 * 根据经纬度获取位置详情
 * 举例请求URL
 * http://localhost:3000/position/40.10038,116.36867
 */

export const reqAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`) 

/**
 * 获取食品分类列表
 * 举例请求URL
 * http://localhost:3000/index_category
 */

 export const reqCategorys = () => ajax(BASE_URL + '/index_category')

/**
 * 根据经纬度获取商铺列表
 * http://localhost:3000/shops?latitude=40.10038&longitude=116.36867
 */

 export const reqShops = ({
     latitude,
     longitude
}) => ajax(BASE_URL + '/shops',{
        latitude,
        longitude
})

/**
 * 根据经纬度和关键字搜索商铺列表
 * http://localhost:3000/search_shops?keyword=test&geohash=40.10038,116.36867
 */

 export const reqSearchShops = ({
     geohash,
     keyword
 }) => ajax(BASE_URL + '/search_shops',{
     keyword,
     geohash
 })

// /**
//  * 获取一次性验证码
//  * http://localhost:3000/captcha
//  */
// export const reqCaptcha = () => ajax('/capatcha')

/**
 * 用户名密码登陆
 * http://localhost:3000/login_pwd
 */

export const reqPwdLogin = ({
    name,
    pwd,
    captcha
}) => ajax(BASE_URL + '/login_pwd',{
    name,
    pwd,
    captcha
},'POST')  

/**
 * 发送验证码
 * http://localhost:3000/sendcode?phone=13716962779
 */

export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode',{
    phone
})

/**
 * 手机号验证码登录
 */

export const reqSmsLogin = ({
    phone,
    code
}) => ajax(BASE_URL + '/login_sms', {
    phone,
    code
},'POST')

/**
 * 根据会话获取用户信息
 */

export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')

/**
 * 用户登出
 */

export const reqLogout = () => ajax(BASE_URL + '/logoout')
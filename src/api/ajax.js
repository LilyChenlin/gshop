// //为了实现统一向后端发送请求数据，所以需要封装一个ajax请求函数
import axios from 'axios'
export default function ajax (url,data = {},type = 'GET') {
    //返回值Promise 异步返回数据为response.data而不是response
    return new Promise (function (resolve,reject) {
        //利用axios异步执行ajax请求
        
        //promise用于保存axios的返回值
        let promise
        if (type === 'GET') {
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }

            //发送get请求
            promise = axios.get(url)
        } else {
            promise = axios.post(url,data)
        }

        promise.then(response => {
            //成功回调resolve
            resolve(response.data)
        })
        .catch(error => {
            //失败
            reject(error)
        })
    })
}

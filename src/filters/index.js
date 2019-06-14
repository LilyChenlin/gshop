import Vue from 'vue'
// import format from 'date-fns/format'
import {format} from 'date-fns'

// 自定义过滤器
Vue.filter ('date-format', function (value,formatStr = 'YYYY-DD-MM HH:mm:ss') {
    return format(value,formatStr )
})
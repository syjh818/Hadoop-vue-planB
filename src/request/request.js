import axios from "axios"
import store from "@/store"
import {ElMessage} from "element-plus"
import requestPath from "@/store/modules/requestPath"

//创建axios实例（instance）
const service = axios.create({
    baseURL: requestPath.state().path,
    //前半段url
    timeout: 10000,
    //如果10s后未响应，就通知用户页面存在加载错误
})
//请求拦截器
service.interceptors.request.use(config => {
    //什么时候执行这个函数？-发送请求之前
    //cofig是什么？-记录了本次请求相关信息的一个对象
    //这个函数能用来做什么？-做一些请求前可进行的操作（如添加请求头、获取token）
    //console.log("执行了请求拦截器", config)
    return config
}, err => {
    return Promise.reject(err)
})
//响应拦截器
service.interceptors.response.use(res => {
    //什么时候执行这个函数？-在接收到后端服务器的响应之后，进入到组件内部的then方法之前执行这里的代码
    //res是什么？-记是axios封装好的一个响应对象
    //这个函数能用来做什么？-做一些统一的数据处理
    //console.log("执行响应拦截器", res)
    if (res.config.responseType === "blob") {
        let blob = new Blob([res.data], {type: res.headers['content-type']})
        // 创建新的URL并指向File对象或者Blob对象的地址
        const blobURL = window.URL.createObjectURL(blob)
        // 创建a标签，用于跳转至下载链接
        const tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.href = blobURL
        const contentDisposition = res.headers['filename'] || 'attachment;filename=Download'
        tempLink.setAttribute('download', decodeURI(contentDisposition))
        // 兼容：某些浏览器不支持HTML5的download属性
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank')
        }
        //挂载a标签
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        // 释放blob URL地址
        window.URL.revokeObjectURL(blobURL)
    } else if (res.data.code !== 200) {
        ElMessage.error(res.data.msg)
        return Promise.reject(res.data) // 返回一个被 reject 的 Promise 对象
    } else {
        return res.data//return后的值被组件中的请求的then方法的res接收
    }
}, err => {
    return Promise.reject(err) // 返回一个被 reject 的 Promise 对象
})
export default service

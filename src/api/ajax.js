/* 
发送异步ajax请求的函数模块
函数的返回值是promise对象
1.优化：统一处理请求异常 
*/
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, method='GET'){
    return new Promise((resolve,reject)=>{
        let promise
        if(method==='GET'){
            promise =  axios.get(url,{
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }
        promise.then(resp=>{
            resolve(resp)
        }).catch(error=>{
            message.error('请求出错了:'+error.message)
        })
    })
}


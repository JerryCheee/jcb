import axios from 'axios'
import { updateToken } from './auth'
import tokenHolder from './tokenHolder'
import qs from 'qs';
import { domain } from '../web.config';
const request = axios.create({
    baseURL: `${domain}`,
    timeout: 10000 // 请求超时时间
})

request.interceptors.request.use(config => {

        // let token = tokenHolder.get()
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2MDU4MzcyOTgsIm9wZW5JZCI6Im9jR1VweEstV3VTdU9GX29jZXJ6RmVTam4wRXciLCJleHAiOjE2MDg0MjkyOTgsInVzZXJJZCI6IjEzMjkzMDQyMTI2NjU0MjE4MjYiLCJpYXQiOjE2MDU4MzcyOTgsImp0aSI6IjEzMjkzMDQyMTI2NjU0MjE4MjYiLCJ1c2VybmFtZSI6IjEzNzk0OTQwMjE2In0.ye82ginSEXaH3i5-EfM2si--D3oSBuR-qADzAZEYT84';
        if (token) {
            config.headers['token'] = token
        }
        if (config.method === 'get') {
            // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
            config.paramsSerializer = function(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        }

        return config
    }, err)
    /** 处理接口报错，并封装返回值，调用接口时不用.catch 捕捉错误 */
const handleResErr = err => {
    const res = err.response.data
    return Promise.resolve({
        code: err.response.status,
        msg: res.error.message,
        success: false
    })
}
request.interceptors.response.use(response => {
    return Promise.resolve(response.data)
}, handleResErr)

const err = error => {

    console.error(error, '未处理错误')
    return Promise.reject(error)
}
export default request
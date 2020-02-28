
import jsonp from 'jsonp'
import ajax from './ajax'
import { message } from 'antd'

const baseUrl = ''

// log in
export const reqLogin = (username, password) => ajax(baseUrl + '/login', {username, password}, 'POST')

// add user
export const reqAddUser = (user) => ajax('/login', user, 'POST')

// jsonp
/*
  解决 ajax 跨域原理
    只能解决 get 类型的 ajax 请求跨域问题
    jsonp 是一般的 get 请求
    基本原理
      浏览器端
        动态生成 <scrpit></scrpit> 来请求后台接口
        定义好用于接收响应数据的函数，并将函数名通过请求参数提交给后台
      服务器端
        接收到请求处理产生结果数据后，返回一个函数调用的 js 代码， 将结果数据作为实参传入函数调用
      浏览器端
        收到响应自动执行函数调用的代码，也就执行了提前定义好的回调函数，并得到了需要的结果数据
*/
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        message.error('获取天气信息失败！')
      }
    })
  })
}
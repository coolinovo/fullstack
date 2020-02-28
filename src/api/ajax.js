
import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data={}, type='GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }
    promise
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        message.error(error.message)
      })
  })
}

// // log in
// ajax('/login', {username: 'Tom', password: '123456'}, 'POST').then()
// // add users
// ajax('/manage/user/add', {username: 'Tom', password: '12345', phone: '18579783308'})
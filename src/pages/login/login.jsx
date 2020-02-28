import React, {Component} from 'react'
import {reqLogin} from '../../api/index' 
import memory from '../../utils/memory'
import store from '../../utils/store'

import './login.less'
import logo from  './images/logo192.png'

import {
  Form,
  Icon,
  Input,
  Button,
  message
} from 'antd'
import { Redirect } from 'react-router-dom'

const Item = Form.Item

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {username, password} = values
        try {
          const data = await reqLogin(username, password)
          if (data.status === 0) {
            message.success('log in success!')
            const user = data.data
            memory.user = user
            store.saveUser(user)
            this.props.history.replace('/')
          } else {
            message.error(data.msg)
          }
        } catch (err) {
          
        }
      } else {
        message.error('validate error!')
      }
    })
  }
  validatePwd = (rule, value, cb) => {
    if (!value) cb('Password is required')
    if (value.length <= 4) {
      cb('shortest length is 4')
    } else if (value.length >= 12) {
      cb('longest length is 12')
    } else if (/^[a-zA-Z0-9_]+$/.test(value)) {
      cb('password is number,letter or underline.')
    } else {
      cb()
    }
  }

  render() {
    const user = memory.user
    if (user && user._id) {
      return <Redirect to='/'/>
    }
    const form = this.props.form
    const { getFieldDecorator } = form

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt=""/>
          <h1>React FBMS</h1>
        </header>
        <section className='login-content'>
          <h2>Sign in</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('username', {
                rules: [
                  {required: true, whitespace: true, message: 'Please input your username!' },
                  {min: 4, message: 'shortest length is 4' },
                  {max: 12, message: 'longest length is 12' },
                  {pattern: /^[a-zA-Z0-9_]+$/, message: 'username is number,letter or underline.'}
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
               validator: this.validatePwd
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

/*
  1. 高阶函数
    1）一类特别的函数
      a. 接受函数类型的参数
      b. 返回值是函数
    2）常见
      a. setTimeout() | setInterval()
      b. Promise: Promise(() => {}) | then(v => {}, reason => {})
      c. 数组遍历相关方法，forEach()/filter()/map()/reduce()/find()/findIndex()
      d. 函数对象的 bind
    3) 高阶函数更加动态、具有扩展性
  
  2. 高阶组件
    1）本质是一个函数
    2）接受一个组件（被包装组件），返回一个新的组件（包装），新组件内部渲染被包装，包装组件传入特定属性
    3）作用: 扩展组件功能
    4) 高阶组件也是高阶函数，接收一个组件函数，返回新的组件函数

  3. 组件是对象类，标签是组件实例

  create() {...} 高阶函数 ---> 返回一个函数
  包装 Form 组件，生成新组件，新组件会向 Form 传递一个对象属性：form
*/

const WrapLogin = Form.create()(Login)
export default WrapLogin
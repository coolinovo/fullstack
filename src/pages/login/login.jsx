import React, {Component} from 'react'

import './login.less'
import logo from  './images/logo192.png'

import {
  Form,
  Icon,
  Input,
  Button
} from 'antd'

const Item = Form.Item

class login extends Component {

  handleSubmit = () => {

  }

  render() {
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
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
            </Item>
            <Item>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
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

// const 
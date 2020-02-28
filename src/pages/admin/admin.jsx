import React, {Component} from 'react'
import memory from '../../utils/memory'
import { Redirect, Route, Switch } from 'react-router-dom'

import SideBar from '../../components/side-bar'
import Header from '../../components/header'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

import { 
  Layout
 } from 'antd'

const { Footer, Sider, Content } = Layout

export default class admin extends Component {
  render() {
    const user = memory.user
    if (!user || !user._id) {
      return <Redirect to='/login'/>
    }
    return (
      <Layout style={{height: '100%'}}>  
        <Sider>
          <SideBar/>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{backgroundColor: '#fff'}}>
            <Switch>
              <Route path='/home' component={Home}></Route>
              <Route path='/category' component={Category}></Route>
              <Route path='/product' component={Product}></Route>
              <Route path='/role' component={Role}></Route>
              <Route path='/user' component={User}></Route>
              <Route path='/charts/bar' component={Bar}></Route>
              <Route path='/charts/line' component={Line}></Route>
              <Route path='/charts/pie' component={Pie}></Route>
              <Redirect to='/home'/>
            </Switch>
          </Content>
          <Footer style={{color: '#ccc', textAlign: 'center'}}></Footer>
        </Layout>
      </Layout>
    )
  }
}
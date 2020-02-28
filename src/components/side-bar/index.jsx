import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {
  Menu,
  Icon,
  Button
} from 'antd'
import menuList from '../../config/menuConfig'

import './index.less'
import logo from '../../assets/images/logo192.png'

const SubMenu = Menu.SubMenu

class SideBar extends Component {
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item>
            <Link to={item.key}>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  getMenuNodes_reduce = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_reduce(item.children)}
          </SubMenu>
        ))
      }
      return pre
    }, [])
  }
  render() {
    const path = this.props.location.pathname
    return (
      <div className='side-bar'>
        <Link to='/home' className='side-bar-header'>
          <img src={logo} alt="logo"/>
          <h1>React FBMS</h1>
        </Link>
        <Menu
          mode='inline'
          theme='dark'
          // defaultSelectedKeys={[path]}
          selectedKeys={[path]}
        >
          {/* <Menu.Item key='/home'>
            <Link to='/home'>
              <Icon type=''/>
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key='sub1'
            title={
              <span>
                <Icon type=''/>
                <span>商品</span>
              </span>
            }
          >
           
          </SubMenu> */}
          {
            this.getMenuNodes_reduce(menuList)
          }
        </Menu>
      </div>
    )
  }
}

// 包装非路由组件，返回一个新的组件，向非路由组件传递: history location match
export default withRouter(SideBar)
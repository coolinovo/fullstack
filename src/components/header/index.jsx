import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { dateFormate } from '../../utils/date'
import memory from '../../utils/memory'
import store from '../../utils/store'
import {reqWeather} from '../../api/index'
import menuList from '../../config/menuConfig'

import {
  Modal
} from 'antd'

import './index.less'

class Header extends Component {
  state = {
    currentTime: dateFormate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = dateFormate(Date.now())
      this.setState({currentTime})
    }, 1000)
  }
  getWeather = async () => {
    const {dayPictureUrl, weather} = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }
  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const citem = item.children.find(citem => citem.key === path)
        if (citem) {
          title = citem.title
        }
      }
    })
    return title
  }
  logout = () => {
    Modal.confirm({
      content: '确认退出吗？',
      onOk: () => {
        store.removeUser()
        memory.user = {}
        this.props.history.replace('/login')
      }
    })
  }
  componentDidMount() {
    this.getTime()
    this.getWeather()
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  render() {
    const {currentTime, dayPictureUrl, weather} = this.state
    const {username} = memory.user
    const title = this.getTitle()
    return (
      <div className='header'>
        <div className='header-top'>
          <span>Welcome, {username}!</span>
          <span onClick={this.logout} style={{cursor: 'pointer', color: '#09f'}}>退出</span>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
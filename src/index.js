import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import memory from './utils/memory'
import store from './utils/store'

// import 'antd/dist/antd.css'

const user = store.getUser()
memory.user = user

ReactDOM.render(<App/>, document.getElementById('root'))

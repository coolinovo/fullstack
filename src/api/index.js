
import ajax from './ajax'

const baseUrl = ''

// log in
export const reqLogin = (username, password) => ajax(baseUrl + '/login', {username, password}, 'POST')

// add user
export const reqAddUser = (user) => ajax('/login', user, 'POST')
import { URL_LOGIN } from '../../constants/ConfigAPI'
import { jwtDecode } from 'jwt-decode'

import axios from 'axios'

function authenticate(credentials) {
  return axios
    .post(URL_LOGIN, credentials)
    .then((res) => res.data)
    .then((data) => {
      window.localStorage.setItem('authToken', data.jwt)
      window.localStorage.setItem('username', data.user.username)
      axios.defaults.headers['Authorization'] = 'Bearer ' + data.jwt
    })
}
function isAuthenticated() {
  const token = window.localStorage.getItem('authToken')

  if (token) {
    try {
      const { exp } = jwtDecode(token)
      if (exp * 1000 > new Date().getTime()) {
        return true
      }
      window.localStorage.removeItem('authToken')
      window.localStorage.removeItem('username')
    } catch (e) {
      console.error('Erreur lors du décodage du jeton', e)
      return false
    }
  }

  return false
}

function logout() {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('username')
  delete axios.defaults.headers['Authorization']

  window.location.href = '/Account/Login'
}

export { authenticate, isAuthenticated, logout }

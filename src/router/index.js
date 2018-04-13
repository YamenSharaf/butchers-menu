import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/pages/Home'
import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'
import store from '../store'
import { Message } from 'element-ui'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter (to, from, next) {
        if (store.state.userStatus.loggedIn) {
          next()
        } else {
          Message({
            message: `Please log in to access the dashboard`,
            type: 'error'
          })
          next({ name: 'Login' })
        }
      }
    }
  ]
})

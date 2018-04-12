import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'comps/HelloWorld'
import Login from 'pages/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

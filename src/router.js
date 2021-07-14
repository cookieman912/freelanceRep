import Vue from 'vue'
import Router from 'vue-router'
import home from './pages/home-page.vue'
import chat from './pages/chat.vue'
import reviewApp from './pages/review-app.vue'
import loginSignup from './pages/login-signup.vue'
import userDetails from './pages/user-details.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/review',
      name: 'review',
      component: reviewApp
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/login',
      name: 'loginSignup',
      component: loginSignup
    },
    {
      path: '/user/:id',
      name: 'user-details',
      component: userDetails
    }
  ]
})

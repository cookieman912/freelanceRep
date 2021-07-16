import Vue from 'vue'
import Router from 'vue-router'
import home from './pages/home-page.vue'
import explorePage from './pages/explore.vue'
import gigDetails from './pages/gig-details.vue'
import becomeSeller from './pages/become-seller.vue'
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
      path: '/explore',
      name: 'explore',
      component: explorePage
    },
    {
      path: '/explore/:gigId',
      name: 'gig-details',
      component: gigDetails
    },
    {
      path: '/becomeSeller',
      name: 'becomeSeller',
      component: becomeSeller
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
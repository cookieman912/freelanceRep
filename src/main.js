import Vue from 'vue'
import app from './app.vue'
import { router } from './router'
import { store } from './store/store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './assets/styles/main.scss'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')



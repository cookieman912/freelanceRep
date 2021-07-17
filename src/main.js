import Vue from 'vue'
import app from './app.vue'
import { router } from './router'
import { store } from './store/store'
import './assets/styles/main.scss'
import './registerServiceWorker'
//Uri Added
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//End ofUri Added
Vue.config.productionTip = false
    //Uri added
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')
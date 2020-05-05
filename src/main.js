import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/fonts/iconfont.css'

// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugin/element.js'
import './assets/css/global.css'

import axios from 'axios'

// Vue.use(ElementUI)

axios.defaults.baseURL ='http://127.0.0.1:8888/api/private/v1/';
Vue.prototype.$http=axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './request'
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)

Vue.prototype.$echarts = echarts
Vue.prototype.$request = request
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (!store.state.token) {
  router.push({ path: '/login' })
}

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    next()
  }
  if (to.meta.requireLogin) {
    if (store.state.token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

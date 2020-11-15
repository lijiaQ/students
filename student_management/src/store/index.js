import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: window.sessionStorage.getItem('token') || '',
    user: window.sessionStorage.getItem('user') || '',
    college: [],
    province: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      window.sessionStorage.setItem('token', token)
    },
    setUser(state, data) {
      state.user = data
      window.sessionStorage.setItem('user', data)
    },
    setCollege(state, data) {
      state.college = data
    },
    setProvince(state, data) {
      state.province = data
    }
  }
})

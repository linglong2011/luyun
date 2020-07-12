import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    username: '',
    token: ''
  }, // 共同维护的一个状态，state里面可以是很多个全局状态
  getters: {
  }, // 获取数据并渲染
  actions: {
  }, // 数据的异步操作
  mutations: {
    setUser: (state, response) => {
      state.token = response.token
      state.username = response.username
    },
    logout: (state) => {
      state.username = ''
      state.token = ''
      location.reload()
    }
  }, // 处理数据的唯一途径，state的改变和赋值都在这里
  // vuex-persistedstate默认持久化所有state，指定需要持久化的state,可进行配置
  plugins: [
    createPersistedState()
  ]
})
export default store

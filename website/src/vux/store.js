// 引用vue
import Vue from 'vue'
// 引用vux
import Vuex from 'vuex'
// 引用全局文件
import global from '../plugins/Global'
// Vuex持久化插件(vuex-persistedstate)解决刷新数据消失的问题
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
  // 共同维护的一个状态，state里面可以是很多个全局状态
  state: {
    // 用户名
    username: '',
    // 头像
    avatarUrl: '',
    // token
    token: ''
  },
  getters: {
  },
  actions: {
  },
  mutations: {
    setUser: (state, response) => {
      state.token = response.token
      state.username = response.username
      state.avatarUrl = global.BASEURL + response.avatarUrl
    },
    logout: (state) => {
      state.username = ''
      state.avatarUrl = ''
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

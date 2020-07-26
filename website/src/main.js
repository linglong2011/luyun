import Vue from 'vue'
import store from './vux/store'
// 导入阿里字体图标样式
import './assets/fonts/iconfont.css'
// 按需要引入element-ui 需要用到的组件，在element.js中配置
import './plugins/element'
// 引入element-ui的样式表
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import './assets/css/global.css'
import App from './App.vue'
import router from './router'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器需要用到的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import global_ from './plugins/Global' // 引用全局文件
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
// axios 添加请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios
Vue.prototype.GLOBAL = global_ // 挂载到Vue实例上面
Vue.config.productionTip = false
// 将富文本编辑器注册为全局可以组件
Vue.use(VueQuillEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

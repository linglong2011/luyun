import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vux/store'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('../views/Index.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/admin/user/Login.vue')
    },
    {
      path: '/admin',
      name: 'adminHome',
      component: () => import('../components/admin/Home.vue'),
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      redirect: '/admin/alluser',
      children: [
        {
          path: '/admin/welcome',
          name: 'Welcome',
          component: () => import('../components/admin/Welcome.vue')
        },
        {
          path: '/admin/alluser',
          name: 'Alluser',
          component: () => import('../components/admin/user/Alluser.vue')
        },
        {
          path: '/admin/register',
          name: 'Register',
          component: () => import('../components/admin/user/Register.vue')
        },
        {
          path: '/admin/edituser/:id',
          name: 'EditUser',
          component: () => import('../components/admin/user/EditUser.vue')
        },
        {
          path: '/admin/addarticle',
          name: 'AddArticle',
          component: () => import('../components/admin/article/AddArticle.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'error',
      component: () => import('../components/Err404.vue')
    }
  ]
})
// 展示在全局导航守卫中检查元字段
router.beforeEach((to, from, next) => {
  // to.meta.requireAuth
  // console.log(to.path.indexOf('admin') !== -1)
  if (to.path.indexOf('admin') !== -1) {
    const token = store.state.token
    if (!token) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
export default router

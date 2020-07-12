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
      component: () => import('../components/user/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/user/Register.vue')
    },
    {
      path: '/manager',
      name: 'ManagerHome',
      component: () => import('../components/manager/Home.vue'),
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      redirect: '/manager/alluser',
      children: [
        {
          path: '/manager/welcome',
          name: 'Welcome',
          component: () => import('../components/manager/Welcome.vue')
        },
        {
          path: '/manager/alluser',
          name: 'Alluser',
          component: () => import('../components/manager/user/Alluser.vue')
        },
        {
          path: '/manager/register',
          name: 'Register',
          component: () => import('../components/manager/user/Register.vue')
        },
        {
          path: '/manager/edituser/:id',
          name: 'EditUser',
          component: () => import('../components/manager/user/EditUser.vue')
        },
        {
          path: '/manager/addarticle',
          name: 'AddArticle',
          component: () => import('../components/manager/article/AddArticle.vue')
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
  // console.log(to.path.indexOf('manager') !== -1)
  if (to.path.indexOf('manager') !== -1) {
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

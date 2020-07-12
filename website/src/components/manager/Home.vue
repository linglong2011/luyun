<template>
<el-container class="homeContainer">
    <!-- 头部区域 -->
    <el-header>
        <span class="websiteTit">
            FUTURE
        </span>
        <div class="pull-right top-user">
            <img src="../../assets/img/avatar.jpg" class="avatar shadow radius-50 pull-left" alt="">
            {{ user_name }}
            <el-button size="mini" type="danger" @click="logout" icon="el-icon-switch-button" circle></el-button>
        </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
        <!-- 左侧栏 -->
        <!-- 根据isCollapse的切换动态设置左侧菜单栏的宽度 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
            <!-- 左侧栏菜单的折叠与展开 -->
            <div class="toggleBtn" @click="toggleCollapse">
                <el-button v-if="!isCollapse" type="info" icon="el-icon-caret-left" size="mini" circle></el-button>
                <el-button v-else type="info" icon="el-icon-caret-right" size="mini" circle></el-button>
            </div>
            <el-menu :collapse="isCollapse" default-active="1" class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router
                background-color="#354052"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="/manager/alluser">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户中心</span>
                </el-menu-item>
                <el-menu-item index="/manager/addarticle">
                    <i class="el-icon-menu"></i>
                    <span slot="title">添加文章</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <!-- 主体区域 -->
        <el-main>
            <!-- 路由点位符 -->
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ManagerHome',
  components: {},
  data () {
    return {
      // 左侧菜单默认折叠状态
      isCollapse: '',
      username: ''
    }
  },
  props: [''],
  methods: {
    // 左侧菜单折叠与展开的切换事件
    toggleCollapse () {
      // 点击折叠按钮时，改变isCollapse的值，从而改变左侧菜单栏的折叠与展开
      this.isCollapse = !this.isCollapse
      window.sessionStorage.setItem('isCollapse', this.isCollapse)
    },
    logout () {
      this.$store.commit('logout') // 使用vuex中的commit方法，执行mutations中的logout，直接退出登录
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    ...mapState({
      user_name: state => state.username
    })
  },
  watch: {},
  created () {
    this.userName = sessionStorage.getItem('username')
    let isc = sessionStorage.getItem('isCollapse')
    if (isc === 'false') {
      isc = false
    } else {
      isc = true
    }
    this.isCollapse = isc
  },
  beforeMount () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.homeContainer{
    height: 100%;
}
.el-header{
    background-color: #fff; padding-left: 15px;
    .logo{
        width: 30px; height: 40px;
    }
    .websiteTit{
        font-size: 30px; font-family: Impact; line-height: 60px;
    }
    .top-user{
        margin-top: 15px; line-height: 32px;
    }
    .avatar{
        width: 32px; height: 32px; margin-right: 12px;
    }
}
.el-aside{
    background-color: #354052; position: relative;
    .toggleBtn{
        text-align: center; cursor: pointer; padding: 12px 0; position: absolute; bottom: 0; left: 0; right: 0;
    }
    .toggleBtn img{
        background-color: #576883; width: 28px; height: 28px; padding: 4px; border-radius: 50%;
    }
    .iconfont{
        margin-right: 8px;
    }
    .el-menu{
        border-right: none;
    }
}
.el-main{
    background-color: #f4f4f4;
}

</style>

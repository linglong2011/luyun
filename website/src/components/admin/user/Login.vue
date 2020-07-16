<template>
   <div class='login_container'>
    <div class="login_box">
        <h2 class="tit">用户登录</h2>
        <!-- 表单区域 -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
            <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- banner 区域 -->
    <div class="login_left">
      welcome to visit
      <span><router-link to="apple">还没有账号？现在注册</router-link></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '666666'
      },
      // 为表单添加验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: [''],
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()// 这是elementui中的方法
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        // validate 为elementui中的验证方法，如果通过验证，则返回ture，否则返回false
        // console.log(valid);
        if (!valid) return// 如果valid为false，则直接返回 如果为true
        // 发起ajax请求 login 为请求的接口地址 loginForm为需要传的用户密码参数 data为返回的有用数据，重新赋值给res
        const { data: res } = await this.$http.post('/admin/login', this.loginForm)
        console.log(res)
        // res中meta.status 如果不等于200，直接返回，并提示用户登录失败
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        // res中meta.status 如果等于200，则提示用户登录成功
        this.$message.success(res.meta.msg)
        // 1、将登录成功后的token，保存到客户端的 sessionStorage中
        //    1.1 项目中除了登录之外的其他api接口，必须在登录之后才能访问
        //    1.2 token 只应在当前网站打开期间生效，所以将token保存在 sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 调用mutations中的方法，将token写入state及本地缓存
        this.$store.commit('setUser', res.data)
        // 2、通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/admin')
      })
    }
  },
  computed: {},
  watch: {},
  created () {},
  beforeMount () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
  .login_container{
    background-color: #f4f4f4; height: 100%;
  }
  .login_box{
     width: 750px; height: 350px; background-color: #fff; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); box-shadow: 0 0 35px rgba(180,180,180,0.4);
  }
  .login_left{
    width: 420px; height: 370px; background-color: #36465d; position: absolute; left: 50%; top: 50%; transform: translate(-110%,-50%); color: #fff; /*background-image: linear-gradient(to bottom right, #5f59dd, #ca4cb6);*/ box-shadow: 0 0 35px rgba(180,180,180,0.4); font-size: 48px; color: rgba(255,255,255,0.5); font-family: Impact; padding-top: 145px; text-align: center; background-color: #30a9e7;
  }
  .login_left span{
    position:absolute; bottom: 20px; right: 25px; font-size: 16px;
  }
  .login_left span a{
    color: rgba(255,255,255,0.8);
  }
  .tit{
    position: absolute; left: 370px; top: 55px; padding: 0; margin: 0; font-weight: normal; font-size: 18px; color: #999;
  }
  .login_form{
    position: absolute; bottom: 0; left: 350px; right: 20px; top: 120px; padding: 0 20px; box-sizing: border-box;
  }
  .btns{
    display: flex; justify-content: flex-end;
  }
</style>

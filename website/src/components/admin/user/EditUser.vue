<template>
   <div class='userRegister'>
     <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/register' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-form ref="registerFormRef" :rules="registerFormRules" :model="registerForm" label-width="120px">
            <el-form-item label="用户名">
              <el-input v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="用户头像">
              <el-upload class="avatar-uploader"
                auto-upload
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="tempImageUrl" :src="tempImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="国家">
              <el-select v-model="registerForm.country" placeholder="请选择所在国家">
                <el-option label="中国" value="China"></el-option>
                <el-option label="美国" value="USA"></el-option>
                <el-option label="加拿大" value="Canada"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="registerForm.birth" ></el-date-picker>
            </el-form-item>
            <el-form-item label="是否立即启用">
              <el-switch v-model="registerForm.state"></el-switch>
            </el-form-item>
            <el-form-item label="爱好">
              <el-checkbox-group v-model="registerForm.hobby">
                <el-checkbox label="看书" name="type"></el-checkbox>
                <el-checkbox label="写字" name="type"></el-checkbox>
                <el-checkbox label="爬山" name="type"></el-checkbox>
                <el-checkbox label="睡觉" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="registerForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="简介">
              <el-input type="textarea" v-model="registerForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
   </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: '',
  components: {},
  data () {
    return {
      // 用户头像
      tempImageUrl: '',
      // 上传图片的接口地址
      uploadUrl: this.GLOBAL.BASEURL + '/admin/avatarupload',
      // 图片上传组件headers请求头对象
      headersObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      registerForm: {
        // 用户名
        username: '',
        // 用户头像
        avatarUrl: '',
        // 所在省份
        country: '',
        // 出生时间
        birth: '',
        // 是否立即启用
        state: null,
        // 爱好
        hobby: [],
        // 性别
        sex: '',
        // 简介
        desc: ''
      },
      // 为表单添加验证规则
      registerFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        country: [
          { required: true, message: '请选择省份', trigger: 'blur' }
        ]
      }
    }
  },
  props: [''],
  methods: {
    handleAvatarSuccess (res, file) {
      console.log('123')
      console.log(file.response)
      this.tempImageUrl = URL.createObjectURL(file.raw)
      // this.tempImageUrl = 'http://localhost:3000' + file.response.filesPath
      // sessionStorage.setItem('sessionAvatar', URL.createObjectURL(file.raw))
      this.registerForm.avatarUrl = file.response.filesPath
      console.log(this.tempImageUrl)
      console.log(this.registerForm.avatarUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit () {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        const form = _.cloneDeep(this.registerForm)
        form.hobby = form.hobby.join(',')
        console.log(this.registerForm)
        const { data: res } = await this.$http.put('/admin/editusers/' + this.$route.params.id, form)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.$router.push('/admin/alluser')
      })
    },
    async getUserById () {
      const { data: res } = await this.$http.get('/admin/users/' + this.$route.params.id)
      console.log('头像拿到了员？')
      console.log(res.data)
      if (res.meta.status !== 200) return
      res.data.hobby = res.data.hobby == null ? [] : res.data.hobby.split(',')
      this.tempImageUrl = this.GLOBAL.BASEURL + res.data.avatarUrl
      this.registerForm = res.data
    }
  },
  computed: {},
  watch: {},
  created () {
    // 页面加载时，获取用户信息
    this.getUserById()
  },
  beforeMount () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

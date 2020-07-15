<template>
   <div class=''>
     <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加栏目</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-form ref="blockFormRef" :rules="blockFormRules" :model="blockForm" label-width="120px">
            <el-form-item label="栏目名称" prop="block_name">
              <el-input v-model="blockForm.block_name"></el-input>
            </el-form-item>
            <el-form-item label="栏目简介">
              <el-input type="textarea" v-model="blockForm.block_desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
   </div>
</template>
<script>
export default {
  name: 'Add',
  components: {},
  data () {
    return {
      blockForm: {
        block_name: '',
        block_desc: ''
      },
      // 为表单添加验证规则
      blockFormRules: {
        // 验证栏目名是否合法
        block_name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' }
        ]
      }
    }
  },
  props: [''],
  methods: {
    onSubmit () {
      this.$refs.blockFormRef.validate(async valid => {
        console.log('8888')
        if (!valid) return
        console.log(this.blockForm)
        const { data: res } = await this.$http.post('/admin/block/add', this.blockForm)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.$router.push('/admin/block/list')
      })
    },
    // 重置表单
    resetForm () {
      this.$refs.blockFormRef.resetFields() // elementui中的方法 重置表单项
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
</style>

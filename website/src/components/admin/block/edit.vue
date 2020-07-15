<template>
   <div class=''>
     <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/register' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>栏目修改</el-breadcrumb-item>
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
              <el-button @click="goBack">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
   </div>
</template>
<script>
export default {
  name: 'Edit',
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
    async getlbockById () {
      const { data: res } = await this.$http.get('/admin/block/getblock/' + this.$route.params.id)
      console.log(res.data)
      if (res.meta.status !== 200) return
      this.blockForm = res.data
    },
    onSubmit () {
      this.$refs.blockFormRef.validate(async valid => {
        if (!valid) return
        console.log(this.blockForm)
        const { data: res } = await this.$http.put('/admin/block/editblock/' + this.$route.params.id, this.blockForm)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$router.push('/admin/block/list')
        this.$message.success(res.meta.msg)
      })
    },
    // 返回
    goBack () {
      this.$router.go(-1)
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getlbockById()
  },
  beforeMount () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

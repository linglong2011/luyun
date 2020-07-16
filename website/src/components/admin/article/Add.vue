<template>
   <div class=''>
     <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/manager/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="18" :offset="3">
          <el-form ref="articleFormRef" :rules="articleFormRules" :model="articleForm" label-width="120px" enctype="multipart/form-data">
            <el-form-item label="标题" prop="title">
              <el-input v-model="articleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="作者" >
              <el-input v-model="articleForm.auth"></el-input>
            </el-form-item>
            <el-form-item label="摘要">
              <el-input v-model="articleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="articleForm.time" ></el-date-picker>
            </el-form-item>
            <el-form-item label="新闻封面">
              <el-input v-model="articleForm.cover"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <!-- 富文本编辑器 -->
              <!-- bidirectional data binding（双向数据绑定） -->
              <quill-editor v-model="articleForm.content"></quill-editor>
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
export default {
  name: 'AddArticle',
  components: {},
  data () {
    return {
      articleForm: {
        title: '',
        auth: '',
        desc: '',
        time: '',
        cover: '',
        content: ''
      },
      // 为表单添加验证规则
      articleFormRules: {
        // 验证用户名是否合法
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      }
    }
  },
  props: [''],
  methods: {
    async onSubmit () {
      console.log(this.articleForm)
      const res = await this.$http.post('/addarticle', { params: this.articleForm })
      console.log('1')
      console.log(res)
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

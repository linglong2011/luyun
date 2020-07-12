<template>
  <div class="home text-center">
    <router-link to="/login">
      <el-button type="primary">我要登录</el-button>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Index',
  components: {
  },
  data () {
    return {
      personList: []
    }
  },
  created () {
    this.getPersonList()
  },
  methods: {
    async getPersonList () {
      const result = await this.$http.get('/personlist', {})
      console.log(result)
      // if(res.meta.status !== 200) return this.$message.error('获取商品列表失败')
      // this.$message.success('获取商品列表成功')
      // this.goodsList = res.data.goods
      // this.total = res.data.total
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  padding-top: 100px;
  .el-button{
    margin: 0 20px;
  }
}
</style>

<template>
   <div class=''>
     <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/manager/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
          <el-button type="primary" @click="goRegister">新增用户</el-button>
      </el-row>
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名" ></el-table-column>
        <el-table-column prop="sex" label="性别" ></el-table-column>
        <el-table-column prop="birth" label="出生日期" ></el-table-column>
        <el-table-column prop="country" label="国家"></el-table-column>
        <el-table-column prop="birth" label="出生日期"></el-table-column>
        <el-table-column prop="hobby" label="爱好" width="300"></el-table-column>
        <el-table-column prop="state" label="状态" >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.state === true">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <!-- <pre>{{scope.row}}</pre> -->
            <el-button size="mini" type="warning" @click="editById(scope.row.id)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[1, 3, 5, 8]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
   </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      userList: [],
      queryInfo: {
        query: '', // 搜索关键字
        page: 1, // 当前页数
        pagesize: 3 // 当前每页显示2条数据
      },
      // 总页面
      totalpage: 0,
      // 总用户数
      total: 0
    }
  },
  props: [''],
  methods: {
    goRegister () {
      this.$router.push('/manager/register')
    },
    editById (id) {
      this.$router.push({
        name: 'EditUser',
        params: {
          id: id
        }
      })
    },
    async deleteById (id) {
      const confirmResult = await this.$confirm('此操作将永久删除用户，是否继续？', '提示', {
        confirmButtonText: '确定', concelButtonText: '取消', type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message.info('您已取消了删除用户的操作。')
      const res = await this.$http.delete('/admin/deleteusers/' + id)
      console.log(res)
      this.$message.success('删除成功！')
      // 删除成功后，重新加载用户信息
      this.getUserList()
    },
    async getUserList () {
      const { data: res } = await this.$http.get('/admin/alluser', { params: this.queryInfo })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.total = res.total
      this.userList = res.data
    },
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize);
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听当前页码值的改变
    handleCurrentChange (newPage) {
      // console.log(newPage);
      this.queryInfo.page = newPage
      this.getUserList()
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserList()
  },
  beforeMount () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

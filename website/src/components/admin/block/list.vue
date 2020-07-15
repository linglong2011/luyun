<template>
   <div class=''>
     <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>栏目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="16">
          <el-button type="primary" @click="goAdd">添加栏目</el-button>
          </el-col>
        <el-col :span="8">
          <!-- 搜索 clearable带清空图标按钮的input @clear事件，清空查询关键字，重新获取用户列表-->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getBlockList()">
            <el-button slot="append" icon="el-icon-search" @click="getBlockList()"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="blockList" stripe style="width: 100%">
        <el-table-column prop="id" label="栏目id" width="100"></el-table-column>
        <el-table-column prop="block_name" label="栏目名称" width="120"></el-table-column>
        <el-table-column prop="block_desc" label="栏目描述" ></el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" plain @click="editById(scope.row.id)">修改</el-button>
            <el-button size="mini" type="danger" plain @click="deleteById(scope.row.id)">删除</el-button>
            <el-button size="mini" type="primary" plain>添加文章</el-button>
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
  name: 'List',
  components: {},
  data () {
    return {
      blockList: [],
      queryInfo: {
        query: '', // 搜索关键字
        page: 1, // 当前页数
        pagesize: 3 // 当前每页显示3条数据
      },
      // 总页面
      totalpage: 0,
      // 总用户数
      total: 0
    }
  },
  props: [''],
  methods: {
    // 添加新栏目
    goAdd () {
      this.$router.push('/admin/block/add')
    },
    // 获取栏目列表
    async getBlockList () {
      const { data: res } = await this.$http.get('/admin/block/list', { params: this.queryInfo })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.total = res.total
      this.blockList = res.data
    },
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize);
      this.queryInfo.pagesize = newSize
      this.getBlockList()
    },
    // 监听当前页码值的改变
    handleCurrentChange (newPage) {
      // console.log(newPage);
      this.queryInfo.page = newPage
      this.getBlockList()
    },
    // 删除栏目
    async deleteById (id) {
      const confirmResult = await this.$confirm('此操作将永久删除栏目，是否继续？', '提示', {
        confirmButtonText: '确定', concelButtonText: '取消', type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message.info('您已取消了删除用户的操作。')
      const res = await this.$http.delete('/admin/block/delete/' + id)
      console.log(res)
      // 删除成功后，重新加载栏目列表
      this.getBlockList()
      this.$message.success(res.meta.msg)
    },
    editById (id) {
      this.$router.push({
        name: 'EditBlock',
        params: {
          id: id
        }
      })
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getBlockList()
  },
  beforeMount () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

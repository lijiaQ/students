<template>
  <div class="student-list">
    <div class="student-table">
      <el-table :data="studentData" style="width: 100%">
        <el-table-column prop="name" :label="(college || '学生汇总') + total + '人'"> </el-table-column>
        <el-table-column prop="gender" :formatter="sex" label="性别"> </el-table-column>
        <el-table-column prop="brith" label="生日"> </el-table-column>
        <el-table-column prop="college" label="学院"> </el-table-column>
        <el-table-column prop="province" label="籍贯"> </el-table-column>
        <el-table-column label="爱好">
          <template slot-scope="scope">
            <el-button
              class="btn-edit"
              circle
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-popconfirm @confirm="handleDelete(scope.$index)" icon-color="red" title="您确定删除吗？">
              <el-button slot="reference" circle size="mini" type="danger" icon="el-icon-delete"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="student-page"
        @current-change="changePage"
        :page-size="pageSize"
        :pager-count="11"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
      <el-drawer :visible.sync="drawer" direction="rtl" size="360px">
        <on-edit @closeDrawer="closeDrawer" @saveData="saveData" :onEdit="onEdit"></on-edit>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import onEdit from '@/components/onEdit'
export default {
  components: {
    onEdit
  },
  data() {
    return {
      studentData: [],
      total: 0,
      pageSize: 8,
      pageNum: 1,
      college: '',
      drawer: false,
      onEditIdx: -1,
      onEdit: {}
    }
  },
  methods: {
    sex(value) {
      return value.gender ? '男' : '女'
    },
    handleEdit(idx, item) {
      this.onEditIdx = idx
      this.onEdit = item
      this.drawer = true
    },
    closeDrawer() {
      this.onEdit = {}
      this.drawer = false
    },
    changePage(n) {
      this.pageNum = n
      this.getData()
    },
    getData() {
      this.$request({
        url: 'students',
        params: {
          college: this.college,
          pagenum: this.pageNum,
          pagesize: this.pageSize
        }
      }).then(res => {
        if (res.code === 200) {
          this.total = res.total
          this.studentData = res.students
        }
      })
    },
    saveData(data) {
      const { id } = data
      delete data.id
      this.$request({
        method: 'post',
        url: 'update',
        data: { id, data }
      }).then(res => {
        if (res.code === 200) {
          this.$set(this.studentData, this.onEditIdx, res.student)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.closeDrawer()
        }
      })
    },
    handleDelete(idx) {
      const id = this.studentData[idx].id
      this.$request({
        method: 'post',
        url: 'delete',
        data: { id }
      }).then(res => {
        if (res.code === 200) {
          this.studentData.splice(idx, 1)
          this.$message({
            message: '删除成功',
            type: 'warning'
          })
        }
      })
    }
  },
  created() {
    this.college = this.$route.params.college
    this.getData()
  },
  watch: {
    $route() {
      this.college = this.$route.params.college
      this.getData()
    }
  }
}
</script>

<style>
.student-page {
  position: absolute;
  bottom: 8px;
}

.btn-edit {
  margin-right: 10px;
}
</style>

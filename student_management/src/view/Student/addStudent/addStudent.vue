<template>
  <div class="add-student">
    <on-edit :onEdit="onEdit" @closeDrawer="cancel" @saveData="saveData"> </on-edit>
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
      onEdit: {
        hobbys: []
      }
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    saveData(data) {
      this.$request({
        method: 'post',
        url: '/create',
        data: { data }
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style></style>

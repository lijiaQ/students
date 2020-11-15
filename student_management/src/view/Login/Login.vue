<template>
  <el-card class="login" shadow="hover">
    <div slot="header">登录</div>
    <el-form :model="userData" status-icon :rules="rules" ref="userData" label-width="70px">
      <el-form-item label="用户名" prop="user">
        <el-input v-model.number="userData.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="passwordword" v-model="userData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login" type="primary">提交</el-button>
        <el-button @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        user: '',
        password: ''
      },
      rules: {
        user: {
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    resetData() {
      this.userData = {
        user: '',
        password: ''
      }
    },
    login() {
      const { user, password } = this.userData
      if (user && password) {
        this.$request({
          url: '/login',
          method: 'post',
          data: { user, password }
        }).then(res => {
          if (res.code === 200 && res.message === 'success') {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$store.commit('setToken', res.token)
            this.$store.commit('setUser', res.user)
            this.$router.push({ path: '/student' })
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })
      }
    }
  }
}
</script>

<style>
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
}
</style>

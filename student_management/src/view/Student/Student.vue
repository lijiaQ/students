<template>
  <el-container class="home">
    <el-header class="header">
      <div>
        <i class="el-icon-eleme"></i>
        <span>学生信息管理系统</span>
      </div>
      <div>
        <i class="el-icon-user-solid"></i>
        <span>{{ $store.state.user }}</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="160px" class="sidebar">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#1e50a2"
          text-color="#ffffff80"
          active-text-color="#fff"
        >
          <el-menu-item index="1">
            <i class="el-icon-house"></i>
            <router-link slot="title" to="/student/statistics">信息概览</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <router-link slot="title" to="/student/list">全部学生</router-link>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-school"></i>
              <span>学院</span>
            </template>
            <el-menu-item :index="3 + '-' + index" v-for="(item, index) in $store.state.college" :key="item">
              <router-link slot="title" :to="{ path: '/student/list/' + item }">{{ item }}</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-document-add"></i>
            <router-link slot="title" to="/student/add">新增学生</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- <transition> -->
        <router-view></router-view>
        <!-- </transition> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      college: []
    }
  },
  created() {
    this.$request({
      url: '/group'
    }).then(res => {
      if (res.code === 200) {
        this.$store.commit('setCollege', res.college)
        this.$store.commit('setProvince', res.province)
      }
    })
  }
}
</script>

<style>
.home {
  height: 100vh;
}
.sidebar {
  height: calc(100vh - 60px);
  overflow: auto;
  background-color: #1e50a2;
}

.sidebar a {
  display: inline-block;
  height: 100%;
  color: #ffffff80;
}

.sidebar .router-link-exact-active {
  color: #fff;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: var(--themeColor);
}

.header i {
  margin-right: 10px;
}
</style>

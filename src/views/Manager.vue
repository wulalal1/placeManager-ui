<template>
  <div class="manager-container">
    <!--  头部  -->
    <div class="manager-header">
      <div class="manager-header-left">
        <img src="@/assets/imgs/logo.png" />
        <div class="title">BMSystem</div>
      </div>

      <div class="manager-header-center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: $route.path }">{{ $route.meta.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="manager-header-right">
        <el-dropdown placement="bottom">
          <div class="avatar">
            <img :src="user.avatar"  alt=""/>
            <div style="cursor: pointer">{{ user.name ||  'user.id' }}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="goToPerson">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/password')">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!--  主体  -->
    <div class="manager-main">
      <!--  侧边栏  -->
      <div class="manager-main-left">
        <el-menu router style="border: none" :default-active="$route.path">

            <el-menu-item index="/home">
              <i class="el-icon-s-home"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>

          <el-submenu index="info">
            <template slot="title">
              <i class="el-icon-s-finance"></i><span>信息管理</span>
            </template>
            <el-menu-item index="/notice">体育公告信息</el-menu-item>
            <el-menu-item index="/blog">内容信息</el-menu-item>
            <el-menu-item index="/category">内容分类</el-menu-item>
            <el-menu-item index="/comment">评论信息</el-menu-item>
          </el-submenu>

          <el-submenu index="cdInfo">
            <template slot="title">
              <i class="el-icon-house"></i><span>场地管理</span>
            </template>
            <el-menu-item index="/type">场地分类</el-menu-item>
            <el-menu-item index="/place">场地信息</el-menu-item>
          </el-submenu>

          <el-submenu index="yxinfo">
            <template slot="title">
              <i class="el-icon-thumb"></i><span>预约管理</span>
            </template>
            <el-menu-item index="/reservation">预约信息</el-menu-item>
          </el-submenu>

          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-menu"></i><span>用户管理</span>
            </template>
            <el-menu-item index="/admin">管理员信息</el-menu-item>

            <el-menu-item index="/user">用户信息</el-menu-item>
          </el-submenu>


        </el-menu>
      </div>

      <!--  数据表格  -->
      <div class="manager-main-right">
        <router-view @update:user="updateUser" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Manager",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('xm-user') || '{}'),
    }
  },
  created() {
    if (!this.user.id || this.user.role !== 'ADMIN' ) {
      this.$router.push('/login')
    }
  },
  methods: {
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('xm-user') || '{}')   // 重新获取下用户的最新信息
    },
    goToPerson() {
      if (this.user.role === 'ADMIN') {
        this.$router.push('/adminPerson')
      }
      if(this.user.role === 'PLACE'){
        this.$router.push('placePerson')
      }
    },
    logout() {
      localStorage.removeItem('xm-user')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/manager.css";
</style>

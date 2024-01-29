<template>
  <div class="container">
    <div style="width: 380px; padding: 50px 30px; background-color: white; border-radius: 5px;">
      <div style="text-align: center; font-weight: bold; font-size: 20px; margin-bottom: 20px; color: black">场地管理系统</div>
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input  size="medium" prefix-icon="el-icon-user" placeholder="请输入账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password  v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item  prop="role">
          <el-radio-group v-model="form.role">
            <el-radio label="ADMIN">管理员</el-radio>
            <el-radio label="USER"> 用户</el-radio>
          </el-radio-group>
          <el-form-group prop="code">
            <div style="display: flex">
              <el-input style="flex: 1" v-model="code" ></el-input>
              <span @click="refreshCode" style="cursor: pointer;flex: 1;">
                <Identify :identifyCode="identityCode" @click.native="refreshCode" ></Identify>
              </span>

            </div>

          </el-form-group>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" style="width: 100%; background-color: #3775b9; border-color: #3a56b7; color: white" @click="login">登 录</el-button>
        </el-form-item>
        <div style="display: flex; align-items: center">
          <div style="flex: 1"></div>
          <div style="flex: 1; text-align: right">
            还没有账号  请<a href="/register">注册</a>
         </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Identify from "@/components/identify.vue";

export default {
  name: "Login",
  components:{
    Identify,
  },

  data() {
    return {
      form: { role: 'ADMIN' },
      code:'', //绑定验证码
      identityCode: '',//验证规则
      identifyCodes:'123456789ABCDEFGHKMNPQRSTUVWXYZ',
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  comments:{Identify},
  mounted() {
    this.refreshCode();
  },
  created() {

  },
  methods: {
    //切换验证码
    refreshCode(){
      this.identityCode = ''
      this.makeCode(this.identifyCodes,4)
    },
    makeCode(o,l){
      for(let i=0;i<l;i++){
        this.identityCode += this.identifyCodes[Math.floor(Math.random()*(this.identifyCodes.length))]
      }
    },
    login() {
      if(!this.code){
        this.$message.warning('请输入验证码')
        this.refreshCode()
        return
      }
      if(this.code.toLowerCase() !== this.identityCode.toLowerCase()){
        this.$message.warning('验证码错误')
        this.refreshCode()
        return
      }

      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          // 验证通过
          this.$request.post('/login', this.form).then(res => {
            if (res.code === '200') {
              localStorage.setItem("xm-user", JSON.stringify(res.data))  // 存储用户数据
              this.$message.success("登陆成功")
              setTimeout(() => {
                if (res.data.role === 'ADMIN') {
                  location.href = '/home'
                } else {
                  location.href = '/front/home'  // 跳转主页
                }
              }, 600)//跳转主页
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/imgs/bg1.jpg");
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
a {
  color: #2a60c9;
}
</style>
<template>
  <div class="login-bg">
    <div class="login-box">
      <h3>Device Maintenance Management System</h3>
      <el-form
        ref="form"
        label-width="0"
        class="login-form"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="id">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="form.id"
            placeholder="Please enter your login account."
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="form.password"
            placeholder="Please enter your password."
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btns">
            <div class="login-btn">
              <el-button type="primary" @click="loginLogic">Login</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { loginApi } from "../api/http";
import store from "../store"
export default {
  data() {
    return {
      form: {
        id: "",
        password: ""
      },
      rules: {
        id: [
          {
            required: true,
            message: "Please enter your login account",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter your password",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //引入vuex中的函数
    ...mapMutations(["buildDynamicRoute", "setToken", "setUrl","setUserId","setRole"]),
    //登录请求函数
    login() {
      this.init();
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        const res = await loginApi(this.form);
        if (res.data.flag) {
          this.$message.success("Login Success!");
          const urls = res.data.data.menuList.map(item => item.url);
          this.setUrl(urls);
          this.buildDynamicRoute();
          this.setToken(res.data.data.token);
          this.setUserId(res.data.data.userId);
          this.setRole(res.data.data.role);
          this.$router.push({ name: "index" });
        } else {
          this.$refs.form.resetFields();
          return this.$message.error(res.data.msg);
        }
      });
    },
    loginLogic(){
      var userInfo;
      if(this.$cookie.get('UserInfo')){
        userInfo = JSON.parse(this.$cookie.get('UserInfo'));
      }else{
        return this.login();
      }
      if(userInfo.userId&&userInfo.userId!==this.form.id){
        return this.$message({
          title:"Login denied.",
          message:"There is already a logged-in user in the current browser."
        });
      }else{
        return this.login();
      }
    },
    //初始化vuex中的数据
    init() {
      this.setToken("");
      this.setUrl([]);
      this.setUserId("");
      this.setRole("");
    }
  }
};
</script>
<style scoped>
.login-bg {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/backgroundpicture.jpg")
    no-repeat;
  background-size: 100% 100%;
}
.login-bg h3 {
  text-align: center;
  color: #fff;
  border-bottom: 1px solid #fff;
  margin: 0;
  padding: 20px 0;
}
.login-box {
  border-radius: 10%;
  width: 400px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  box-shadow: 0 0 10px #ddd;
}
.login-form {
  margin-top: 32px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.login-btn {
  text-align: center;
}
.login-btn .el-button {
  width: 100%;
}
.update-btn {
  text-align: right;
}
.update-btn .el-button {
  color: #fff;
}
</style>

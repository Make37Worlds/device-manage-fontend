<template>
  <div class="login-bg">
    <div class="login-box">
      <h3>修改密码</h3>
      <el-form
        ref="form"
        label-width="0"
        class="login-form"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="oldPassword">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="form.oldPassword"
            placeholder="请输入原始密码"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="form.newPassword"
            placeholder="请输入新密码"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="form.confirmPassword"
            placeholder="请确认新密码"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btns">
            <div class="login-btn">
              <el-button type="primary" @click="update">修改</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import { updateApi } from "../../api/http";
import store from "../../store"
export default {
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            validator: (rule, value, callback) => {
              if (this.form.newPassword !== value) {
                callback(new Error("两次新密码输入不一致"));
              }
              callback();
            }
          }
        ]
      }
    };
  },
  computed:{
    id(){
      return store.getters.getUserId;
    }
  },

  methods: {
    update() {
      this.$refs.form.validate(valid => {
        if (!valid) return;
        updateApi({id:store.getters.getUserId, oldPassword: this.form.oldPassword, newPassword: this.form.newPassword }).then(res => {
          if(res.data.flag){
            var timer = 3;
            store.commit('clear');
            this.$notify({
              type:"success",
              title:"修改密码成功",
              message:timer+"秒后跳转至登录页面重新登录",
              duration:3000,
              onClose:()=>{
                this.$router.push({name:'login'})
              }
            });
            store.commit('clear');
          }else{
            this.$notify.error({
              title:"修改密码失败",
              message:res.data.msg,
            });
          }
        })
        
      });
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
  background: url("../../assets/backgroundpicture.jpg")
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

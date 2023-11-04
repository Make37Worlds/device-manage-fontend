<template>
  <div class="login-bg">
    <div class="login-box">
      <h3>Change Password</h3>
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
            placeholder="Please enter the original password."
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="form.newPassword"
            placeholder="Please enter new password."
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="form.confirmPassword"
            placeholder="Please confirm the new password."
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btns">
            <div class="login-btn">
              <el-button type="primary" @click="update">Update</el-button>
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
            message: "Please enter the original password",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "Please enter new password",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            validator: (rule, value, callback) => {
              if (this.form.newPassword !== value) {
                callback(new Error("The two passwords do not match."));
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
              title:"Password changed successfully.",
              message:timer+"seconds before you are redirected to the login page",
              duration:3000,
              onClose:()=>{
                this.$router.push({name:'login'})
              }
            });
            store.commit('clear');
          }else{
            this.$notify.error({
              title:"Password changed failed.",
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

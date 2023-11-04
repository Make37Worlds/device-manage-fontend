<template>
  <el-popover
    class="showUser"
    placement="bottom"
    width="250"
    trigger="hover">
    <div class="User" >
      <div class="info">
        <h3>Current User: {{userId}}</h3>
        <p>Current Role: {{role}}</p>
      </div>
      <div class="op">
        <el-button type="primary" @click="updatePassword" round>Change Password</el-button>
        <el-button type="warning" @click="logout" round>Logout</el-button>
      </div>
    </div>
    <img slot="reference" id="user" src="../assets/user.png">
  </el-popover>
</template>

<script>
import store from "../store"
import axios from "axios"
  export default {
    name: "CurrentUser",
    computed:{
      userId(){
        return store.state.userId;
      },
      role(){
        return store.state.role;
      }
    },
    methods:{
      updatePassword(){
        this.$router.push({
          path:'/updatePassword'
        })
      },
      logout(){
        this.$confirm('Confirm Logout?', '提示', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          axios.delete("/efms/loginManage/logout/"+store.getters.getUserId).then((res)=>{
            if(res.data.flag){
              store.commit('clear');
              this.$router.replace({
                path:'/login'
              })
            }
          })
        }).catch(() => {});

      },
    },
  }
</script>

<style scoped>
#user{
  width:50px;
  height:50px;
}
.User{
  width:250px;
  height:120px;
  text-align: center;
}
.op{
  display: flex;
  margin-left:16px;
}
.el-button{
  text-align: center;
}
</style>

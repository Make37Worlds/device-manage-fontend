<template>
  <div class="header">
    <img id="logo" src="../assets/logo.png">
    <span id="title">Device Maintenance Management System</span>
    <div id="user">
      <CurrentUser></CurrentUser>
    </div>
  </div>


</template>

<script>
  import CurrentUser from "./CurrentUser";
  export default {
    name: "Header",
    components:{
      CurrentUser,
    }
  }
</script>

<style scoped>
.header{
  display: flex;
}
.leftside{
  display: flex;
}
.rightside{
  float: right;
  margin-top:25px;
}
#logo{
  width: 50px;
  height: 50px;
  margin-top:25px;
}
#title{
  margin-top:25px ;
  font-size:2.5em;
  font-family: '幼圆';
}
#user{
  margin: 25px 0 0 auto;
}
</style>

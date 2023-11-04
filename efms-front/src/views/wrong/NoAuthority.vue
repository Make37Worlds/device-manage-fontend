<template>
  <div class="main-body">
    <div class="box">
      <h1>当前用户无权限，访问页面失败。</h1>
      <h3>即将跳转至上一页面</h3>
    </div>
  </div>
</template>

<script>
export default {
  name:'noAuthority',
  created(){
    setTimeout(()=>{
      this.$router.push({path:this.$route.params.path});
    },5000)
  }
}
</script>

<style scoped>
.main-body {
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
.box{
  border-radius: 10%;
  width: 600px;
  height: 130px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  box-shadow: 0 0 10px #ddd;
}
</style>
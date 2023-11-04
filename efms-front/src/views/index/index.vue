<template>
  <div class="layout">
    <el-container >
      <el-header height="100px" class="header" ><Header></Header></el-header>
      <el-container >
        <div class="body">
          <el-aside class="menu" width="200px">
            <Menu></Menu>
          </el-aside>
          <el-main class="content">
            <el-card :body-style="{padding:'14px'}">
              <router-view></router-view>
            </el-card>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Header from "../../components/Header";
  import Menu from "../../components/Menu";

  export default {
    name: "Index",
    components:{
      Header,
      Menu,
    },
    
  }
</script>

<style scoped>
  .layout{
    display: flex;
    background-color: #FBFAFF;
    position: relative;
    width: 100%;
    height:100%;
  }
  .header{
    background-color: #BBD0EA;
    color: #3B5173;
    width:100%;
    height: 100px;
  }
  .body{
    display: flex;
    height:calc(100%-100px) ;
  }
  .menu{
    background-color:#3B5173;
  }
  .content{
    height: 504px;
    width: 1063px;
  }
</style>

<template>
  <div class="menu">
    <el-menu 
    :default-active="activeIndex" 
    background-color="#3B5173"  
    text-color="#FEFFFF"
    active-text-color="#5D87A8"
    router 
    @select="handleSelect">
      <el-menu-item
        v-for="(item, index) in menuRoute"
        :index="item.path"
        :key="index"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { menuRoute } from "../router";
import store from "../store";
import router from "../router";
export default {
  name: "Menu",
  data() {
    return {
      activeIndex: '/home',
      menuRoute: []
    };
  },
  created() {
    this.menuRoute = menuRoute.filter(item =>
      store.state.path.includes(item.path)
    );
    this.activeIndex = router.currentRoute.path;
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    }
  }
};
</script>
<style scoped>
  .menu{
    height: 500px;
  }
  .el-menu{
    border-right: 0;
  }
</style>
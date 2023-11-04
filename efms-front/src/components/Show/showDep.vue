<template>
  <el-tag>{{depName}}</el-tag>
</template>

<script>
export default {
    props:['depId'],
    data(){
        return{
            depName:"",
        }
    },
    methods:{
      getDep(id){
        switch(id){
          case 1:
            this.depName="总裁办";
            break;
          case 2:
            this.depName="维修部";
            break;
          case 3:
            this.depName="销售部";
            break;
          case 4:
            this.depName="运营部";
            break;
          case 5:
            this.depName="人事部";
            break;
          default:
            break;
        };
      }
    },
    created(){
        this.getDep(this.depId);
    },
    watch:{
      depId(val){
        this.getDep(val);
      }
    }
}
</script>

<style>

</style>
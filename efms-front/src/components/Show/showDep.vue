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
            this.depName="President Office";
            break;
          case 2:
            this.depName="Maintenance Department";
            break;
          case 3:
            this.depName="Sales Department";
            break;
          case 4:
            this.depName="Operations Department";
            break;
          case 5:
            this.depName="Personnel Department";
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

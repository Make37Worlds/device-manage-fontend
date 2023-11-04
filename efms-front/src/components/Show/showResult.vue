<template>
    <el-tag :type="type">{{resultString}}</el-tag>
</template>

<script>
export default {
    props:['result'],
    data(){
        return{
            resultString:"",
            type:"",
        }
    },
    methods:{
      getResult(result){
        switch(result){
          case 1:
            this.resultString="待审";
            break;
          case 2:
            this.resultString="通过";
            this.type="success";
            break;
          case 3:
            this.resultString="未通过";
            this.type="danger";
            break;
          default:
            break;
        };
      }
    },
    created(){
      this.getResult(this.result);
    },
    watch:{
      result(val){
        this.getResult(val);
      }
    }
}
</script>

<style>

</style>
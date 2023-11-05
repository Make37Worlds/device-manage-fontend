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
            this.resultString="Not Reviewed";
            break;
          case 2:
            this.resultString="Approved";
            this.type="success";
            break;
          case 3:
            this.resultString="Not Approved";
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

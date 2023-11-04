<template>
    <el-tag type="success">{{stateString}}</el-tag>
</template>

<script>
export default {
    props:['state'],
    data(){
        return{
            stateString:"",
        }
    },
    methods:{
      getState(state){
        switch(state){
          case 1:
            this.stateString="已申报";
            break;
          case 2:
            this.stateString="已派遣";
            break;
          case 3:
            this.stateString="已追加申报";
            break;
          case 4:
            this.stateString="追加申报已通过";
            break;
          case 5:
            this.stateString="追加申报未通过";
            break;
          case 6:
            this.stateString="成果已上报";
            break;
          case 7:
            this.stateString="成果审核通过";
            break;
          case 8:
            this.stateString="成果审核未通过";
            break;
          default:
            this.stateString="进度获取失败";
            break;
        };
      }
    },
    created(){
      this.getState(this.state);
    },
    watch:{
      state(val){
        this.getState(val);
      }
    }
}
</script>

<style>

</style>
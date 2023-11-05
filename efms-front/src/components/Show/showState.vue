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
            this.stateString="Damage Reported";
            break;
          case 2:
            this.stateString="Dispatched";
            break;
          case 3:
            this.stateString="Additional Declared";
            break;
          case 4:
            this.stateString="Additional Declaration Approved";
            break;
          case 5:
            this.stateString="Additional Declaration Not Approved";
            break;
          case 6:
            this.stateString="Result Reported";
            break;
          case 7:
            this.stateString="Result Report Approved";
            break;
          case 8:
            this.stateString="Result Report Not Approved";
            break;
          default:
            this.stateString="Failed to retrieve progress";
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

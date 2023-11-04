<template>
 <div>
   <el-pagination
     background
     layout="total, prev, pager, next, jumper"
     @current-change="handleCurrentChange"
     :hide-on-single-page="true"
     :total="total"
     :page-size="pageSize">
   </el-pagination>
 </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:{
      total:{
        type:Number,
        default:0,
      },
      pageSize:{
        type:Number,
        default:10,
      },
    },

    date(){
      return {
        current:1,
      }
    },
    watch:{
      currentPage(val){
        this.current=val;
      }
    },
    methods:{
      handleCurrentChange(changeTo){
        this.$emit('changePage',changeTo)
      }
    }
  }
</script>

<style scoped>

</style>

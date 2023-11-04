<template>
  <div class="main-body">
    <!-- 待派遣维修单 -->
    <div class="data-table">
      <el-table
        :data="dispatchList"
        border
        class="table">
        <el-table-column prop="id" label="Maintenance Order ID" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="Report Time" width="180">
        </el-table-column>
        <el-table-column prop="createBy" label="Maintenance Applicant ID" width="180">
        </el-table-column>
        <el-table-column prop="facId" label="Facility ID" width="180">
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button @click="handleDispatch(scope.row.id)" type="text" size="small">Dispatch/el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <el-empty description="No data available currently."></el-empty>
        </template>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <div class="pagination">
      <Pagination :pageSize="pagination.pageSize" :total="pagination.total" @changePage="changePage"></Pagination>
    </div>

    <!-- 待派遣维修单详情-->
    <DispatchDetailDialog :dialog-visible="dialog4DispatchVisible" :fixlog-info="FixLog2View" @submit="submitDispatch" @closeDialog="closeDialog4Dispatch"></DispatchDetailDialog>
  </div>
</template>

<script>
  import DispatchDetailDialog from './DispatchDetailDialog.vue'
  import Pagination from '../../../components/Pagination.vue'
  import axios from 'axios'
  import store from '../../../store'
  export default {
    name: "Dispatch",
    components:{
      DispatchDetailDialog,
      Pagination,
    },
    data(){
      return{
        //分页信息
        pagination:{
          currentPage:1,
          total:0,
          pageSize:5,
        },
        dispatchList:[],
        dialog4DispatchVisible:false,
        FixLog2View:{},
      }
    },
    created(){
      this.getPage();
    },
    methods:{
      //获取某一页
      getPage(){
        axios.get("/efms/dispatch/"+this.pagination.currentPage+"/"+this.pagination.pageSize+"/"+store.getters.getUserId).then((res)=>{
          if(res.data.data!=null && res.data.flag){
            this.dispatchList=res.data.data.records;
            this.pagination.currentPage=res.data.data.current;
            this.pagination.total=res.data.data.total;
            this.pagination.pageSize=res.data.data.size;
          }
          else{
            this.$notify.error({
              title:res.data.msg,
            })
          }
        })
      },
      //打开派遣弹框，获取对应数据
      handleDispatch(id){
        axios.get("/efms/dispatch/"+id).then((res)=>{
          if(res.data.data!=null && res.data.flag){
            this.FixLog2View=res.data.data;
            this.dialog4DispatchVisible=true;
          }
          else{
            this.$notify.error({
              title:res.data.msg,
            })
          }
        }).finally(()=>{
          this.getPage();
        })
      },
      //更换当前页
      changePage(changeTo){
        this.pagination.currentPage=changeTo;
        this.getPage();
      },
      //派遣提交
      submitDispatch(logId,fixBy){
        var dispatchInfo={logId,fixBy};
        axios.put("/efms/dispatch",dispatchInfo).then((res)=>{
          if(res.data.flag){
            this.dialog4DispatchVisible=false;
            this.$notify({
              title:"Dispatched success",
              type:'success',
            })
          }else{
            this.$notify.error({
              title:res.data.msg,
            })
          }
        }).finally(()=>{
          this.getPage();
        })
      },

      closeDialog4Dispatch(){
        this.dialog4DispatchVisible=false;
      }
    }
  }
</script>

<style scoped>
  .main-body{
    width: 964px;
    min-height:432px;
  }
  .data-table{
    min-height: 335px;
  }
</style>

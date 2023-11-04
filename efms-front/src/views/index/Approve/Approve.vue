<template>
  <div class="main-body">
    <!-- 展示待审核的追加申报单数据 -->
    <div class="data-table">
      <el-table :data="approveList" border class="table">
        <el-table-column prop="id" label="追加申报单编号" width="180"></el-table-column>
        <el-table-column prop="logId" label="维修单号" width="180"></el-table-column>
        <el-table-column prop="addBudget" label="追加的预算"></el-table-column>
        <el-table-column prop="createBy" label="追加申报人">
          <template slot-scope="scope">
            <show-name :id="scope.row.createBy"></show-name>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row.id)" type="text" size="small">审  批</el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <el-empty description="当前无数据"></el-empty>
        </template>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <div class="pagination">
      <Pagination :pageSize="pagination.pageSize" :total="pagination.total" @changePage="changePage"></Pagination>
    </div>

    <div class="option">
      <el-button type="primary" icon="el-icon-refresh" @click="getPage">刷 新</el-button>
    </div>

    <!-- 展示待审核追加申报单详情 -->
    <ApproveDialog ref="dialog4Approve" :dialog-visible="dialog4ApproveVisible" :approve-detail="approveDetail" @submitApprove="submitApprove" @closeDialog="closeDialog"></ApproveDialog>
  </div>
</template>

<script>
  import ApproveDialog from './ApproveDialog.vue';
  import Pagination from '../../../components/Pagination.vue'
  import showName from "../../../components/Show/showName.vue"
  import axios from 'axios';
  import store from '../../../store'
  export default {
    name:"Approve",
    components: {
      ApproveDialog, 
      Pagination,
      showName,
    },
    data(){
      return{
        dialog4ApproveVisible:false,
        pagination:{
          total:0,
          currentPage:1,
          pageSize:5,
        },

        approveDetail:{},
        approveList:[],
      }
    },
    created(){
      this.getPage();
    },
    methods:{
      getPage(){
        console.log("咋不更新啊");
        axios.get("/efms/approve/"+this.pagination.currentPage+"/"+this.pagination.pageSize+"/"+store.getters.getUserId).then((res)=>{
          if(res.data.flag && res.data.data!=null){
            this.approveList=res.data.data.records;
            this.pagination.total=res.data.data.total;
            this.pagination.currentPage=res.data.data.current;
            this.pagination.pageSize=res.data.data.size;
          }
          else{
            this.$notify.error({
              title:res.data.msg,
            })
          }
        })
      },
      
      changePage(changeTo){
        this.pagination.currentPage=changeTo;
        this.getPage();
      },

      handleDetail(id){
        axios.get("/efms/approve/"+id).then((res)=>{
          if(res.data.flag && res.data.data!=null){
            this.approveDetail=res.data.data;
            this.dialog4ApproveVisible=true;
          }
          else{
            this.$notify.error({
              title:res.data.msg,
            })
          }
        })
      },

      submitApprove(id,approveInfo){
        var result={
          id,
          ...approveInfo
        }
        axios.put("/efms/approve",result).then((res)=>{
          if(res.data.flag){
            this.dialog4ApproveVisible=false;
            this.$notify({
              title:res.data.msg,
              type:'success'
            });
          }
          else{
            this.$refs['dialog4Approve'].handleException(res.data.msg);
          }
        }).finally(()=>{
          this.getPage();
        })
      },

      closeDialog(){
        this.dialog4ApproveVisible=false;
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
  .option{
    margin-top: 10px;
  }
</style>
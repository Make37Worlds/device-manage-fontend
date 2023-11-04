<template>
  <div class="main-body">

    <!-- 展示待审核成果单数据 -->
    <div class="data-table">
      <el-table
        :data="reportList"
        border
        style="width: 100%"
        class="table">
        <el-table-column
          prop="id"
          label="Result ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="logId"
          label="Maintenance Order ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createBy"
          label="Maintenance Technician ID">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="Time of Report">
        </el-table-column>
        <el-table-column
          label="Operation">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row.id)" type="text" size="small">审  核</el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <el-empty description="No data available yet"></el-empty>
        </template>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <div class="pagination">
      <Pagination :pageSize="pagination.pageSize" :total="pagination.total" @changePage="changePage"></Pagination>
    </div>

    <div class="option">
      <el-button type="primary" icon="el-icon-refresh" @click="getPage">Refresh</el-button>
    </div>

    <!-- 展示待审核成果细节-->
    <ResultDetailDialog ref="dialog4Review" @closeDialog="closeDialog" @submitReview="submitReview" :dialog-visible="dialog4ReviewVisible" :review-detail="reviewDetail"></ResultDetailDialog>
  </div>
</template>

<script>
  import ResultDetailDialog from "./ResultDetailDialog";
  import Pagination from '../../../components/Pagination.vue'
  import axios from "axios";
  import store from '../../../store'
  export default {
    components:{
      ResultDetailDialog,
      Pagination,
    },
    name: "Review",
    data(){
      return {
        //弹框展示变量
        dialog4ReviewVisible:false,
        //分页信息
        pagination:{
          total:0,
          currentPage:1,
          pageSize:5,
        },
        reviewDetail:{},
        reportList:[],
      }
    },
    created(){
      this.getPage();
    },
    methods:{
      //获取某一页
      getPage(){
        axios.get("/efms/resultreview/"+this.pagination.currentPage+"/"+this.pagination.pageSize+"/"+store.getters.getUserId).then((res)=>{
          if(res.data.flag && res.data.data!=null){
            this.reportList=res.data.data.records;
            this.pagination.total=res.data.data.total;
            this.pagination.currentPage=res.data.data.current;
            this.pagination.pageSize=res.data.data.size;
          }else{
              this.$notify.error({
              title:res.data.msg,
            })
          }
        })
      },
      //当前页更换函数
      changePage(changeTo){
        this.pagination.currentPage=changeTo;
        this.getPage();
      },
      //获取待审核成果的详细数据
      handleDetail(id){
        axios.get("/efms/resultreview/"+id).then((res)=>{
          if(res.data.flag && res.data.data!=null){
            //获取数据成功，则显示弹框
            this.reviewDetail=res.data.data;
            this.dialog4ReviewVisible=true;
          }else{
            //获取数据失败，显示失败信息
            this.$notify.error({
              title:res.data.msg,
            })
          }
        })
      },
      submitReview(id,reviewInfo){
        var result={
          id,
          ...reviewInfo
        }
        axios.put("/efms/resultreview",result).then((res)=>{
          if(res.data.flag){
            //审核信息提交成果，关闭弹框，显示信息
            this.dialog4ReviewVisible=false;
            this.$notify({
              title: res.data.msg,
              type: 'success'
            });
          }else{//审核信息提交失败，调用弹框的异常处理函数
            this.$refs['dialog4Review'].handleException(res.data.msg);
          }
        }).finally(()=>{
          this.getPage();
        })
      },
      closeDialog(){
        this.dialog4ReviewVisible=false;
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

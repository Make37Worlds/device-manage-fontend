<template>
  <div class="main-body">

    <!-- 搜索 -->
    <div class="search">
      <div class="search-input">
        <el-input clearable v-model.number="searchInfo.logId" placeholder="输入维修单号"  prefix-icon="el-icon-search"></el-input>
        <el-input clearable v-model="searchInfo.createBy" placeholder="输入申报人编号"  prefix-icon="el-icon-search"></el-input>
        <el-select v-model.number="searchInfo.result" placeholder="请选择">
          <el-option label="Not Reviewed" value=1></el-option>
          <el-option label="Approved" value=2></el-option>
          <el-option label="Not Approved" value=3></el-option>
        </el-select>
      </div>
      <div class="search-button">
        <el-button type="primary" @click="handleSearch">Search</el-button>
        <el-button @click="resetSearch">Reset</el-button>
        <el-button @click="getPage">Mine</el-button>
      </div>
    </div>

    <!-- 展示已上报数据 -->
    <div class="data-table">
      <el-table
        :data="reportList"
        border
        class="table">
        <el-table-column
          prop="id"
          label="Report ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="logId"
          label="Maintenance Order ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createBy"
          label="Maintenance Technician">
          <template slot-scope="scope">
            <show-name :id="scope.row.createBy"></show-name>
          </template>
        </el-table-column>
        <el-table-column
          prop="result"
          label="Review Result">
          <template slot-scope="scope">
            <show-result :result="scope.row.result"></show-result>
          </template>
        </el-table-column>
        <el-table-column
          label="Detail">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row.id)" type="text" size="small">View</el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <el-empty description="No data available yet"></el-empty>
        </template>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <div class="pagination">
      <Pagination :total="pagination.total" :page-size="pagination.pageSize" @changePage="changePage"></Pagination>
    </div>

    <!-- 展示成果申报细节-->
    <ReviewDetailDialog :dialog-visible="dialog4ViewVisible" :result-report-info="resultReport2View" @closeDialog="closeDialog"></ReviewDetailDialog>
  </div>
</template>

<script>
  import ReviewDetailDialog from './ReviewDetailDialog.vue'
  import Pagination from '../../../components/Pagination.vue'
  import showResult from "../../../components/Show/showResult.vue"
  import showName from "../../../components/Show/showName.vue"
  import axios from 'axios'
  import store from '../../../store'
  export default {
    name: "ResultReport",
    components:{
      ReviewDetailDialog,
      Pagination,
      showResult,
      showName,
    },
    data(){
      return{
        //分页信息
        pagination:{
          currentPage:1,
          total:0,
          pageSize:5,
        },
        //搜索信息
        searchInfo:{
          logId:'',
          createBy:'',
          result:'',
          flag:false,//用来标识获取默认信息还是搜索信息
        },
        reportList:[],
        dialog4ViewVisible:false,
        resultReport2View:{},
      }
    },
    created(){
      this.getPage();
    },
    methods:{
      //获取某一页
      getPage(){
        this.searchInfo.flag=true;
        var param="?q&createBy="+store.getters.getUserId;
        axios.get("/efms/resultreport/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
          if(res.data.data!=null && res.data.flag){
            this.reportList=res.data.data.records;
            this.pagination.currentPage=res.data.data.current;
            this.pagination.total=res.data.data.total;
            this.pagination.pageSize=res.data.data.size;
          }else{
            this.$notify.error({
              title:res.data.msg,
            })
          }
        })
      },
      //搜索
      handleSearch() {
        this.searchInfo.flag=true;

        var param="?q";
        param+="&logId="+this.searchInfo.logId;
        param+="&createBy="+this.searchInfo.createBy;
        param+="&result="+this.searchInfo.result;

        axios.get("/efms/resultreport/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
          if(res.data.data!=null && res.data.flag){
            this.reportList=res.data.data.records;
            this.pagination.currentPage=res.data.data.current;
            this.pagination.total=res.data.data.total;
            this.pagination.pageSize=res.data.data.size;
          }else{
            this.$notify.error({
              title:res.data.msg,
            })
          }
        })
      },
      //清空搜索框
      resetSearch() {
        this.searchInfo.logId='';
        this.searchInfo.createBy="";
        this.searchInfo.result='';
      },
      //获取成果单详情
      handleDetail(id){
        axios.get("/efms/resultreport/"+id).then((res)=>{
          if(res.data.flag && res.data.data!=null){//获取成功，打开弹框
            this.resultReport2View=res.data.data;
            this.dialog4ViewVisible=true;
          }else{//获取失败，提示错误信息
            this.$notify.error({
              title:res.data.msg,
            })
          }
        })
      },
      //变换当前页
      changePage(changeTo){
        this.pagination.currentPage=changeTo;
        this.searchInfo.flag?this.handleSearch():this.getPage();
      },
      //关闭弹框
      closeDialog(){
        this.dialog4ViewVisible=false;
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
  .search{
    display: flex;
    margin-bottom: 10px;
  }
  .el-input{
    width: 200px;
  }
  .search-button{
    margin-left: 10px;
  }

</style>

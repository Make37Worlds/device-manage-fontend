<template>
<div class="main-body">
  <!-- 搜索功能 -->
  <div class="search">
    <div class="search-input">
      <el-input v-model.number="searchInfo.logId" placeholder="Enter the maintenance order ID"  prefix-icon="el-icon-search"></el-input>
      <el-input clearable v-model="searchInfo.employee" placeholder="Enter personnel ID"  prefix-icon="el-icon-search"></el-input>
    </div>
    <div class="search-button">
      <el-button type="primary" @click="handleSearch">Search</el-button>
      <el-button @click="resetSearch">Reset</el-button>
      <el-button @click="getPage">Mine</el-button>
    </div>
  </div>

  <!-- 展示已有的维修单数据 -->
  <div class="data-table">
    <el-table :data="fixLogList" max-height="500" border class="table">
      <el-table-column prop="id" label="Maintenance Order ID" width="100"></el-table-column>
      <el-table-column prop="createBy" label="Repair Applicant" width="120">
        <template slot-scope="scope">
          <show-name :id="scope.row.createBy"></show-name>
        </template>
      </el-table-column>
      <el-table-column prop="fixBy" label="Maintenance Technician" width="120">
        <template slot-scope="scope">
          <show-name :id="scope.row.fixBy"></show-name>
        </template>
      </el-table-column>
      <el-table-column prop="head" label="Person in Charge" width="120">
        <template slot-scope="scope">
          <show-name :id="scope.row.head"></show-name>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="Current Progress" width="150">
        <template slot-scope="scope">
          <show-state :state="scope.row.state"></show-state>
        </template>
      </el-table-column>
      <el-table-column label="Detail" width="100">
        <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row.id)" type="text" size="small">View</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Operation">
        <template slot-scope="scope">
          <div v-show="currentUser===scope.row.fixBy">
            <div v-show="scope.row.state===2||scope.row.state===4||scope.row.state===5||scope.row.state===8">
              <el-button  @click="handleAddDeclaration(scope.row.id)" type="text" size="small">Additional Declaration</el-button>
              <el-button  @click="handleResultReport(scope.row.id)" type="text" size="small">Result Reporting</el-button>
            </div>
            <div v-show="scope.row.state===1||scope.row.state===3||scope.row.state===6||scope.row.state===7">
              <el-tag type="info" effect="dark">Current status of maintenance order is not operable.</el-tag>
            </div>
          </div>
          <div v-show="currentUser!==scope.row.fixBy">
            <el-tag type="warning" effect="dark">Not maintenance technician, operation not allowed.</el-tag>
          </div>
        </template>
      </el-table-column>
      <template slot="empty">
        <el-empty description="No data available currently."></el-empty>
      </template>
    </el-table>

  </div>

  <!-- 分页组件 -->
  <div class="pagination">
    <Pagination :total="pagination.total" :pageSize="pagination.pageSize" @changePage="changePage"></Pagination>
  </div>

  <!-- 展示维修单详情 -->
  <FixLogDetailDialog :dialog-visible="dialog4ViewVisible" :fix-log-info="fixLog2View" @closeDialog="closeDialog4Detail"></FixLogDetailDialog>

  <!-- 追加申报弹框 -->
  <AddDeclarationDialog ref="dialog4AddDeclaration" :logId="log2AddDeclare" :dialogVisible="dialog4AddDeclarationVisible" @submitForm="submitAddDeclaration" @closeDialog="closeDialog4AddDeclaration"></AddDeclarationDialog>

  <!-- 成果上报弹框 -->

  <ReportResultDialog ref="dialog4Report" :lodId="log2Report" :dialogVisible="dialog4ReportVisible" :logId="log2Report" @submitForm="submitReport" @closeDialog="closeDialog4Report"></ReportResultDialog>


</div>


</template>

<script>
  import AddDeclarationDialog from "./AddDeclarationDialog.vue";
  import FixLogDetailDialog from "./FixLogDetailDialog.vue";
  import ReportResultDialog from "./ReportResultDialog.vue";
  import Pagination from "../../../components/Pagination.vue";
  import showName from "../../../components/Show/showName.vue";
  import showState from "../../../components/Show/showState.vue";
  import axios from "axios";
  import store from "../../../store";

  export default {
    name: "Home",
    components:{
      ReportResultDialog,
      FixLogDetailDialog,
      AddDeclarationDialog,
      Pagination,
      showName,
      showState,
    },
    data(){
      return {
        //分页信息
        pagination:{
          currentPage:1,
          total:0,
          pageSize:5,
        },
        //搜索信息
        searchInfo:{
          logId:'',
          employee:'',
          flag:false,
        },

        fixLogList:[],
        dialog4ViewVisible:false,
        fixLog2View:{},

        log2AddDeclare:'',
        dialog4AddDeclarationVisible:false,

        log2Report:'',
        dialog4ReportVisible:false,
      }
    },
    computed:{
      currentUser(){
        return store.getters.getUserId;
      }
    },
    methods:{
      //获取某一页
      getPage(){
        this.searchInfo.flag=false;
        var param="?q&fixBy="+store.getters.getUserId
        param+="&createBy="+store.getters.getUserId
        param+="&head="+store.getters.getUserId

        axios.get("/efms/home/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
          if(res.data.data!=null && res.data.flag){
            this.fixLogList=res.data.data.records;
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
      //搜索某一页
      handleSearch(){
        this.searchInfo.flag=true;
        var param="?q";
        param+="&id="+this.searchInfo.logId;
        param+="&createBy="+this.searchInfo.employee;
        param+="&fixBy="+this.searchInfo.employee;
        param+="&head="+this.searchInfo.employee;

        axios.get("/efms/home/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
          if(res.data.data!=null && res.data.flag){
            this.fixLogList=res.data.data.records;
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
      //清空搜索框
      resetSearch(){
        this.searchInfo.logId=null;
        this.searchInfo.employee='';
      },
      //获取维修单详情
      handleDetail(id){
        axios.get("/efms/home/"+id).then((res)=>{
          if(res.data.flag && res.data.data!=null){
            this.fixLog2View=res.data.data;
            this.dialog4ViewVisible=true;
          }
          else{
            this.$notify.error({
              title:res.data.msg,
            })
          }
        })
      },
      //更换当前页的函数
      changePage(changeTo){
        this.pagination.currentPage=changeTo;
        this.searchInfo.flag?this.handleSearch():this.getPage();
      },
      //打开追加弹框
      handleAddDeclaration(id){
        this.log2AddDeclare=id;
        this.dialog4AddDeclarationVisible=true;
      },
      //打开成果弹框
      handleResultReport(id){
        this.log2Report=id;
        this.dialog4ReportVisible=true;
      },
      //追加申报提交
      submitAddDeclaration(addDeclaration){
                  console.log(addDeclaration)
        axios.put("/efms/home/add",addDeclaration).then((res)=>{
          if(res.data.flag){//申报成功，显示信息
            this.dialog4AddDeclarationVisible=false;
            this.$notify({
              title:res.data.msg,
              message:"追加申报成果，新增追加单号为："+res.data.data,
              type:'success'
            });
          }
          else{//申报失败，调用异常处理函数
            this.$refs['dialog4AddDeclaration'].handleException(res.data.msg);
          }
        }).finally(()=>{
          this.searchInfo.flag?this.handleSearch():this.getPage();
        })
      },
      //成果上报提交
      submitReport(resultReport){
        axios.put("/efms/home/res",resultReport).then((res)=>{
          if(res.data.flag){//上报成功，显示信息
            this.dialog4ReportVisible=false;
            this.$notify({
              title: res.data.msg,
              message: "成果上报成功，新增成果单号为："+res.data.data,
              type: 'success'
            });
          }else{//成果上报失败，调用弹框的异常处理函数
            this.$refs['dialog4Report'].handleException(res.data.msg);
          }
        }).finally(()=>{
          this.searchInfo.flag?this.handleSearch():this.getPage();
        })
      },

      //关闭弹框
      closeDialog4Detail(){
        this.dialog4ViewVisible=false;
      },

      closeDialog4AddDeclaration(){
        this.dialog4AddDeclarationVisible=false;
        this.log2AddDeclare='';
      },

      closeDialog4Report(){
        this.dialog4ReportVisible=false;
        this.log2Report='';
      }
    },
    created(){
      this.getPage();
    }
  }
</script>

<style scoped>
  .main-body{
    width: 964px;
    min-height:432px;
  }
  .search{
    display: flex;
    margin-bottom:10px ;
  }
  .el-input{
    width: 200px;
  }
  .search-button{
    margin-left: 10px;
  }
  .data-table{
    min-height: 335px;
  }
</style>

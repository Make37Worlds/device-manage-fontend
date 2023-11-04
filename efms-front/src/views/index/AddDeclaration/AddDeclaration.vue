<template>
  <div class="main-body">
    <!-- 搜索 -->
    <div class="search">
      <div class="search-input">
        <el-input v-model.number="searchInfo.logId" placeholder="输入维修单号"  prefix-icon="el-icon-search"></el-input>
        <el-input v-model="searchInfo.createBy" placeholder="输入申报人" prefix-icon="el-icon-search"></el-input>
        <el-select v-model.number="searchInfo.result" placeholder="请选择">
          <el-option label="未审核" value=1></el-option>
          <el-option label="审核通过" value=2></el-option>
          <el-option label="审核未通过" value=3></el-option>
        </el-select>
      </div>
      <div class="search-button">
        <el-button type="primary" @click="handleSearch">搜 索</el-button>
        <el-button @click="resetSearch">重 置</el-button>
        <el-button @click="getPage">我 的</el-button>
      </div>
    </div>

    <!-- 展示已申报数据 -->
    <div class="data-table">
      <el-table
        :data="addDeclarationList"
        border
        class="table"
        max-height="500">
        <el-table-column prop="id" label="追加申报单号" width="180"></el-table-column>
        <el-table-column prop="logId" label="维修单号" width="180"></el-table-column>
        <el-table-column prop="createBy" label="维修员">
          <template slot-scope="scope">
            <show-name :id="scope.row.createBy"></show-name>
          </template>
        </el-table-column>
        <el-table-column prop="result" label="审核结果">
          <template slot-scope="scope">
            <show-result :result="scope.row.result"></show-result>
          </template>
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row.id)" type="text" size="small">查看</el-button>
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

    <!-- 展示追加申报细节-->
    <AddDeclarationDetailDialog :dialog-visible="dialog4ViewVisible" :add-declaration-info="addDeclaration2View" @closeDialog="closeDialog"></AddDeclarationDetailDialog>
  </div>
</template>

<script>
  import AddDeclarationDetailDialog from './AddDeclarationDetailDialog.vue'
  import Pagination from '../../../components/Pagination.vue'
  import showResult from "../../../components/Show/showResult.vue"
  import showName from "../../../components/Show/showName.vue"
  import axios from 'axios';
  import store from '../../../store'
  export default {
    name: "AddDeclaration",
    components:{
      AddDeclarationDetailDialog,
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
          flag:false,
        },
        addDeclarationList:[],
        dialog4ViewVisible:false,
        addDeclaration2View:{},
      }
    },
    created(){
      this.getPage();
    },
    methods:{
      //获取某一页
      getPage(){
        this.searchInfo.flag=false;
        var param="?q&createBy="+store.getters.getUserId;

        axios.get("/efms/adddeclaration/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
          if(res.data.data!=null && res.data.flag){
            this.addDeclarationList=res.data.data.records;
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
      //搜索函数
      handleSearch() {
        this.searchInfo.flag=true;
        var param="?q";
        param+="&logId="+this.searchInfo.logId;
        param+="&createBy="+this.searchInfo.createBy;
        param+="&result="+this.searchInfo.result;

        axios.get("/efms/adddeclaration/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
          if(res.data.data!=null && res.data.flag){
            this.addDeclarationList=res.data.data.records;
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
      resetSearch() {
        this.searchInfo.logId='';
        this.searchInfo.createBy='';
        this.searchInfo.result='';
      },
      //获取详情数据，打开弹框
      handleDetail(id){
        axios.get("/efms/adddeclaration/"+id).then((res)=>{
          if(res.data.data!=null && res.data.flag){
            this.addDeclaration2View=res.data.data;
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

      closeDialog(){
        this.dialog4ViewVisible=false;
      }
    }
  }
</script>

<style scoped>
.main-body{
  height: 432px;
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
.option{
  margin-top: 10px;
}
.table{
  width:1000px;
}
</style>

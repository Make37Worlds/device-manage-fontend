<template>
  <div class="main-body">
    <!-- 搜索 -->
    <div class="search">
      <div class="search-input">
        <el-input v-model="searchInfo.eqmName" placeholder="输入设施名称"  prefix-icon="el-icon-search"></el-input>
        <el-input v-model="searchInfo.eqmId" placeholder="输入设施编号"  prefix-icon="el-icon-search"></el-input>
        
      </div>
      <div class="search-button">
        <el-button type="primary" @click="getPage">搜 索</el-button>
        <el-button @click="resetSearch">重 置</el-button>
      </div>
    </div>

    <!-- 展示设施数据 -->
    <div class="data-table">
      <el-table
        :data="eqmList"
        border
        class="table">
        <el-table-column
          prop="id"
          label="设施编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设施名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="depId"
          label="部门">
          <template slot-scope="scope">
            <show-dep :depId="scope.row.depId"></show-dep>
          </template>
        </el-table-column>
        <el-table-column
          prop="office"
          label="办公室">
        </el-table-column>
        <el-table-column
          prop="state"
          label="设施状态">
          <template slot-scope="scope">
            {{getState(scope.row.state)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div v-show="scope.row.state!==2">
              <el-button @click="handleUpdate(scope.row.id)" type="text" size="small">修改</el-button>
              <el-popconfirm
                  title="是否确认删除该设施？"
                  @confirm="handleDelete(scope.row.id)" >
                <el-button slot="reference" 
                          type="text" 
                          size="small">
                  删除
                </el-button>
              </el-popconfirm>
            </div>
            <div v-show="scope.row.state===2">
              <el-tag type="warning" effect="dark">维修中，不可操作</el-tag>
            </div>
            
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

    <!-- 新增设施按钮-->
    <div class="option">
      <el-button type="primary" icon="el-icon-circle-plus" @click="handleCreate">新 增</el-button>
    </div>

    <!-- 新增设施悬浮框 -->
    <EqmDialog ref="dialog4Create" title="新增设施" :dialog-visible="dialog4CreateVisible" @closeDialog="closeDialog4Create" @submit="submitCreate"></EqmDialog>

    <!-- 修改设施悬浮框 -->
    <EqmDialog ref="dialog4Update" title="修改设施" :dialog-visible="dialog4UpdateVisible" @closeDialog="closeDialog4Update" @submit="submitUpdate" :eqm-info="Eqm2Update"></EqmDialog>
  </div>
</template>

<script>
  import Pagination from "../../../components/Pagination";
  import showDep from "../../../components/Show/showDep.vue"
  import EqmDialog from "./eqmDialog";
  import axios from "axios";
  export default {
    name: "EqmManage",
    components:{
      EqmDialog,
      Pagination,
      showDep,
    },
    data(){
      return {
        eqmList:[],
        //分页信息
        pagination:{
          currentPage:1,
          total:0,
          pageSize:5,
        },
        dialog4CreateVisible:false,
        dialog4UpdateVisible:false,
        //搜索信息
        searchInfo:{
          eqmName:'',
          eqmId:'',
        },
        //待更新设施信息
        Eqm2Update:{
          id:0,
          name: '',
          department:'',
          office:'',
          state: 0
        },
      }
    },
    created() {
      this.getPage();
    },
    methods:{
      //根据设施状态字段显示状态信息
      getState(state){
        switch(state){
          case 1: 
            return "运行中";
          case 2:
            return "维修中";
          case 3:
            return "关闭";
        }
      },
      //获取某一页
      getPage(){
        var param="?q";
        param+="&name="+this.searchInfo.eqmName;
        param+="&id="+this.searchInfo.eqmId;
              
        axios.get("/efms/eqmmanage/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
          if(res.data.flag && res.data.data!=null){
            this.eqmList=res.data.data.records;
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
      //清空搜索框
      resetSearch(){
        this.searchInfo.eqmName='';
        this.searchInfo.eqmId='';
      },
      //删除设施
      handleDelete(id){
        axios.delete("/efms/eqmmanage/"+id).then((res)=>{
          if(res.data.flag){
            this.$notify({
              title: res.data.msg,
              type: 'success'
            });
          }else{
            this.$notify.error({
              title: res.data.msg,
            });
          }
        }).finally(()=>{
          this.getPage();
        })
      },
      //解决更新事件
      handleUpdate(id){
        axios.get("/efms/eqmmanage/"+id).then((res)=>{//获取数据成功，展示更新弹框
          if(res.data.flag && res.data.data!=null){
            this.Eqm2Update=res.data.data;
            this.dialog4UpdateVisible=true;
          }else{
            this.$notify.error({
              title: res.data.msg,
            });
          }
        }).finally(()=>{
          this.getPage();
        })
      },
      //展示新建弹框
      handleCreate(){
        this.dialog4CreateVisible=true;
      },
      //修改当前页
      changePage(changeTo){
        this.pagination.currentPage=changeTo;
        this.getPage();
      },
      //创建设施提交
      submitCreate(eqm){
        axios.post("/efms/eqmmanage",eqm).then((res)=>{
          if(res.data.flag){
            this.dialog4CreateVisible=false;
            this.$notify({
              title: res.data.msg,
              message:"新增设施编号为："+res.data.data,
              type: 'success'
            });
          }else{
            this.$refs['dialog4Create'].handleException(res.data.msg);
          }
        }).finally(()=>{
          this.currentPage=1;
          this.getPage();
        })
      },
      //更新提交
      submitUpdate(eqm,id){
        var newEqm={
          id:id,
          ...eqm
        }
        axios.put("/efms/eqmmanage",newEqm).then((res)=>{
          if(res.data.flag){
            this.dialog4UpdateVisible=false;
            this.$notify({
              title: res.data.msg,
              type: 'success'
            });
          }else{
              this.$refs['dialog4Update'].handleException(res.data.msg);
          }
        }).finally(()=>{
          this.getPage();
        })
      },
      //关闭弹框
      closeDialog4Create(){
        this.dialog4CreateVisible=false;
      },
      closeDialog4Update(){
        this.dialog4UpdateVisible=false;
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
  .option{
    margin-top: 10px;
  }
  .table{
    width:1000px;
  }
  .pagination{
    text-align: center;
  }
</style>



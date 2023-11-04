<template>
  <div class="main-body">
    <!-- 搜索 -->
    <div class="search">
      <div class="search-input">
        <el-input v-model="searchInfo.empName" placeholder="输入人员姓名"  prefix-icon="el-icon-search"></el-input>
        <el-input v-model="searchInfo.empId" placeholder="输入人员编号"  prefix-icon="el-icon-search"></el-input>
        
      </div>
      <div class="search-button">
        <el-button type="primary" @click="getPage">搜 索</el-button>
        <el-button @click="resetSearch">重 置</el-button>
      </div>
    </div>

    <!-- 展示人员数据 -->
    <div class="data-table">
      <el-table
        :data="empList"
        border
        class="table">
        <el-table-column
          prop="id"
          label="人员编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="人员名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="50">
        </el-table-column>
        <el-table-column
          prop="depId"
          label="部门">
          <template slot-scope="scope">
            <show-dep :depId="scope.row.depId"></show-dep>
          </template>
        </el-table-column>
        <el-table-column
          prop="position"
          label="职位">
        </el-table-column>
        <el-table-column
          prop="roleId"
          label="角色">
          <template slot-scope="scope">
            <show-role :id="scope.row.roleId"></show-role>
          </template>
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生年月">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.id)" type="text" size="small">修改</el-button>
            <el-popconfirm
                title="是否确认删除该人员？"
                @confirm="handleDelete(scope.row.id)" >
              <el-button slot="reference" 
                        type="text" 
                        size="small">
                删除
              </el-button>
            </el-popconfirm>
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

    <!-- 新增人员按钮-->
    <div class="option">
      <el-button type="primary" icon="el-icon-circle-plus" @click="handleCreate">新 增</el-button>
    </div>

    <!-- 新增人员悬浮框 -->
    <EmpDialog  ref="dialog4Create" title="新增人员" :dialog-visible="dialog4CreateVisible" @submit="submitCreate" @closeDialog="closeDialog4Create"></EmpDialog>

    <!-- 修改人员悬浮框 -->
    <EmpDialog ref="dialog4Update" title="修改人员" :dialog-visible="dialog4UpdateVisible" @submit="submitUpdate" @closeDialog="closeDialog4Update" :emp-info="Emp2Update"></EmpDialog>
  </div>
</template>

<script>
  import Pagination from "../../../components/Pagination.vue";
  import EmpDialog from "./empDialog.vue";
  import showDep from "../../../components/Show/showDep.vue"
  import showRole from "../../../components/Show/showRole.vue"
  import axios from "axios";
  import store from "../../../store";
  export default {
    name: "EmpManage",
    components:{
      EmpDialog,
      Pagination,
      showDep,
      showRole,
    },
    data(){
      return {
        empList:[],
        //分页数据
        pagination:{
          currentPage:1,
          total:0,
          pageSize:5,
        },
        dialog4CreateVisible:false,
        dialog4UpdateVisible:false,
        //搜索数据
        searchInfo:{
          empName:'',
          empId:'',
        },
        Emp2Update:{
          id:0,
          name: '',
          sex:'',
          department:'',
          position:'',
          role:'',
          phone:'',
          birth:''
        },
      }
    },
    computed:{
      currentUser(){
        return store.getters.getUserId;
      }
    },
    created() {
      this.getPage();
    },
    methods:{
      //获取某一页
      getPage(){
        var param="?q";
        param+="&name="+this.searchInfo.empName;
        param+="&id="+this.searchInfo.empId;
              
        axios.get("/efms/empmanage/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
          if(res.data.flag && res.data.data!=null){
            this.empList=res.data.data.records;
            this.pagination.total=res.data.data.total;
            this.pagination.currentPage=res.data.data.current;
            this.pagination.pageSize=res.data.data.size;
          }else{
            this.$notify.error({
              title: res.data.msg,
            });
          }
        })
      },
      //清空搜索框
      resetSearch(){
        this.searchInfo.empName='';
        this.searchInfo.empId='';
      },

      deleteEmployee(id){
        axios.delete("/efms/empmanage/"+id).then((res)=>{
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
      //删除
      handleDelete(id){
        if(id===this.currentUser){
          this.$confirm('此操作将删除当前登录用户，删除后将退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {//点击确认后，删除用户
            this.deleteEmployee(id);
            axios.delete("/efms/loginManage/logout/"+store.getters.getUserId).then((res)=>{
              if(res.data.flag){
                this.$router.replace({
                  path:'/login'
                })
              }
            })
          }).catch(() => {//取消删除
            this.$notify({
              type: 'info',
              title: '已取消删除'
            });          
          });
        }else{
          this.deleteEmployee(id);  
        }
      },
      //解决更新事件
      handleUpdate(id){
        axios.get("/efms/empmanage/"+id).then((res)=>{//数据获取成果，则打开弹框
          if(res.data.flag && res.data.data!=null){
            this.Emp2Update=res.data.data;
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
      //打开创建弹框
      handleCreate(){
        this.dialog4CreateVisible=true;
      },
      //当前页面变化
      changePage(changeTo){
        this.pagination.currentPage=changeTo;
        this.getPage();
      },
      //创建提交
      submitCreate(emp){
        axios.post("/efms/empmanage",emp).then((res)=>{
          if(res.data.flag){
            this.dialog4CreateVisible=false;
            this.$notify({
              title: res.data.msg,
              message:"新增人员编号为："+res.data.data,
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
      submitUpdate(emp,id){
        var newEmp={
          id:id,
          ...emp
        }
        var msg="";
        if(id===this.currentUser){
          msg="检测到当前用户信息更新，可以选择重新登录刷新权限。";
        }
        axios.put("/efms/empmanage",newEmp).then((res)=>{
          if(res.data.flag){
            this.dialog4UpdateVisible=false;
            this.$notify({
              title: res.data.msg,
              type: 'success',
              message:msg,
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
  .pagination{
    text-align: center;
  }
</style>




<template>
  <div class="main-body">
    <!-- 搜索 -->
    <div class="search">
      <div class="search-input">
        <el-input v-model="searchInfo.roleName" placeholder="输入角色名称"  prefix-icon="el-icon-search"></el-input>
        <el-input v-model="searchInfo.roleAuthority" placeholder="输入权限字符"  prefix-icon="el-icon-search"></el-input>
        <el-select v-model.number="searchInfo.roleState" placeholder="请选择角色状态">
          <el-option key=1 label="正常" value=1></el-option>
          <el-option key=0 label="禁用" value=0></el-option>
        </el-select>
      </div>
      <div class="search-button">
        <el-button type="primary" @click="getPage">搜 索</el-button>
        <el-button @click="resetSearch">重 置</el-button>
      </div>
    </div>

    <!-- 展示角色数据 -->
    <div class="data-table">
      <el-table
        :data="roleList"
        border
        class="table">
        <el-table-column
          prop="id"
          label="角色编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="authority"
          label="权限字符">
        </el-table-column>
        <el-table-column
          prop="state"
          label="角色状态">
          <template slot-scope="scope">
            {{getState(scope.row.state)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.id)" type="text" size="small">修改</el-button>
            <el-popconfirm
                title="是否确认删除该角色？"
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
      <Pagination :total="pagination.total" :page-size="pagination.pageSize" @changePage="changePage"></Pagination>
    </div>

    <!-- 新增角色按钮-->
    <div class="option">
      <el-button type="primary" icon="el-icon-circle-plus" @click="handleCreate">新 增</el-button>
    </div>

    <!-- 新增角色悬浮框 -->
    <RoleDialog  ref="dialog4Create" title="新增角色" @closeDialog="closeDialog4Create" :dialog-visible="dialog4CreateVisible" @submit="submitCreate"></RoleDialog>

    <!-- 修改角色悬浮框 -->
    <RoleDialog ref="dialog4Update" title="修改角色" @closeDialog="closeDialog4Update" :dialog-visible="dialog4UpdateVisible" @submit="submitUpdate" :role-info="Role2Update" ></RoleDialog>
  </div>
</template>

<script>
  import Pagination from "../../../components/Pagination";
  import RoleDialog from "./roleDialog";
  import axios from "axios";
  import store from "../../../store"
  export default {
    name: "RoleManage",
    components:{
      RoleDialog,
      Pagination,
    },
    data(){
      return {
        roleList:[],

        //分页数据
        pagination:{
          currentPage:1,
          total:0,
          pageSize:5,
        },

        //弹框展示情况
        dialog4CreateVisible:false,
        dialog4UpdateVisible:false,

        //搜索信息
        searchInfo:{
          roleName:'',
          roleAuthority:'',
          roleState:'',
        },

        //待更新的角色
        Role2Update:{
          id:0,
          name: '',
          authority: '',
          sort: '',
          menus: [],
          state: '',
          postscript: ''
        },
      }
    },
    created() {
      this.getPage();
    },
    methods:{
      //根据角色状态字段获取状态信息
      getState(state){
        switch(state){
          case 1: 
            return "正常";
          case 2:
            return "禁用";
        }
      },
      //获取某一页
      getPage(){
        var param="?q";
        param+="&name="+this.searchInfo.roleName;
        param+="&authority="+this.searchInfo.roleAuthority;
        param+="&state="+this.searchInfo.roleState;
              
        axios.get("/efms/rolemanage/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
          if(res.data.flag && res.data.data!=null){
            this.roleList=res.data.data.records;
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
        this.searchInfo.roleName="";
        this.searchInfo.roleAuthority="";
        this.searchInfo.roleState='';
      },
      //删除角色
      handleDelete(id){
        //删除成功或失败，都显示对应的信息
        axios.delete("/efms/rolemanage/"+Number(id)).then((res)=>{
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
        id=Number(id);
        //获取对应的要修改的角色信息，获取成功则打开修改角色信息的弹窗
        axios.get("/efms/rolemanage/"+id).then((res)=>{
          if(res.data.flag && res.data.data!=null){
            this.Role2Update=res.data.data;
            this.dialog4UpdateVisible=true;
          }else{
            //获取失败提示信息
            this.$notify.error({
              title: res.data.msg,
            });
          }
        }).finally(()=>{
          this.getPage();
        })
      },
      //打开角色创建弹框
      handleCreate(){
        this.dialog4CreateVisible=true;
      },
      //更换当前页
      changePage(changeTo){
        this.pagination.currentPage=changeTo;
        this.getPage();
      },
      //角色创建提交
      submitCreate(role){
        var newRole={
          createBy:store.getters.getUserId,
          createTime:new Date().getTime(),
          ...role
        };
        axios.post("/efms/rolemanage",newRole).then((res)=>{
          if(res.data.flag){//角色新增成功，关闭弹框，显示新增角色编号
            this.dialog4CreateVisible=false;
            this.$notify({
              title: res.data.msg,
              message:"新增角色编号为："+res.data.data,
              type: 'success'
            });
          }else{//角色新增失败，调用弹框的异常处理函数
            this.$refs['dialog4Create'].handleException(res.data.msg);
          }
        }).finally(()=>{
          this.getPage();
        })
      },
      //角色修改提交
      submitUpdate(role,id){
        var newRole={
          id:id,
          updateBy:store.getters.getUserId,
          updateTime:new Date().getTime(),
          ...role
        }
        console.log(newRole)
        axios.put("/efms/rolemanage",newRole).then((res)=>{
          if(res.data.flag){
            //关闭弹框，展示修改成功信息
            this.dialog4UpdateVisible=false;
            this.$notify({
              title: res.data.msg,
              type: 'success'
            });
          }else{//调用弹框的异常处理函数
              this.$refs['dialog4Update'].handleException(res.data.msg);
          }
        }).finally(()=>{
          //更新页面
          this.getPage();
        })
      },
      //弹窗关闭函数
      closeDialog4Create(){
        this.dialog4CreateVisible=false;
      },
      closeDialog4Update(){
        this.dialog4UpdateVisible=false;
        this.Role2Update={};
      }
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
  .option{
    margin-top: 10px;
  }
  .pagination{
    text-align: center;
  }
  .data-table{
    min-height: 335px;
  }

</style>

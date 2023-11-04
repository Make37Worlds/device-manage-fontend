<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    @close="resetForm('roleForm')"
    :before-close="handleClose">
    <el-form
      @submit.native.prevent
      :model="newRoleInfo"
      :rules="rules"
      ref="roleForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="newRoleInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="权限字符" prop="authority">
        <el-input v-model="newRoleInfo.authority"></el-input>
      </el-form-item>
      <el-form-item label="角色顺序" prop="sort">
        <el-select v-model.number="newRoleInfo.sort" placeholder="请选择角色顺序">
          <el-option label="第一优先级" value="1"></el-option>
          <el-option label="第二优先级" value="2"></el-option>
          <el-option label="第三优先级" value="3"></el-option>
          <el-option label="第四优先级" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单权限" prop="menus">
        <el-checkbox-group v-model="newRoleInfo.menus" :min="1">
          <el-checkbox :label="1">首页</el-checkbox>
          <el-checkbox :label="2">维修申报</el-checkbox>
          <el-checkbox :label="3">人员派遣</el-checkbox>
          <el-checkbox :label="4">追加申报查看</el-checkbox>
          <el-checkbox :label="5">追加申报审批</el-checkbox>
          <el-checkbox :label="6">成果上报查看</el-checkbox>
          <el-checkbox :label="7">成果上报审核</el-checkbox>
          <el-checkbox :label="8">角色管理</el-checkbox>
          <el-checkbox :label="9">人员管理</el-checkbox>
          <el-checkbox :label="10">设施管理</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="角色状态" prop="state">
        <el-radio-group v-model.number="newRoleInfo.state">
          <el-radio :label="1" >正常</el-radio>
          <el-radio :label="2" >禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="postscript">
        <el-input
          type="textarea"
          v-model="newRoleInfo.postscript"
          maxlength="200"
          show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item class="op">
        <el-button type="primary" @click="submitForm('roleForm')">提 交</el-button>
        <el-button @click="resetForm('roleForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    name: "",
    props:{
      dialogVisible:{
        type:Boolean,
        required:true,
        default:false,
      },
      title:{
        type:String,
        required: true,
      },
      RoleInfo:{
        type:Object,
        required:false,
      },
    },
    data(){
      return {
        rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          authority: [
            { required: true, message: '请输入角色权限字符', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '请选择角色顺序', trigger: 'change' }
          ],
          menus: [
            { type: 'array', required: true, message: '请至少选择一个菜单项', trigger: 'change' }
          ],
          state: [
            { required: true, message: '请选择角色状态', trigger: 'change' }
          ],
          postscript: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ]
        },
        newRoleInfo: {
          name: '',
          authority: '',
          sort: 0,
          menus: [],
          state: 0,
          postscript: ''
        },
        roleId:0,
      }
    },
    watch:{
      RoleInfo(val){
        console.log(val);
        this.newRoleInfo.name=val.name;
        this.newRoleInfo.authority=val.authority;
        this.newRoleInfo.sort=val.sort;
        this.newRoleInfo.menus=val.menus;
        this.newRoleInfo.state=val.state;
        this.newRoleInfo.postscript=val.postscript;
        this.roleId=val.id;
      },
    },
    methods:{
      resetForm(formName) {
        this.$refs[formName].resetFields();//直接使用element-ui的清空函数，效果有待检验
      },
      //若表单数据合法，则触发提交事件
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('submit',this.newRoleInfo,this.roleId);
          } else {
            this.$confirm('填报信息有误，请检查后再试');
          }
        });
      },
      //防止用户误关弹框
      handleClose(done){
        this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm('roleForm');
          this.$emit('closeDialog');
        })
        .catch(_ => {});
      },
      //在弹框上层显示异常信息
      handleException(msg){
        this.$confirm(msg);
      }
    }
  }
</script>

<style scoped>

</style>

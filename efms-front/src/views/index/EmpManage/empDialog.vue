<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    @close="resetForm('empForm')"
    @open="getRoles"
    :before-close="handleClose">
    <el-form
      @submit.native.prevent
      :model="newEmpInfo"
      :rules="rules"
      ref="empForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="人员名称" prop="name">
        <el-input v-model="newEmpInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="newEmpInfo.sex">
          <el-radio label="男" >男</el-radio>
          <el-radio label="女" >女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="部门" prop="depId">
        <el-select v-model.number="newEmpInfo.depId" placeholder="请选择部门">
          <el-option label="总裁办" :value="1"></el-option>
          <el-option label="维修部" :value="2"></el-option>
          <el-option label="销售部" :value="3"></el-option>
          <el-option label="运营部" :value="4"></el-option>
          <el-option label="人事部" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-select v-model="newEmpInfo.position" placeholder="请选择职位">
          <el-option label="部门经理" value="部门经理"></el-option>
          <el-option label="部门副经理" value="部门副经理"></el-option>
          <el-option label="普通员工" value="普通员工"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model.number="newEmpInfo.roleId" placeholder="请选择角色">
          <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" prop="phoneNumber">
        <el-input v-model="newEmpInfo.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="出生年月日" prop="birth">
        <el-date-picker
          v-model="newEmpInfo.birth"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择出生年月日">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('empForm')">提 交</el-button>
        <el-button @click="resetForm('empForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
  import store from "../../../store"
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
      EmpInfo:{
        type:Object,
        required:false,
        default:()=>{},
      },
    },
    data(){
      return {
        roles:{},
        rules: {
          name: [
            { required: true, message: '请输入人员姓名', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          depId: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ],
          position: [
            { required: true, message: '请选择职位', trigger: 'change' }
          ],
          roleId: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          phoneNumber: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
          ],
          birth: [
            { required: true, message: '请选择出生年月', trigger: 'change' }
          ],
        },
        newEmpInfo: {
          name: '',
          sex:'',
          depId: '',
          position:'',
          roleId: '',
          phoneNumber: '',
          birth: null,
          timeIn:null,
        },
        empId:'',
      }
    },
    watch:{
      EmpInfo(val){
        this.newEmpInfo.name=val.name;
        this.newEmpInfo.sex=val.sex;
        this.newEmpInfo.depId=val.depId;
        this.newEmpInfo.position=val.position;
        this.newEmpInfo.roleId=val.roleId;
        this.newEmpInfo.phoneNumber=val.phoneNumber;
        this.newEmpInfo.birth=val.birth;
        this.empId=val.id;
      },
    },
    methods:{
      getRoles(){
        axios.get('efms/empmanage/allrole/').then((res)=>{
          this.roles=res.data.data;
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.newEmpInfo.timeIn=new Date().getTime();
            this.$emit('submit',this.newEmpInfo,this.empId);
          } else {
            this.$confirm('填报信息有误，请检查后重试');
          }
        });

      },
      handleClose(done){
        this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm('empForm');
          this.$emit('closeDialog');
        })
        .catch(_ => {});
      },
      handleException(msg){
        this.$confirm(msg);
      }
    }
  }
</script>

<style scoped>

</style>




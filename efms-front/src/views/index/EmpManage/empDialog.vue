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
      <el-form-item label="Name" prop="name">
        <el-input v-model="newEmpInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="Sex" prop="sex">
        <el-radio-group v-model="newEmpInfo.sex">
          <el-radio label="male" >male</el-radio>
          <el-radio label="female" >female</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Department" prop="depId">
        <el-select v-model.number="newEmpInfo.depId" placeholder="Please select department">
          <el-option label="President Office" :value="1"></el-option>
          <el-option label="Maintenance Department" :value="2"></el-option>
          <el-option label="Sales Department" :value="3"></el-option>
          <el-option label="Operations Department" :value="4"></el-option>
          <el-option label="Personnel Department" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="position" prop="position">
        <el-select v-model="newEmpInfo.position" placeholder="Please select position">
          <el-option label="Department Manager" value="部门经理"></el-option>
          <el-option label="Deputy Department Manager" value="部门副经理"></el-option>
          <el-option label="Employee" value="普通员工"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Role" prop="roleId">
        <el-select v-model.number="newEmpInfo.roleId" placeholder="Please select role">
          <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Contact" prop="phoneNumber">
        <el-input v-model="newEmpInfo.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="Date of Birth" prop="birth">
        <el-date-picker
          v-model="newEmpInfo.birth"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="Please select birthday">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('empForm')">Submit</el-button>
        <el-button @click="resetForm('empForm')">Reset</el-button>
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
            { required: true, message: 'Please enter name', trigger: 'blur' },
            { min: 1, max: 10, message: 'Length between 1 to 10 characters', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: 'Please select sex', trigger: 'change' }
          ],
          depId: [
            { required: true, message: 'Please select department', trigger: 'change' }
          ],
          position: [
            { required: true, message: 'Please select position', trigger: 'change' }
          ],
          roleId: [
            { required: true, message: 'Please select role', trigger: 'change' }
          ],
          phoneNumber: [
            { required: true, message: 'Please select contact', trigger: 'blur' },
            { min: 11, max: 11, message: 'Length is 11 characters.', trigger: 'blur' }
          ],
          birth: [
            { required: true, message: 'Please select date of birth.', trigger: 'change' }
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
            this.$confirm('Information submitted is incorrect, please check and try again.');
          }
        });

      },
      handleClose(done){
        this.$confirm('Confirm close?')
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




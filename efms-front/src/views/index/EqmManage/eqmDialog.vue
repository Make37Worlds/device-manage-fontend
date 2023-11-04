<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    @close="resetForm('eqmForm')"
    :before-close="handleClose">
    <el-form
      @submit.native.prevent
      :model="newEqmInfo"
      :rules="rules"
      ref="eqmForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="Facility Name" prop="name">
        <el-input v-model="newEqmInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="Department" prop="depId">
        <el-select v-model.number="newEqmInfo.depId" placeholder="Please select department">
          <el-option label="President Office" :value="1"></el-option>
          <el-option label="Maintenance Department" :value="2"></el-option>
          <el-option label="Sales Department" :value="3"></el-option>
          <el-option label="Operations Department" :value="4"></el-option>
          <el-option label=" Personnel Department" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Office" prop="office">
        <el-select v-model="newEqmInfo.office" placeholder="Please select office">
          <el-option label="101" :value="101"></el-option>
          <el-option label="102" :value="102"></el-option>
          <el-option label="103" :value="103"></el-option>
          <el-option label="104" :value="104"></el-option>
          <el-option label="201" :value="201"></el-option>
          <el-option label="202" :value="202"></el-option>
          <el-option label="203" :value="203"></el-option>
          <el-option label="204" :value="204"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="State" prop="state">
        <el-radio-group v-model.number="newEqmInfo.state">
          <el-radio :label="1" >In Operation</el-radio>
          <el-radio :label="3" >Closed</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('eqmForm')">Submit</el-button>
        <el-button @click="resetForm('eqmForm')">Reset</el-button>
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
      EqmInfo:{
        type:Object,
        required:false,
        default:()=>{
          return {
            name: '',
            depId: 0,
            office: '',
            state: 0
          }
        }
      },
      EqmId:{
        type:Number,
        required:false,
      }
    },
    data(){
      return {
        rules: {
          name: [
            { required: true, message: 'Please enter facility name', trigger: 'blur' },
            { min: 1, max: 20, message: 'Length between 1 to 20 characters', trigger: 'blur' }
          ],
          depId: [
            { required: true, message: 'Please select department', trigger: 'change' }
          ],
          office: [
            { required: true, message: 'Please select office', trigger: 'change' }
          ],
          state: [
            { required: true, message: 'Please select state', trigger: 'change' }
          ],

        },
        newEqmInfo: {
          name: '',
          depId: '',
          office: '',
          state: 0,
          buyTime:null,
        },
        empId:0,
      }
    },
    watch:{
      EqmInfo(val){
        this.newEqmInfo.name=val.name;
        this.newEqmInfo.depId=val.depId;
        this.newEqmInfo.office=val.office;
        this.newEqmInfo.state=val.state;
        this.eqmId=val.id;
      },
    },
    methods:{
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {//输入合法，则触发提交事件
          if (valid) {
            this.newEqmInfo.buyTime=new Date().getTime();
            this.$emit('submit',this.newEqmInfo,this.eqmId);
          } else {
            this.$confirm('Information submitted is incorrect, please check and try again.');
          }
        });
      },
      handleClose(done){
        this.$confirm('Confirm close？')
        .then(_ => {
          this.resetForm('eqmForm');
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



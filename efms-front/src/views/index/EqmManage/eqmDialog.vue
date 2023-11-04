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
      <el-form-item label="设施名称" prop="name">
        <el-input v-model="newEqmInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="depId">
        <el-select v-model.number="newEqmInfo.depId" placeholder="请选择部门">
          <el-option label="总裁办" :value="1"></el-option>
          <el-option label="维修部" :value="2"></el-option>
          <el-option label="销售部" :value="3"></el-option>
          <el-option label="运营部" :value="4"></el-option>
          <el-option label="人事部" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="办公室" prop="office">
        <el-select v-model="newEqmInfo.office" placeholder="请选择部门">
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
      <el-form-item label="运行状态" prop="state">
        <el-radio-group v-model.number="newEqmInfo.state">
          <el-radio :label="1" >运行中</el-radio>
          <el-radio :label="3" >关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('eqmForm')">提 交</el-button>
        <el-button @click="resetForm('eqmForm')">重 置</el-button>
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
            { required: true, message: '请输入设施名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          depId: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ],
          office: [
            { required: true, message: '请选择办公室', trigger: 'change' }
          ],
          state: [
            { required: true, message: '请选择运行状态', trigger: 'change' }
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
            this.$confirm('填报信息有误，请检查后重试');
          }
        });
      },
      handleClose(done){
        this.$confirm('确认关闭？')
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



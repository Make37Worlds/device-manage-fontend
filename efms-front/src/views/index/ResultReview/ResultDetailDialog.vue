<template>
  <el-dialog
    title="Result Review"
    width="50%"
    @close="resetForm('reviewForm')"
    :visible.sync="dialogVisible"
    :before-close="handleClose">
    <el-descriptions size="medium" title="Pending Review Result Detail" class="margin-top" :column="2" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          Maintenance Order ID
        </template>
        {{logInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-printer"></i>
          Facility ID
        </template>
        {{logInfo.facId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Repair Applicant ID
        </template>
        {{logInfo.createBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          Time of Report
        </template>
        {{logInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          Fault Status
        </template>
        <div v-html="logInfo.faultCondition"></div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Maintenance Technician ID
        </template>
        {{logInfo.fixBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          Maintenance Time
        </template>
        {{resultInfo.fixTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          Estimated Cost
        </template>
        {{logInfo.budget}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          Current Cost
        </template>
        {{resultInfo.actualCost}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          Cause of the Fault
        </template>
        {{resultInfo.faultReason}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          Result Report
        </template>
        <div v-html=resultInfo.description></div>
      </el-descriptions-item>
    </el-descriptions>
    <el-divider></el-divider>
    <el-form
      :model="reviewInfo"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      ref="reviewForm">
      <el-form-item label="Review Result" prop="result">
        <el-radio-group v-model.number="reviewInfo.result">
          <el-radio :label="2">Approved</el-radio>
          <el-radio :label="3">Not Approved</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Reason" prop="reason">
        <el-input
        type="textarea"
        maxlength="50"
        show-word-limit
        v-model="reviewInfo.reason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('reviewForm')">Submit</el-button>
        <el-button @click="resetForm('reviewForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    name: "",
    props:['dialogVisible','ReviewDetail'],
    data(){
      var validateRadio = (rule, value, callback) => {
        if (value) {
          // 当值为0的时候当做没选择
          if (value==0) {
            callback(new Error('Please choose review result'))
          }  else {
            callback();
          }
        } else {
          callback(new Error('Please choose review result'));
        }
      };
      return {
        logInfo:{},
        resultInfo:{},
        reviewInfo:{
          result:0,
          reason:"",
        },
        rules: {
          result: [
            { required: true, validator: validateRadio , trigger: 'change' }
          ],
          reason: [
            { required: true, message: 'Please enter the reason', trigger: 'blur' }
          ]
        }
      }
    },
    watch:{
      ReviewDetail(val){
        if(val){
          this.logInfo=this.ReviewDetail.fixLog;
          this.resultInfo=this.ReviewDetail.resultReport;
        }
      }
    },
    methods:{
      //若表单数据合法，则触发提交函数
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("submitReview",this.resultInfo.id,this.reviewInfo);
          }else{
            this.$confirm("The information submitted is incorrect, please check and try again!");
          }
        })
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      handleClose(){
         this.$confirm('Sure to close?')
          .then(_ => {
            this.resetForm('reviewForm');
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

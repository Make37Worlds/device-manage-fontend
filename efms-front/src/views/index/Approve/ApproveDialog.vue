<template>
  <el-dialog width="50%" title="追加申报审核" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-descriptions size="medium" title="待审核追加申报详情" class="margin-top" :column="2" border>
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
          <i class="el-icon-coin"></i>
          Estimated Cost
        </template>
        {{logInfo.budget}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          Additional order ID
        </template>
        {{AddDeclarationInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          Additional Budget
        </template>
        {{AddDeclarationInfo.addBudget}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          Additional Description
        </template>
        <div v-html=AddDeclarationInfo.description></div>
      </el-descriptions-item>
    </el-descriptions>
    <el-divider></el-divider>
    <el-form :model="approveInfo" :rules="rules" label-width="100px" class="demo-ruleForm" ref="approveForm">
      <el-form-item label="Review Result" prop="result">
        <el-radio-group v-model.number="approveInfo.result">
          <el-radio :label="2">Approved</el-radio>
          <el-radio :label="3">not Approved</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Reason" prop="reason">
        <el-input
        type="textarea"
        maxlength="50"
        show-word-limit
        v-model="approveInfo.reason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sbumitForm('approveForm')">Submit</el-button>
        <el-button @click="resetForm('approveForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    name:"",
    props:['dialogVisible','ApproveDetail'],
    data(){
      var validateRadio = (rule, value, callback) => {
        if (value) {
          // 当值为0的时候当做没选择
          if (value==0) {
            callback(new Error('Please select review result'))
          }  else {
            callback();
          }
        } else {
          callback(new Error('Please select review result'));
        }
      };
      return{
        logInfo:{},
        AddDeclarationInfo:{},
        approveInfo:{
          result:0,
          reason:"",
        },
        rules:{
          result:[
            {
              required:true,
              validator: validateRadio,
              trigger:'change'
            }
          ],
          reason:[
            {
              required:true,
              message:'Please enter reason',
              trigger:'blur'
            }
          ]
        }
      }
    },
    watch:{
      ApproveDetail(val){
        if(val){
          this.logInfo=this.ApproveDetail.fixLog;
          this.AddDeclarationInfo=this.ApproveDetail.addDeclaration;
        }
      }
    },
    methods:{
      sbumitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("submitApprove",this.AddDeclarationInfo.id,this.approveInfo);
          } else {
            this.$confirm('Information submitted is incorrect, please check and retry!');
          }
        });
      },

      resetForm(formName){
        this.$refs[formName].resetFields();
      },

      handleClose(){
        this.$confirm('confirm to close?')
          .then(_ => {
            this.resetForm('approveForm');
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

<template>
  <el-dialog 
    title="成果审核" 
    width="50%"
    @close="resetForm('reviewForm')"
    :visible.sync="dialogVisible" 
    :before-close="handleClose">
    <el-descriptions size="medium" title="待审核成果详情" class="margin-top" :column="2" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          维修单号
        </template>
        {{logInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-printer"></i>
          设施编号
        </template>
        {{logInfo.facId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          报修人编号
        </template>
        {{logInfo.createBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          报修时间
        </template>
        {{logInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          故障状况
        </template>
        <div v-html="logInfo.faultCondition"></div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          维修人编号
        </template>
        {{logInfo.fixBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          维修时间
        </template>
        {{resultInfo.fixTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          预算成本
        </template>
        {{logInfo.budget}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          目前成本
        </template>
        {{resultInfo.actualCost}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          故障原因
        </template>
        {{resultInfo.faultReason}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          成果说明
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
      <el-form-item label="审核结果" prop="result">
        <el-radio-group v-model.number="reviewInfo.result">
          <el-radio :label="2">通过</el-radio>
          <el-radio :label="3">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="处理原因" prop="reason">
        <el-input 
        type="textarea" 
        maxlength="50"
        show-word-limit
        v-model="reviewInfo.reason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('reviewForm')">提交</el-button>
        <el-button @click="resetForm('reviewForm')">重置</el-button>
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
            callback(new Error('请选择审核结果'))
          }  else {
            callback();
          }
        } else {
          callback(new Error('请选择审核结果'));
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
            { required: true, message: '请填写处理原因', trigger: 'blur' }
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
            this.$confirm("填报信息有误，请检查后再试！");
          }
        })
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      handleClose(){
         this.$confirm('确认关闭？')
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

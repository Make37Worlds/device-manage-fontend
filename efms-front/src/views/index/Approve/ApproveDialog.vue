<template>
  <el-dialog width="50%" title="追加申报审核" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-descriptions size="medium" title="待审核追加申报详情" class="margin-top" :column="2" border>
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
          申报时间
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
          <i class="el-icon-coin"></i>
          预算成本
        </template>
        {{logInfo.budget}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          追加单号
        </template>
        {{AddDeclarationInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          追加预算
        </template>
        {{AddDeclarationInfo.addBudget}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          追加说明
        </template>
        <div v-html=AddDeclarationInfo.description></div>
      </el-descriptions-item>
    </el-descriptions>
    <el-divider></el-divider>
    <el-form :model="approveInfo" :rules="rules" label-width="100px" class="demo-ruleForm" ref="approveForm">
      <el-form-item label="审批结果" prop="result">
        <el-radio-group v-model.number="approveInfo.result">
          <el-radio :label="2">通过</el-radio>
          <el-radio :label="3">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="处理原因" prop="reason">
        <el-input 
        type="textarea" 
        maxlength="50"
        show-word-limit
        v-model="approveInfo.reason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sbumitForm('approveForm')">提 交</el-button>
        <el-button @click="resetForm('approveForm')">重 置</el-button>
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
            callback(new Error('请选择审核结果'))
          }  else {
            callback();
          }
        } else {
          callback(new Error('请选择审核结果'));
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
              message:'请填写处理原因',
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
            this.$confirm('填报信息有误，请检查后再试');
          }
        });
      },

      resetForm(formName){
        this.$refs[formName].resetFields();
      },

      handleClose(){
        this.$confirm('确认关闭？')
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
<template>
  <el-dialog
    title="Result Reporting"
    @close="resetForm('resultForm')"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form
      @submit.native.prevent
      :model="resultReportInfo"
      :rules="rules"
      ref="resultForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="Maintenance Order ID">
        <el-input :disabled="true" v-model="resultReportInfo.logId"></el-input>
      </el-form-item>
      <el-form-item label="Maintenance Time" prop="fixTime">
        <el-date-picker
          v-model="resultReportInfo.fixTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          placeholder="Select Maintenance Time">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Actual Cost" prop="actualCost">
        <el-input v-model.number="resultReportInfo.actualCost"></el-input>
      </el-form-item>
      <el-form-item label="Cause of Fault" prop="faultReason">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Please enter content."
          maxlength="200"
          show-word-limit
          v-model="resultReportInfo.faultReason">
        </el-input>
      </el-form-item>
      <el-form-item label="Result Description" prop="description">
        <RichTextEditor ref="RichTextEditor"></RichTextEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('resultForm')">Submit</el-button>
        <el-button @click="resetForm('resultForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import RichTextEditor from "../../../components/RichTextEditor";
  import store from "../../../store";
  export default {
    name: "",
    components: {RichTextEditor},
    props:['dialogVisible','logId'],
    data(){
      var checkMoney = (rule, value, callback) => {
        if (value===null) {
          return callback(new Error('Actual cost cannot be empty'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please enter actual cost'));
          } else {
            if (value < 0) {
              callback(new Error('Actual cost must be no smaller than 0.'));
            }else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          // selectableRange:['09:00:00 - 12:00:00', '14:00:00 - 18:30:00']
        },
        resultReportInfo:{
          createBy:store.getters.getUserId,
          createTime:new Date(),
          logId:null,
          fixTime:null,
          actualCost:null,
          faultReason:"",
          description:"",
        },
        rules:{
          fixTime: [
            { required: true, message: 'Please select  maintenance time', trigger: 'change' }
          ],
          actualCost: [
            { required: true, validator: checkMoney, trigger: 'blur' }
          ],
          faultReason: [
            { required: true, message: 'Please enter the cause of Fault', trigger: 'blur' }
          ],
          description:[
            { required: true }
          ]
        }
      }
    },
    watch:{
      logId(val){
        if(val!=0){
          this.resultReportInfo.logId=val;
        }
      }
    },
    methods:{
      submitForm(formName){
        if(this.$refs['RichTextEditor'].isEmpty()){
          this.$confirm('Result Description cannot be empty');
        }else{
          this.resultReportInfo.description=this.$refs['RichTextEditor'].getContent();
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.resultReportInfo.createTime=new Date().getTime();
              this.$emit("submitForm",this.resultReportInfo);
            } else {
              this.$confirm('The information is incorrect, please check and retry.');
            }
          });
        }


      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.$refs['RichTextEditor'].Clear();
      },
      handleClose(done){
        this.$confirm('Confirm to close?')
          .then(_ => {
            this.resetForm('resultForm');
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

<template>
  <el-dialog
    title="成果上报"
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
      <el-form-item label="维修单号">
        <el-input :disabled="true" v-model="resultReportInfo.logId"></el-input>
      </el-form-item>
      <el-form-item label="维修时间" prop="fixTime">
        <el-date-picker
          v-model="resultReportInfo.fixTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          placeholder="选择维修时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际成本" prop="actualCost">
        <el-input v-model.number="resultReportInfo.actualCost"></el-input>
      </el-form-item>
      <el-form-item label="故障原因" prop="faultReason">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          maxlength="200"
          show-word-limit
          v-model="resultReportInfo.faultReason">
        </el-input>
      </el-form-item>
      <el-form-item label="成果说明" prop="description">
        <RichTextEditor ref="RichTextEditor"></RichTextEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('resultForm')">提 交</el-button>
        <el-button @click="resetForm('resultForm')">重 置</el-button>
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
          return callback(new Error('实际成本不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入实际成本'));
          } else {
            if (value < 0) {
              callback(new Error('实际成本必须大于等于0元'));
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
            { required: true, message: '请选择维修时间', trigger: 'change' }
          ],
          actualCost: [
            { required: true, validator: checkMoney, trigger: 'blur' }
          ],
          faultReason: [
            { required: true, message: '请输入故障原因', trigger: 'blur' }
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
          this.$confirm('成果说明不能为空。');
        }else{
          this.resultReportInfo.description=this.$refs['RichTextEditor'].getContent();  
          this.$refs[formName].validate((valid) => {
            if (valid) {   
              this.resultReportInfo.createTime=new Date().getTime();
              this.$emit("submitForm",this.resultReportInfo);
            } else {
              this.$confirm('填报信息有误，请检查后重试');
            }
          });       
        }
        

      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.$refs['RichTextEditor'].Clear();
      },
      handleClose(done){
        this.$confirm('确认关闭？')
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

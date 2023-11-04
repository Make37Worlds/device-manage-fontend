<template>
  <el-dialog
    title="Additional Declaration"
    :visible.sync="dialogVisible"
    width="50%"
    @close="resetForm('addDeclarationForm')"
    :before-close="handleClose">
    <el-form
      @submit.native.prevent
      :model="addDeclarationInfo"
      :rules="rules"
      ref="addDeclarationForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="Maintenance Order ID">
        <el-input :disabled="true" v-model="addDeclarationInfo.logId"></el-input>
      </el-form-item>
      <el-form-item label="Additional Budget" prop="addBudget">
        <el-input v-model.number="addDeclarationInfo.addBudget"></el-input>
      </el-form-item>
      <el-form-item label="Additional Desccription" prop="description">
        <RichTextEditor ref="RichTextEditor" ></RichTextEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addDeclarationForm')">Submit</el-button>
        <el-button @click="resetForm('addDeclarationForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import RichTextEditor from '../../../components/RichTextEditor.vue'
  import store from "../../../store";
  export default {
    name:"",
    components: { RichTextEditor },
    props:['dialogVisible','logId'],
    data(){
      var checkMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Additional budget cannot be empty'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please enter additional budget'));
          } else {
            if (value < 0) {
              callback(new Error('Additional budget must above 0'));
            } else if(value>1000){
              callback(new Error('Each additional budget cannot exceed 1000'));
            }else {
              callback();
            }
          }
        }, 1000);
      };
      return{
        addDeclarationInfo:{
          createBy:store.getters.getUserId,
          createTime:null,
          logId:null,
          addBudget:"",
          description:"",
        },
        rules:{
          addBudget: [
            {required:true, validator: checkMoney, trigger: 'blur' }
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
          this.addDeclarationInfo.logId=val;
        }
      }
    },
    methods:{

      submitForm(formName){
        if(this.$refs['RichTextEditor'].isEmpty()){
          this.$confirm("Additional description cannot be empty。");
        }else{
          this.addDeclarationInfo.description=this.$refs['RichTextEditor'].getContent();
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.addDeclarationInfo.createTime=new Date().getTime();
              this.$emit('submitForm',this.addDeclarationInfo);
            } else {
              this.$confirm('The information submitted is incorrect, please check and try again.');
            }
          });
        }
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.$refs['RichTextEditor'].Clear();
      },
      handleClose(done){
        this.$confirm('Confirm close?')
          .then(_ => {
            this.resetForm('addDeclarationForm');
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

<template>
  <el-dialog 
    title="追加申报" 
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
      <el-form-item label="维修单号">
        <el-input :disabled="true" v-model="addDeclarationInfo.logId"></el-input>
      </el-form-item>
      <el-form-item label="追加预算" prop="addBudget">
        <el-input v-model.number="addDeclarationInfo.addBudget"></el-input>
      </el-form-item>
      <el-form-item label="追加说明" prop="description">
        <RichTextEditor ref="RichTextEditor" ></RichTextEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addDeclarationForm')">提 交</el-button>
        <el-button @click="resetForm('addDeclarationForm')">重 置</el-button>
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
          return callback(new Error('追加预算不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入追加预算'));
          } else {
            if (value < 0) {
              callback(new Error('追加预算必须大于0元'));
            } else if(value>1000){
              callback(new Error('每次追加预算不能超过1000元'));
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
          this.$confirm("追加说明不能为空。");
        }else{
          this.addDeclarationInfo.description=this.$refs['RichTextEditor'].getContent();
          this.$refs[formName].validate((valid) => {
            if (valid) {       
              this.addDeclarationInfo.createTime=new Date().getTime();
              this.$emit('submitForm',this.addDeclarationInfo);
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
<template>
  <el-form :model="logInfo" :rules="rules" ref="logForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="Damaged Facility ID" prop="facId">
      <el-input v-model="logInfo.facId"></el-input>
    </el-form-item>
    <el-form-item label="Fault Status" prop="faultCondition">
      <RichTextEditor ref="RichTextEditor" ></RichTextEditor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('logForm')">Report</el-button>
      <el-button @click="resetForm('logForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios"
import store from "../../../store"
import RichTextEditor from '../../../components/RichTextEditor.vue'
  export default {
    name: "Declare",
    components:{
      RichTextEditor,
    },
    data(){
      return {
        logInfo:{
          facId:"",
          faultCondition:"",
        },
        rules:{
          facId: [
            { required: true, message: 'Please select damaged facility ID', trigger: 'blur' },
            { min: 11, max: 11, message: 'Facility number is an 11-digit number.', trigger: 'blur' }
          ],
          faultCondition:[
            {required: true}
          ]
        }
      }
    },
    methods:{
      submitForm(formName){
        if(this.$refs['RichTextEditor'].isEmpty()){
          this.$notify.warning({
            title:"Fault status cannot be empty",
          })
        }else{
          this.logInfo.faultCondition=this.$refs['RichTextEditor'].getContent();
          this.$refs[formName].validate((valid) => {
            var newLog={
                createBy:store.getters.getUserId,
                createTime:new Date().getTime(),
                ...this.logInfo
              }
            if (valid) {
              axios.post('/efms/declare',newLog).then((res)=>{
                if(res.data.flag&&res.data.data!=null){
                  this.$notify({
                    title:"Maintenance report successful, the  maintenance order number is"+res.data.data,
                    type:'success',
                  })
                  this.resetForm(formName);
                }else{
                  this.$notify.error({
                    title:res.data.msg,
                  })
                }
              })
            } else {
              this.$notify.error({
                title:'The information is incorrect, operation failed.',
              })
            }
          });
        }
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.$refs['RichTextEditor'].Clear();
      }
    }
  }
</script>

<style scoped>
.el-input{
  width:854px;
}
</style>

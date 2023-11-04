<template>
  <el-form :model="logInfo" :rules="rules" ref="logForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="损毁设施编号" prop="facId">
      <el-input v-model="logInfo.facId"></el-input>
    </el-form-item>
    <el-form-item label="故障状况" prop="faultCondition">
      <RichTextEditor ref="RichTextEditor" ></RichTextEditor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('logForm')">立即申报</el-button>
      <el-button @click="resetForm('logForm')">重  置</el-button>
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
            { required: true, message: '请选择故障设施编号', trigger: 'blur' },
            { min: 11, max: 11, message: '设施编号为11位数', trigger: 'blur' }
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
            title:"故障状况不能为空。",
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
                    title:"维修申报成功，新增维修单编号为"+res.data.data,
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
                title:'申报信息有误，操作失败',
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

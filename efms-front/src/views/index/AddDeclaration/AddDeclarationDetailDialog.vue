<template>
  <el-dialog title="Additional Declaration Detail" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-descriptions  size="medium" class="margin-top" :column="2" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          Additional Declaration ID
        </template>
        {{AddDeclarationInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          Maintenance Order ID
        </template>
        {{AddDeclarationInfo.logId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Maintenance Technician ID
        </template>
        {{AddDeclarationInfo.createBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          Additional Time
        </template>
        {{AddDeclarationInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
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
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-s-check"></i>
          Reviewed Result
        </template>
        {{result}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label" >
          <i class="el-icon-document"></i>
          Reason for Reviewed Result
        </template>
        {{AddDeclarationInfo.reason}}
      </el-descriptions-item>

    </el-descriptions>
  </el-dialog>
</template>

<script>
export default {
  name:"AddDeclarationDetailDialog",
  props:['dialogVisible','AddDeclarationInfo'],
  methods:{
    handleClose(done){
      this.$emit('closeDialog');
    }
  },
  data(){
    return{
      result:'',
    }
  },
  watch:{
    AddDeclarationInfo(val){
      switch(val.result){
        case 1:
          this.result='Not Reviewed';
          break;
        case 2:
          this.result='Approved';
          break;
        case 3:
          this.result='Not Approved';
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style scoped>

</style>

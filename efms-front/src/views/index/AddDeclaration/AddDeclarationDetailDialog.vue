<template>
  <el-dialog title="追加申报详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-descriptions  size="medium" class="margin-top" :column="2" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          追加单号
        </template>
        {{AddDeclarationInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          维修单号
        </template>
        {{AddDeclarationInfo.logId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          维修员编号
        </template>
        {{AddDeclarationInfo.createBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          追加时间
        </template>
        {{AddDeclarationInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
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
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-s-check"></i>
          审批结果
        </template>
        {{result}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label" >
          <i class="el-icon-document"></i>
          处理原因
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
          this.result='未审核';
          break;
        case 2:
          this.result='审核已通过';
          break;
        case 3:
          this.result='审核未通过';
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
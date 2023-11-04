<template>
  <el-dialog
    title="Details of Result Review"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-descriptions size="medium" class="margin-top"  :column="2"  border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          Result ID
        </template>
        {{ResultReportInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          Maintenance Order ID
        </template>
        {{ResultReportInfo.logId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Maintenance Technician ID
        </template>
        {{ResultReportInfo.createBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          Actual Cost
        </template>
        {{ResultReportInfo.actualCost}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          Time of Report
        </template>
        {{ResultReportInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          Maintenance Time
        </template>
        {{ResultReportInfo.fixTime}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          Cause of the Fault
        </template>
        {{ResultReportInfo.faultReason}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          Result Description
        </template>
        <div v-html=ResultReportInfo.description></div>
      </el-descriptions-item>
      <el-descriptions-item  :span="2">
        <template slot="label">
          <i class="el-icon-s-check"></i>
          Review Result
        </template>
        {{result}}
      </el-descriptions-item>
      <el-descriptions-item  :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          Reason for Review Result
        </template>
        {{ResultReportInfo.reason}}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
  export default {
    name: "ReportDetailDialog",
    props:['dialogVisible','ResultReportInfo'],
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
      ResultReportInfo(val){//根据审核结果字段显示审核结果信息
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

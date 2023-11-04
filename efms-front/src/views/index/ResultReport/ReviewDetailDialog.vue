<template>
  <el-dialog
    title="成果审核详情"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-descriptions size="medium" class="margin-top"  :column="2"  border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          成果单号
        </template>
        {{ResultReportInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          维修单号
        </template>
        {{ResultReportInfo.logId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          维修员编号
        </template>
        {{ResultReportInfo.createBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          实际成本
        </template>
        {{ResultReportInfo.actualCost}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          上报时间
        </template>
        {{ResultReportInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          维修时间
        </template>
        {{ResultReportInfo.fixTime}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          故障原因
        </template>
        {{ResultReportInfo.faultReason}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          成果说明
        </template>
        <div v-html=ResultReportInfo.description></div>
      </el-descriptions-item>
      <el-descriptions-item  :span="2">
        <template slot="label">
          <i class="el-icon-s-check"></i>
          审核结果
        </template>
        {{result}}
      </el-descriptions-item>
      <el-descriptions-item  :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          处理原因
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

<template>
  <el-dialog title="Maintenance Order Detail" @open="setState" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-descriptions size="medium" class="margin-top" :column="2" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          Maintenance Order ID
        </template>
        {{FixLogInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Maintenance Applicant ID
        </template>
        {{FixLogInfo.createBy}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          Facility ID
        </template>
        {{FixLogInfo.facId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          Facility Location
        </template>
        {{FixLogInfo.facOffice}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-date"></i>
          Time of Report
        </template>
        {{FixLogInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item  :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          Fault Status
        </template>
        <div v-html="FixLogInfo.faultCondition"></div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Maintenance Technician ID
        </template>
        {{FixLogInfo.fixBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Person in Charge ID
        </template>
        {{FixLogInfo.head}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-date"></i>
          Maintenance Time
        </template>
        {{FixLogInfo.fixTime}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label" >
          <i class="el-icon-document"></i>
          Cause of Fault
        </template>
        {{FixLogInfo.faultReason}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          Maintenance Budget
        </template>
        {{FixLogInfo.budget}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          Actual Cost
        </template>
        {{FixLogInfo.actualCost}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-map-location"></i>
          Progress
        </template>
        {{stepInfo.currentState}}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
  export default {
    name:"FixLogDetailDialog",
    props:['dialogVisible','FixLogInfo'],
    data(){
      return {
        stepInfo:{
          currentState:"",
        }
      }
    },
    methods:{
      setState(){
        var state=this.FixLogInfo.state;
        switch(state){
          case 1:
            this.stepInfo.currentState="Damage Reported";
            break;
          case 2:
            this.stepInfo.currentState="Dispatched";
            break;
          case 3:
            this.stepInfo.currentState="Additional Declared";
            break;
          case 4:
            this.stepInfo.currentState="Additional Declaration Approved";
            break;
          case 5:
            this.stepInfo.currentState="Additional Declaration Not Approved";
            break;
          case 6:
            this.stepInfo.currentState="Result Reported";
            break;
          case 7:
            this.stepInfo.currentState="Result Report Approved";
            break;
          case 8:
            this.stepInfo.currentState="Result Report Not Approved";
            break;
        };
      },
      handleClose(){
        this.$emit('closeDialog');
      }
    }
  }
</script>

<style scoped>
</style>

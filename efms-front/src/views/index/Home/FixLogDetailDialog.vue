<template>
  <el-dialog title="维修单详情" @open="setState" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-descriptions size="medium" class="margin-top" :column="2" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          维修单号
        </template>
        {{FixLogInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          申报人编号
        </template>
        {{FixLogInfo.createBy}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          设施编号
        </template>
        {{FixLogInfo.facId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          设施位置
        </template>
        {{FixLogInfo.facOffice}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-date"></i>
          申报时间
        </template>
        {{FixLogInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item  :span="2">
        <template slot="label">
          <i class="el-icon-document"></i>
          故障状况
        </template>
        <div v-html="FixLogInfo.faultCondition"></div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          维修人编号
        </template>
        {{FixLogInfo.fixBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          负责人编号
        </template>
        {{FixLogInfo.head}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-date"></i>
          维修时间
        </template>
        {{FixLogInfo.fixTime}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label" >
          <i class="el-icon-document"></i>
          故障原因
        </template>
        {{FixLogInfo.faultReason}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          维修预算
        </template>
        {{FixLogInfo.budget}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-coin"></i>
          实际成本
        </template>
        {{FixLogInfo.actualCost}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-map-location"></i>
          进度
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
            this.stepInfo.currentState="已申报";
            break;
          case 2:
            this.stepInfo.currentState="已派遣";
            break;
          case 3:
            this.stepInfo.currentState="已追加申报";
            break;
          case 4:
            this.stepInfo.currentState="追加申报已通过";
            break;
          case 5:
            this.stepInfo.currentState="追加申报未通过";
            break;
          case 6:
            this.stepInfo.currentState="成果已上报";
            break;
          case 7:
            this.stepInfo.currentState="成果审核通过";
            break;
          case 8:
            this.stepInfo.currentState="成果审核未通过";
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

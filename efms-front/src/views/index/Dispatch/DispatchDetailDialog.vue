<template>
  <el-dialog title="Maintenance Order Awaiting Dispatch" :visible.sync="dialogVisible" width="50%" @open="getStaff" :before-close="handleClose">
    <el-descriptions class="margin-top" :column="2" border>
      <el-descriptions-item >
        <template slot="label">
          <i class="el-icon-document"></i>
          Maintenance Order ID
        </template>
        {{FixlogInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          Facility ID
        </template>
        {{FixlogInfo.facId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Maintenance Applicant ID
        </template>
        {{FixlogInfo.createBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          Report Time
        </template>
        {{FixlogInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          Cause of Fault
        </template>
          <div v-html=FixlogInfo.faultCondition></div>
      </el-descriptions-item>
    </el-descriptions>
    <!-- 选择人员并派遣 -->
    <!--派遣与驳回按钮-->
    <div class="option">
      <div class="option-choose">
        <el-select v-model="fixBy" clearable filterable placeholder="Select maintenance technician to dispatch">
          <el-option
            v-for="item in fixStaff"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="option-button">
        <el-button type="primary" size="medium" @click="submitForm">Dispatch</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios"
export default {
  name:"DispatchDetailDialog",
  props:['dialogVisible','FixlogInfo'],
  data(){
    return {
      logId:null,
      fixBy:"",
      fixStaff:[],
    }
  },
  watch:{
    FixlogInfo(val){
      this.logId=val.id;
    }
  },
  methods:{
    //获取维修人员，并显示到选择框中
    getStaff(){
      //清空员工选择框
      this.fixBy="",
      axios.get('/efms/dispatch').then((res)=>{
        if(res.data.flag&&res.data.data!=null){
          this.fixStaff=res.data.data;
        }else{
          this.$confirm("Failed to get  personnel info. Please close and try again later");
        }
      })
    },

    handleClose(done){
      this.$confirm('Confirm close?')
        .then(_ => {
          this.$emit('closeDialog');
        })
        .catch(_ => {});
    },

    submitForm(){
      if(this.fixBy===""){
        this.$confirm("Please select technician to dispatch");
      }else{
        this.$emit("submit",this.logId,this.fixBy);
      }

    }
  }
}
</script>

<style scoped>
  .el-select{
    width:516px;
  }
  .option{
    margin-top:10px;
    display: flex;
  }
  .option-choose{
    margin-top:10px;
  }
  .option-button{
    margin-left:10px;
    padding-top:10px ;
  }

</style>

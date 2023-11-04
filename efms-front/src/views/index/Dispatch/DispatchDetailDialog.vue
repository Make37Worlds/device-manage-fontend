<template>
  <el-dialog title="待派遣维修单详情" :visible.sync="dialogVisible" width="50%" @open="getStaff" :before-close="handleClose">
    <el-descriptions class="margin-top" :column="2" border>
      <el-descriptions-item >
        <template slot="label">
          <i class="el-icon-document"></i>
          维修单号
        </template>
        {{FixlogInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          设施编号
        </template>
        {{FixlogInfo.facId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          报修人编号
        </template>
        {{FixlogInfo.createBy}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          申报时间
        </template>
        {{FixlogInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-document"></i>
          故障原因
        </template>
          <div v-html=FixlogInfo.faultCondition></div>
      </el-descriptions-item>
    </el-descriptions>
    <!-- 选择人员并派遣 -->
    <!--派遣与驳回按钮-->
    <div class="option">
      <div class="option-choose">
        <el-select v-model="fixBy" clearable filterable placeholder="请选择要派遣的维修人员">
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
        <el-button type="primary" size="medium" @click="submitForm">派 遣</el-button>
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
          this.$confirm("维修人员获取失败，请关闭当前弹框，稍后再试");
        }
      })
    },

    handleClose(done){
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('closeDialog');
        })
        .catch(_ => {});
    },

    submitForm(){     
      if(this.fixBy===""){
        this.$confirm("请选择派遣人员。");
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

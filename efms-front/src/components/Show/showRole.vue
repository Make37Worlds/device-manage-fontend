<template>
    <el-tooltip class="item" effect="dark" :content="'角色编号：'+id" placement="top-start">
      <el-tag v-show="!empty" type="primary">{{roleName}}</el-tag>
    </el-tooltip>
</template>

<script>
import axios from "axios"
export default {
    props:['id'],
    data(){
        return{
            roleName:"",
            empty:true,
        }
    },
    methods:{
        getRole(id){
            if(id!==null){
                axios.get("/efms/rolemanage/getname/"+id).then((res)=>{            
                    if(res.data.flag&&res.data.data!=""){
                        this.empty=false;
                        this.roleName=res.data.data;
                    }else{
                        this.empty=true;
                    }
                })
            }else{
                this.empty=true;
            }   
        }
    },
    created(){
        this.getRole(this.id);
    },
    watch:{
        id(val){
            this.getRole(val);
        }
    }
}
</script>

<style>

</style>
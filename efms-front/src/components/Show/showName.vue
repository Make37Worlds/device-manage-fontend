<template>
    <el-tooltip class="item" effect="dark" :content="id" placement="top-start">
      <el-tag v-show="!empty" type="primary">{{name}}</el-tag>
    </el-tooltip>
</template>

<script>
import axios from "axios"
export default {
    props:['id'],
    data(){
        return{
            name:"",
            empty:true,
        }
    },
    methods:{
        getName(id){
            if(id!==null){
                axios.get("/efms/empmanage/getname/"+id).then((res)=>{            
                    if(res.data.flag&&res.data.data!=""){
                        this.empty=false;
                        this.name=res.data.data;
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
        this.getName(this.id);
    },
    watch:{
        id(val){
            this.getName(val);
        }
    }
}
</script>

<style>

</style>
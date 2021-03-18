<template>
    <div class="titles">
        <span class="item-0">{{name}}</span><div class="item-1"></div><div class="item-2"></div><div class="item-3"></div>
        <div class="sub-title">Process Monitoring</div>
    </div>
</template>
<script>
export default {
    name:'titles',
    props:{
        name:String
    },
    data(){
        return{
            changeName:''
        }
    },
    methods:{

    },
    mounted(){
        
    }
}
</script>
<style lang="less" scoped>
.sub-title{
    font-size: 12px;
    color:rgba(255,255,255,0.4);
    font-family:PingFangSC-Regular,PingFang SC;
}
.titles{
    text-align: left;
}
.item-0,.item-1,.item-2,.item-3{
    display: inline-block;
}
.item-0{
    margin-right: 10px;
    // width:80px;
    height:28px;
    font-size:20px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:500;
    color:rgba(58,255,236,1);
    line-height:28px;
}
.item-1{
    margin-right: 4px;
    width:3px;
    height:16px;
    background:rgba(54,101,232,1);
    transform: rotate(30deg)
}
.item-2{
    width:3px;
    height:16px;
    background:rgba(58,255,236,1);
    transform: rotate(30deg)
}
.item-3{
    margin-left: -5px;
    width:164px;
    height:2px;
    border:1px solid;
    border-image:linear-gradient(270deg, rgba(0,189,225,0), rgba(58,255,236,1)) 1 1;
}
</style>
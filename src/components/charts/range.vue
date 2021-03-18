<template>
    <div class="range">
        <div class="range-title">
            {{type}}
        </div>
        <div class="range-type" v-if="type == '风险排行'">
            <span>门店名称</span>
            <span>跨区车辆数</span>
            <span>跨区次数</span>
        </div>
        <div class="range-type" v-if="type == '安装排行'">
            <span>名称</span>
            <span>设备数</span>
            <span>车辆数</span>
        </div>
        <div class="range-type" style="margin-left:15%;" v-if="type == '门店排名'">
            <span>风险源</span>
            <span>平均分</span>
            <span>车辆数</span>
        </div>
        <div class="range-content" ref="box" @mouseover="over" @mouseout="out">
            <ul class="list1" ref="list1" v-if="type == '风险排行'">
                <li class="clear" v-for="(item,index) in setupList" :key="index">
                    <p class="item-1">{{index+1}} {{item.name}}</p>
                    <p class="item-2">{{item.data1}}</p>
                    <p class="item-3">{{item.data2}}</p>
                    <Progress v-if="type != '门店排名'" :stroke-width="3" :hide-info="true" :percent="item.percent" :stroke-color="['#3665E8','#3AFFEC']"/>
                </li>
            </ul>
            <ul class="list1" ref="list1" v-if="type == '安装排行'">
                <li class="clear" v-for="(item,index) in riskList" :key="index">
                    <p class="item-1">{{index+1}} {{item.name}}</p>
                    <p class="item-2">{{item.data1}}</p>
                    <p class="item-3">{{item.data2}}</p>
                    <Progress v-if="type != '门店排名'" :stroke-width="3" :hide-info="true" :percent="item.percent" :stroke-color="['#3665E8','#3AFFEC']"/>
                </li>
            </ul>
            <ul class="list1" style="margin-left:15%;" ref="list1" v-if="type == '门店排名'">
                <li class="clear" v-for="(item,index) in storeList" :key="index">
                    <p class="item-1">{{index+1}} {{item.name}}</p>
                    <p class="item-2">{{item.data1}}</p>
                    <p class="item-3">{{item.data2}}</p>
                    <Progress v-if="type != '门店排名'" :stroke-width="3" :hide-info="true" :percent="item.percent" :stroke-color="['#3665E8','#3AFFEC']"/>
                </li>
            </ul>
            <ul class="list2" :style="{marginLeft:type=='门店排名'?'15%':'0%'}" ref="list2">
                
            </ul>
        </div>
    </div>
</template>
<script>
import {storeData,setupData,riskData} from '../../mock/data';
export default {
    name:'range',
    props:{
        type:String,
    },
    data(){
        return{
            storeList:storeData,
            setupList:setupData,
            riskList:riskData,
            myMar:null,
            speed:80,
            list1:null,
            list2:null,
            box:null
        }
    },
    methods:{
        Marquee(){
            if(this.list2.offsetHeight-this.box.scrollTop<=0)  
                this.box.scrollTop-=this.list1.offsetHeight    
            else{  
                this.box.scrollTop++;
            }  
        },
        over(){
            clearInterval(this.MyMar)
        },
        out(){
            this.MyMar = setInterval(this.Marquee.bind(this),this.speed)
        }
    },
    mounted(){
        this.box = this.$refs.box;
        this.list1 = this.$refs.list1;
        this.list2 = this.$refs.list2;
        this.list2.innerHTML = this.list1.innerHTML;
        this.MyMar=setInterval(this.Marquee.bind(this),this.speed);
    }
}
</script>
<style lang="less" scope>
    .range{
        height: 100%;
        width: 100%;
        display: inline-block;
        .range-title{
            margin-bottom: 12px;
            width:56px;
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,0.54);
            line-height:20px;
        }
        .range-type{
            // padding-left: 24px;
            text-align: left;
            margin-bottom: 12px;
            span:first-child{
                display: inline-block;
                width:101px;
                margin-right: 5px;
            }
            span:nth-child(2),span:nth-child(3){
                display: inline-block;
                width: 60px;
                margin-right: 10px;
            }
            span{
                height:17px;
                font-size:12px;
                font-family:PingFangSC-Semibold,PingFang SC;
                font-weight:600;
                color:rgba(54,101,232,1);
                line-height:17px;
            }
        }
        .range-content{
            // padding-left: 24px;
            height:90px;
            overflow: hidden;
            li{
                text-align: left;
                padding-bottom: 4px;
                .item-1{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width:101px;
                    text-align: left;
                    height:17px;
                    font-size:12px;
                    margin-right: 5px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:17px;
                    
                }
                .item-2,.item-3{
                    width:40px;
                    height:17px;
                    margin-right:30px;
                    font-size:14px;
                    font-family:Impact;
                    color:rgba(58,255,236,1);
                    line-height:17px;
                }
                .item-3{
                    margin-right: 10px;
                }
                .item-4{
                    width: 110px;
                    // padding: 0 2px;
                }
                .ivu-progress{
                    width: 25%;
                    .ivu-progress-inner{
                        background: transparent;
                    }
                }
                p{
                    // float: left;
                    display:inline-block;
                }
            }
        }
    }

</style>
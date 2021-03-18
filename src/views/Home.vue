<template>
    <div class="home">
        <layout>
            <Header class="header">
                <div class="nav">
                    <div class="move-line">
                        <div class="left-line">
                            <div class="line"></div>
                            <div class="block">
                                <div class="item-1"></div>
                                <div class="item-2"></div>
                                <div class="item-3"></div>
                                <div class="item-4"></div>
                            </div>
                        </div>
                        <div class="shade-line"></div>
                        <div class="right-line">
                            <div class="block">
                                <div class="item-1"></div>
                                <div class="item-2"></div>
                                <div class="item-3"></div>
                                <div class="item-4"></div>
                            </div>
                            <div class="line"></div>
                        </div>
                    </div>
                    <div class="logo">
                        <div>
                            <!-- <img src="../assets/image/logo.png" alt=""> -->
                            <span>XXXX集团</span>

                        </div>
                    </div>
                    <div class="name">
                        <span>风控大数据决策平台</span>
                    </div>
                    <div class="info">
                        <div class="time">
                            <i></i>
                            <my-time></my-time>
                        </div>
                        <i class="info-line"></i>
                        <div class="weather"><i class="weather-type"></i><i class="wenduji"></i><span>{{temp}}°C</span></div>
                    </div>
                </div>
            </Header>
        </layout>
        <layout class="main">
            <Sider class="left" >
                <div class="left-charts">
                    <div class="status">
                        <titles :name="'状态异常'"></titles>
                        <transition name="my">
                            <bar-chart></bar-chart>
                        </transition>
                    </div>
                    <div class="cloud">
                        <word-cloud></word-cloud>
                    </div>
                    <div class="mileage">
                        <titles :name="'里程异常'"></titles>
                        <transition name="my">
                            <line-chart v-if="lineShow"></line-chart>
                        </transition>
                    </div>
                    <div class="speed">
                        <titles :name="'速度异常'"></titles>
                        <gauge-chart></gauge-chart>
                    </div>
                </div>
            </Sider>
            <layout class="center">
                <Content class="content">
                    <map-chart></map-chart>
                    <!-- <map-copy></map-copy> -->
                    <statistic></statistic>
                </Content>
                <Footer class="footer">
                    <div class="stores-analysis">
                        <titles :name="'门店风险分析'"></titles>
                        <div class="stores-analysis-content">
                            <range style="width:48%;" :type="'安装排行'"></range>
                            <range style="width:48%;" :type="'风险排行'"></range>
                        </div>
                    </div>
                    <div class="warn-compare">
                        <titles :name="'当日报警对比'"></titles>
                        <div class="warn-compare-content">
                            <animateCirclr v-for="(item,index) in circle" :key="index" :circles="item"></animateCirclr>
                        </div>
                    </div>
                </Footer>
            </layout>     
            <Sider class="right">
                <div class="right-charts">
                    <div class="high-danger">
                        <titles :name="'高危车辆诊断'"></titles>
                        <car></car>
                    </div>
                    <div class="black-danger">
                        <titles :name="right_btn_type == '黑区风险'?'跨区风险':'黑区风险'"></titles>
                            <div class="change_btn" @click="change_data()">{{right_btn_type}}</div>
                        <radar-chart></radar-chart>
                        <line-rchart></line-rchart>
                        <range :type="'门店排名'"></range>
                        <pie-chart></pie-chart>
                    </div>
                </div>
            </Sider>
        </layout>  
            <transition name="scoreCardAnimate">
                <!-- <div class="model">
                    <score-card></score-card>
                </div>  -->
                <div v-if="scoreCardStatus" class="model">
                    <score-card></score-card>
                </div> 
            </transition>
    </div>
</template>

<script>
// @ is an alias to /src
import titles from '../components/common/titles';
import mapChart from '../components/charts/map';
import barChart from '../components/charts/bar';
import wordCloud from '../components/charts/wordCloud';
import lineChart from '../components/charts/line';
import lineRChart from '../components/charts/line_right';
import gaugeChart from '../components/charts/gauge';
import radarChart from '../components/charts/radar';
import car from '../components/charts/car';
import range from '../components/charts/range';
import pieChart from '../components/charts/pie';
import animateCirclr from '../components/charts/animateCircle';
import statistic from '../components/common/statistic';
import myTime from '../components/common/myTime';
import scoreCard from '../components/common/scoreCard';
import map_copy from '../components/charts/map_copy';
import { test } from '../untils/api';
export default {
    name: 'home',
    data(){
        return{
            lineShow:false,
            circle:[{
                type:'光敏预警',
                nums:37349,
                base:40000
            },{
                type:'断电预警',
                nums:11621,
                base:40000
            },{
                type:'翻转预警',
                nums:901,
                base:40000
            },{
                type:'碰撞预警',
                nums:16088,
                base:40000
            },{
                type:'伪基站探测预警',
                nums:3271,
                base:40000
            },{
                type:'震动预警',
                nums:231,
                base:40000
            },],
            temp:12,                    //温度
            weaeher_types:'多云',        //天气类型
            scoreCardStatus:0,
            right_btn_type:'黑区风险'
        }
    },
    methods:{
        getStyle(el,name){
            if(window.getComputedStyle){
                return window.getComputedStyle(el,null);
            }else{
                return el.currentStyle;
            }
        },
        change_data(){
            this.$store.state.riskType = this.right_btn_type;
            this.right_btn_type = this.right_btn_type == '黑区风险'?'跨区风险':'黑区风险';
        }
    },
    mounted() {
        let t = this;
        setTimeout(()=>{
            t.lineShow = true;
        },500)
    },
    computed:{
        sc(){
            return this.$store.state.scoreCardStatus;
        }
    },
    watch:{
        sc:function(a,b){
            this.scoreCardStatus = a;
        }
    },
    mounted(){
        test().then(res=>{
            console.log(res)
        })
    },
    components: {
        'map-chart':mapChart,
        'map-copy':map_copy,
        'bar-chart':barChart,
        'word-cloud':wordCloud,
        'line-chart':lineChart,
        'gauge-chart':gaugeChart,
        'radar-chart':radarChart,
        'pie-chart':pieChart,
        'titles':titles,
        'car':car,
        'range':range,
        'animateCirclr':animateCirclr,
        'statistic':statistic,
        'my-time':myTime,
        'score-card':scoreCard,
        'line-rchart':lineRChart
    }
}
</script>
<style lang="less">

@import "../assets/less/common.less";
</style>
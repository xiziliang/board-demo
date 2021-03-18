<template>
    <div class="map-chart_copy">
        <div class="charts"></div>
        <div class="mapData-type">
            <div class="mdt-item-1" :class="{active:type_active == 'using'}" @click="type_active = 'using';checkType()">乘用车</div>
            <div class="mdt-item-2" :class="{active:type_active == 'business'}" @click="type_active = 'business';checkType()">商用车</div>
            <div class="mdt-item-3" :class="{active:type_active == 'all'}" @click="type_active = 'all';checkType()">全类型</div>
        </div>
        <div class="back" v-show="map.level == 'provice'" @click="backToChina()"></div>
    </div>
</template>
<script>
import {getSaveUserInfo,getDetailInfo} from '../../untils/api';
import chinaMap from 'echarts/map/json/china';
import {proviceMap} from '../../untils/geojson';
import { provice } from '../../untils/api';
import {proviceCode} from '../../untils/proviceCode';
const mapIcon = require('../../assets/image/mapIcon.svg');
export default {
    name:'mapChart',
    data(){
        return{
            mapOptions:{
               
            },
            mapChart:null,
            type_active:'all',
            map:{
                type:'china',
                data:chinaMap,
                size:800,
                code:'',
                level:'china'
            },
            scatterData:[],
            scatterShowData:[],
            heatData:[],
            heatShowData:[],
            heatMax:700,
            heatMin:100,
            randomNum:1,
            listenerCount:0,
            listenerCount2:0
            // tipsTimeInterval:0,
        }   
    },
    methods:{
        initChart(){
            function bodylintener(){

            }
            let t = this;
            // if(this.mapChart == null){
                this.mapChart = this.$echarts.init(document.querySelector('.map-chart_copy .charts'));
            // }
            this.$echarts.registerMap(this.map.type,this.map.data);
            
            this.getData();
            this.mapChart.off('click');
            this.mapChart.on('click',function(params){
                if(params.componentSubType == 'scatter'){
                    t.listenerCount = 1;
                    clearInterval(t.tipsTimeInterval)
                    // 取消所有散点高亮
                    t.mapChart.dispatchAction({
                        type: "downplay",
                        seriesIndex: 1 //第几条series
                    });
                    // 显示指定data 的tooltip
                    t.mapChart.dispatchAction({
                        type: "showTip",
                        seriesIndex: 1, //第几条series
                        dataIndex: params.dataIndex //第几个tooltip
                    });
                    // 高亮指定的散点
                    t.mapChart.dispatchAction({
                        type: "highlight",
                        seriesIndex: 1, //第几条series
                        dataIndex: params.dataIndex //第几个tooltip
                    });
                    var sc = document.querySelector('.map-sorceCard');
                    sc.addEventListener('click',function(){
                        t.mapChart.dispatchAction({
                            type: 'hideTip'
                        })
                        clearInterval(t.tipsTimeInterval);
                        t.$store.commit('SET_scoreCard_status',1);
                    })
                }
                if(params.componentType == 'geo'){
                    t.map.type = proviceCode[params.name].name;
                    t.map.code = proviceCode[params.name].code;
                    t.map.data = proviceMap[t.map.type];
                    t.map.size = 700;
                    
                    if(t.map.type != undefined && t.map.data != undefined){
                        t.setData(t.map.code,'provice');
                    }else{
                        alert('暂时还没有当前区域数据')
                    }
                }
            })
        },
        getData(){
            function closeTips(){
                console.log('close')
            }
            let t =this;
            this.mapOptions = {
                backgroundColor:'',
                tooltip: {
                    show: true,
                },
                geo:{
                    map: this.map.type,
                    // roam:'scale',
                    aspectScale:0.75,
                    itemStyle: {
                        areaColor:'rgba(15, 36, 111, 1)',
                        opacity:.6,
                        borderColor:'rgba(39, 96, 247, 1)',
                        borderWidth:2.3,
                    },
                    layoutCenter: ['48%', '48%'],
                    layoutSize: this.map.size,
                    label: {
                        show: true,
                        textStyle: {
                            color: 'rgba(255,255,255,0.2)', //地图初始化区域字体颜色
                            fontSize: 10,
                            opacity: 1,
                            backgroundColor: 'rgba(0,0,0,0)'
                        },
                    },
                    emphasis: { //当鼠标放上去  地区区域是否显示名称
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                            }
                        },
                        itemStyle:{
                            areaColor:'#153066'
                        }
                    },
                    regions: [{
                        name: '中国',
                        itemStyle: {
                            areaColor: 'red',
                            color: 'red'
                        }
                    }],
                    realisticMaterial:{
                        // detailTexture:'asset/leather/leather_albedo.jpg'
                    },
                    zlevel:2,
                },
                visualMap:{
                    show:false,
                    bottom:50,
                    right:50,
                    min: this.heatMin,
                    max: this.heatMax,
                    splitNumber:5,
                    inRange:{
                        color: ['rgba(108, 92, 255, 1)','rgba(79, 196, 255, 1)','rgba(97, 235, 184, 1)','rgba(255, 247, 116, 1)','rgba(255, 161, 101, 1)'],
                        // color: ['#f1ea29','#f1b629','#ff8400','#ff2a00'],
                    },
                    seriesIndex:2,
                    controller:{
                        inRange:{
                            symbol:'diamond',    
                            color: ['rgba(108, 92, 255, 1)','rgba(79, 196, 255, 1)','rgba(97, 235, 184, 1)','rgba(255, 247, 116, 1)','rgba(255, 161, 101, 1)'],
                            // color: ['#f1ea29','#f1b629','#ff8400','#ff2a00'],
                        }
                    },
                    // calculable: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 12
                    }
                },
                tooltip:{
                    show:true,
                    triggerOn: "none",
                    formatter:function(params){
                        const h = ` <div class="charts-tip" style="position:relative;z-index:999;padding:13px;height:108px;border:1px solid;border-image:linear-gradient(180deg, rgba(54,153,232,1), rgba(58,255,236,1)) 1 1;background:rgba(0,44,55,1);opacity:0.89;">
                                        <div class="sorceCard-dot" style="top:-3px;left:-3px;"></div><div class="sorceCard-dot" style="top:-3px;right:-3px;"></div><div class="sorceCard-dot" style="bottom:-3px;left:-3px;"></div><div class="sorceCard-dot" style="bottom:-3px;right:-3px;"></div>
                                        <p style="margin-bottom:8px;font-size:14px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(239,242,255,1);line-height:20px;">车主: ${params.data[2]}</p>
                                        <p style="margin-bottom:8px;font-size:14px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(239,242,255,1);line-height:20px;">评分: ${params.data[3]}</p>
                                        <div class="map-sorceCard" style="text-align:center;width:62px;height:24px;background:linear-gradient(180deg,rgba(108,250,231,0) 0%,rgba(255,159,115,0) 44%,rgba(242,58,58,0.14) 100%);border-radius:1px;
                                        border:1px solid;border-image:linear-gradient(180deg, rgba(54,153,232,1), rgba(58,255,236,1)) 1 1;color:rgba(58,255,236,1);line-height:20px;cursor:pointer;">评分卡</div>
                                    </div>`
                        return h;
                    },
                    transitionDuration:1,
                    backgroundColor:''
                },
                series:[{
                    // roam:'scale',
                    type:'map',
                    itemStyle:{
                        areaColor:'rgba(33, 39, 107, 1)',
                        borderColor:'rgba(39, 96, 247, 1)',
                        opacity:.6
                    },
                    silent:true,
                    aspectScale:0.75,
                    map:this.map.type,
                    layoutCenter: ['47%', '50%'],
                    layoutSize: this.map.size,
                    zlevel:1
                },
                {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.scatterShowData,
                // symbolKeepAspect:true,
                symbol:`image://${mapIcon}`,
                symbolSize: [8,14],
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false,
                        position:'top',
                        backgroundColor:'#002C37',
                        borderColor:'#3699E8',
                        width:153,
                        height:108,
                        padding:13
                    }
                },
                itemStyle:{
                    color:'#1BC9B7'
                },
                zlevel:4
            },
            {
                name:'热力图',
                type:'heatmap',
                coordinateSystem: 'geo',
                pointSize:20,
                data:this.heatShowData,
                progressive:3,
                blurSize:15,
                zlevel:3
            }]
            };

            this.mapChart.setOption(this.mapOptions);
            
        },
        getPoint(level){
            let t = this;
            return new Promise((resolve,reject)=>{
                if(level == 'china'){
                    getSaveUserInfo().then(res=>{
                        res.data.Data.forEach(element=>{
                            t.scatterData.push([element.Lng,element.Lat,element.UserName,element.Scorete]);
                        })
                        t.scatterShowData = t.scatterData;
                        resolve(t.scatterShowData);
                    })
                }else{
                    t.scatterShowData = [];
                    resolve(t.scatterShowData);
                }
            })
            
        },
        timeout(){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve()
                },2000)
            })
        },
        async setData(code,level){
            let t = this;
            this.map.level = level;
            this.scatterShowData = [];
            this.heatShowData = [];
            this.scatterData = [];
            this.heatData = [];
            this.initChart();
            await this.timeout();
            let pointData = await this.getPoint(level);
            let heatMapData = await this.getHeatMap(code);
            this.getData();
            if(this.tipsTimeInterval == null){
                this.tipsTimeInterval = setInterval(() => {
                    t.showRandomTip();
                }, 2000);
            }
            
        },
        getHeatMap(proCode=''){
            return new Promise((resolve,reject)=>{
                let t = this;
                let nums = [];
                getDetailInfo({'procode':proCode}).then(res=>{
                    res.data.Data.forEach(element=>{
                        // if(Math.round(element.Amount/10) < t.heatMin){
                        //     element.Amount = t.heatMin;
                        // }
                        // if(Math.round(element.Amount/10) > t.heatMax){
                        //     element.Amount = t.heatMax;
                        // }
                        
                        t.heatData.push([element.Lng,element.Lat,Math.round(Math.log(element.Amount)/Math.log(1.1))]);
                        nums.push(Math.round(Math.log(element.Amount)/Math.log(1.1)));
                    })
                    t.heatShowData = t.heatData;
                    t.heatMax = Math.max.apply(null,nums);
                    t.heatMin = Math.min.apply(null,nums);
                    resolve(t.heatShowData)
                })
            })
        },
        showRandomTip(){
            let t = this;
            t.listenerCount = 3;
            if(this.randomNum == this.scatterShowData.length+1){
                this.randomNum = 1;
            }
            // 取消所有散点高亮
            this.mapChart.dispatchAction({
                type: "downplay",
                seriesIndex: 1 //第几条series
            });
            this.mapChart.dispatchAction({
                type: "highlight",
                seriesIndex: 1, //第几条series
                dataIndex: t.randomNum //第几个tooltip
            });
            this.mapChart.dispatchAction({
                type: "showTip",
                seriesIndex: 1, //第几条series
                dataIndex: t.randomNum //第几个tooltip
            });
            this.addListener();
            this.randomNum ++;
        },
        addListener(){
            let t = this;
            var ct = document.querySelector('.charts-tip');
            function outFun(){
                t.tipsTimeInterval = setInterval(()=>{
                    t.showRandomTip()
                },2000)
            }
            function overFun(){
                clearInterval(t.tipsTimeInterval)
            }
            ct.addEventListener('mouseover',overFun);
            ct.addEventListener('mouseout',outFun);
            var sc = document.querySelector('.map-sorceCard');
            sc.addEventListener('click',function(){
                t.mapChart.dispatchAction({
                    type: 'hideTip'
                })
                clearInterval(t.tipsTimeInterval);
                ct.removeEventListener('mouseover',overFun)
                ct.removeEventListener('mouseout',outFun)
                t.$store.commit('SET_scoreCard_status',1);
            })
        },
        checkType(){
            if(this.type_active == 'using'){
                this.scatterShowData = this.scatterData.slice(0,29);
                this.heatShowData = this.heatData.slice(0,10)
                this.getData();
            }
            if(this.type_active == 'business'){
                this.scatterShowData = this.scatterData.slice(30);
                this.heatShowData = this.heatData.slice(11)
                this.getData();
            }
            if(this.type_active == 'all'){
                this.scatterShowData = this.scatterData;
                this.heatShowData = this.heatData;
                this.getData();
            }
        },
        backToChina(){
            this.map.type = 'china';
            this.map.code = '';
            this.map.data = chinaMap;
            this.map.size = 800;
            this.setData('','china');
        }
    },
    computed:{
        showtips(){
            return this.$store.state.scoreCardStatus;
        }
    },
    watch:{
        showtips(a,b){
            let t =this;
            if(a == 0){
                clearInterval(this.tipsTimeInterval)
                this.tipsTimeInterval = setInterval(() => {
                    t.showRandomTip();
                }, 2000);
            }
        }
    },
    mounted() {
        this.setData('','china');
        let t = this;
        window.addEventListener('resize',()=>{
            t.mapChart.resize();
        })
        
        document.body.addEventListener('click',(e)=>{
            let dom = e.target;
            let classname = dom.className;
            if(t.listenerCount == 3)return;
            if(t.listenerCount != 1 && classname != 'charts-tip'){
                t.mapChart.dispatchAction({
                    type: 'hideTip'
                })
                clearInterval(t.tipsTimeInterval)
                t.tipsTimeInterval = setInterval(() => {
                    t.showRandomTip();
                }, 2000);
            }else{
                t.listenerCount = 0;
            }
        })
    },
}
</script>
<style lang="less">
@import "../../assets/less/chart.less";
.sorceCard-dot{
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: absolute;
    background-color: rgba(58, 255, 236, 1);
}
.charts-tip{
    min-width:143px;
    min-height:98px;
    text-align: left;
}
.tips-close{
    background: url('../../assets/image/tipsclose.png') center no-repeat;
    cursor: pointer;
    width: 13px;
    height: 13px;
    position: absolute;
    top: 5px;
    right: 5px;
}
</style>
<template>
    <div class="bar-chart">
    </div>
</template>
<script>
import {getWeather,bdApi} from '../../untils/api';
export default {
    name:'barChart',
    data(){
        return {
            barOptions:{},
            barChart:null
        }
    },
    methods:{
        init(){
            this.barChart = this.$echarts.init(document.querySelector('.bar-chart'));
            this.barChart.setOption(this.barOptions);
        },
        createColorLinear(co1,co2){
            return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: co1
                },
                {
                    offset: 1,
                    color: co2
                }
            ]);
        },
        getData(){
            let yAxisData  = [0,500,1000,1500];
            let xAxisData = ['3-7','8-14','14-90','90以上'];
            let offlineData = [2639,7924,7042,24881];
            let staticData = [4548,1211,933,21];

            let colorLinear1 = this.createColorLinear('rgba(44, 76, 242, 0.44)','rgba(58, 157, 255, 0.42)');
            let colorLinear2 = this.createColorLinear('#3699E8','#3AFFEC');
            let borderColor1 = this.createColorLinear('rgba(44, 76, 242, 1)','rgba(58, 157, 255, 1)');
            let borderColor2 = this.createColorLinear('rgba(54, 153, 232, 1)','rgba(58, 255, 236, 1)');
            let fontColor = 'rgba(255,255,255,0.5)';
            this.barOptions = {
                title:{
                    text:'展示状态',
                    textStyle:{
                        color:fontColor,
                        fontSize:14,
                        fontWeight:500,
                        fontFamily:"PingFangSC-Medium,PingFang SC"
                    },
                    top:0,
                    left:0
                },
                legend:{
                    type:'plain',
                    data:['静止','离线'],
                    textStyle:{
                        color:fontColor,
                        fontSize:10
                    },
                    icon:'circle',
                    itemWidth:5,
                    top:30,
                    right:0
                },
                animationDuration:1000,
                xAxis:[{
                    type:'category',
                    name:'天数',
                    nameTextStyle:{
                        lineHeight:26,
                        color:'#3AADF2',
                        fontSize:10,
                        align:'right',
                        verticalAlign:'top'
                    },
                    barWidth:10,
                    axisLabel:{
                        // interval:1
                        color:fontColor,
                        fontSize:9
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#3AADF2',
                            opacity:.5
                        }
                    },
                    data:xAxisData
                }],
                yAxis:[{
                    type:'value',
                    name:'设备数',
                    nameLocation:'end',
                    nameTextStyle:{
                        color:'#3AADF2',
                        fontSize:10,
                        lineHeight:10,
                        align:'right',
                    },
                    
                    axisLine:{
                        show:false,
                    },
                    axisLabel:{
                        // interval:1,
                        color:fontColor,
                        fontSize:10
                    },
                    offset:0,
                    axisTick:{
                        show:false
                    },
                    splitNumber:3,
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'#3AADF2',
                            width:1,
                            type:'solid',
                            opacity:0.2
                        }
                    }
                }],
                grid:{
                    width:'70%',
                    height:'40%',
                    left:'15%'
                },
                
            }
            setTimeout(() => {
                let t= this;
                let op = {
                    series:[{
                    name:'离线',    
                    type:'bar',
                    stack:'sum',
                    itemStyle:{
                        color:colorLinear2,
                        borderColor:borderColor2,
                        borderWidth:1,
                        borderType:'solid',
                        opacity:0.5
                    },
                    barWidth:35,
                    data:offlineData
                },{
                    name:'静止',
                    type:'bar',
                    stack:'sum',
                    itemStyle:{
                        color:colorLinear1,
                        borderColor:borderColor1,
                        borderWidth:1,
                        borderType:'solid',
                        opacity:0.5
                    },
                    barWidth:35,
                    data:staticData
                }]
                }
                t.barChart.setOption(op)
            }, 1000);
            this.init();
        },
    },
    created(){

    },
    mounted() {
        bdApi().then(res=>{
            console.log(res)
        })
        // getWeather().then(res=>{

        // })
        let t = this;
        this.$nextTick(()=>{
            t.barChart.resize()
        })
        // window.addEventListener('resize',()=>{
        //     t.barChart.resize()
        // })
        this.getData();
    },
}
</script>
<style lang="less">
    
</style>
<template>
    <div class="sc-gauge-chart">

    </div>
</template>
<script>
export default {
    name:'dashboard',
    data(){
        return{
            scgaugeOptions:{},
            scgaugeChart:null
        }
    },
    methods:{
        dashboardinit(){
            this.scgaugeChart = this.$echarts.init(document.querySelector('.sc-gauge-chart'));
            
            this.getData();
        },
        createLinear(c1,c2){
            return new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: c1
                    },
                    {
                        offset: 1,
                        color: c2
                    }
            ])
        },
        getData(){
            let lineColor = this.createLinear('rgba(54, 101, 232, 1)','rgba(58, 173, 242, 1)');
            this.scgaugeOptions = {
                title:{
                    text:'',
                    textStyle:{
                        color:'rgba(255,255,255,0.5)',
                        fontSize:12,
                        fontFamily:"PingFangSC-Medium,PingFang SC"
                    },
                },
                grid:{
                    top:'30%',
                },
                
                series:[{
                    center:['50%','40%'],
                    name:'车辆数量',
                    type:'gauge',
                    radius:'70%',
                    startAngle:215,
                    endAngle:-35,
                    data:[0],
                    min:0,
                    max:100,
                    splitNumber:10,
                    axisLine:{
                        lineStyle:{
                            width:10,
                            color:[[1,lineColor]]
                        }
                    },
                    splitLine:{
                        length:15,
                        lineStyle:{
                            color:'rgba(58, 255, 236, 1)',
                            width:1
                        }
                    },
                    axisTick:{
                        show:false
                    },
                    
                    axisLabel:{
                        distance:6,
                        color:'rgba(255, 255, 255, 1)',
                        fontSize:10,
                        formatter:function(value){
                            return Math.round(value)
                        },
                        rich:{
                            a:{
                                color:'rgba(255, 239, 126, 1)'
                            }
                        }
                    },
                    pointer:{
                        length:'75%',
                        width:4
                    },
                    itemStyle:{
                        color:lineColor
                    },
                    detail:{
                        offsetCenter:[0,80],
                        
                        color:'rgba(58, 255, 236, 1)',
                        fontSize:20,
                        height:30,
                        formatter:function(value){
                            if(80<value && value<100){value = '高风险'};
                            if(40<value && value<80){value = '中风险'};
                            if(0<value && value<40){value = '低风险'};
                            return `${value}\n{a|建议电呼甲方}`
                        },
                        rich:{
                            a:{
                                color:'rgba(255, 255, 255, 1)',
                                fontSize:14,
                                lineHeight:35
                            }
                        }
                    },
                    animation:true,
                    animationDuration:2000,
                    animationDurationUpdate:2000,
                }]
            }
            this.scgaugeChart.setOption(this.scgaugeOptions);
            setTimeout(() => {
                
                let t=this;
                let op ={
                    series:[{data:[92]}]
                }
                t.scgaugeChart.setOption(op)
            }, 1000);
        }
    },
    mounted(){
        let t = this;
        this.$nextTick(()=>{
            t.scgaugeChart.resize()
        })
        window.addEventListener('resize',()=>{
            t.scgaugeChart.resize()
        })
        this.dashboardinit();
    }
}
</script>
<style lang="less">
    
</style>
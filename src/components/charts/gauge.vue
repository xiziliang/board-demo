<template>
    <div class="gauge-chart">

    </div>
</template>
<script>
export default {
    name:'dashboard',
    data(){
        return{
            gaugeOptions:{},
            gaugeChart:null
        }
    },
    methods:{
        dashboardinit(){
            this.gaugeChart = this.$echarts.init(document.querySelector('.gauge-chart'));
            
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
            this.gaugeOptions = {
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
                    center:['50%','55%'],
                    name:'车辆数量',
                    type:'gauge',
                    radius:'110%',
                    startAngle:180,
                    endAngle:0,
                    data:[0],
                    min:20000,
                    max:30000,
                    splitNumber:5,
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
                    animationDuration:2000,
                    animationDurationUpdate:2000,
                    detail:{
                        offsetCenter:[0,30],
                        
                        color:'rgba(58, 255, 236, 1)',
                        fontSize:20,
                        height:30,
                        formatter:function(value){
                            return `${value}\n{a|车辆总数}`
                        },
                        rich:{
                            a:{
                                color:'rgba(255, 255, 255, 1)',
                                fontSize:14,
                                lineHeight:20
                            }
                        }
                    },
                }]
            }
            this.gaugeChart.setOption(this.gaugeOptions);
            setTimeout(() => {
                
                let t=this;
                let op ={
                    series:[{data:[24927]}]
                }
                t.gaugeChart.setOption(op)
            }, 1000);
        }
    },
    mounted(){
        let t = this;
        this.$nextTick(()=>{
            t.gaugeChart.resize()
        })
        window.addEventListener('resize',()=>{
            t.gaugeChart.resize()
        })
        this.dashboardinit();
    }
}
</script>
<style lang="less">
    
</style>
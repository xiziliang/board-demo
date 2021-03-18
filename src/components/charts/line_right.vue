<template>
    <div class="line-chart">

    </div>
</template>
<script>
export default {
    name:'line-chart',
    data(){
        return{
            lineOptions:{},
            lineChart:null,
            areaColor1:null,
            areaColor2:null,
            strokeColor1:null,
            strokeColor2:null,
            data1:[8711,8599,8900,8600,8600,8777,8921],
            data2:[5211,8599,8600,3600,7600,8077,8021],
        }
    },
    methods:{
        init(){
            this.lineChart = this.$echarts.init(document.querySelector('.line-chart'));
            this.getData()
        },
        createLinear(c1,c2){
            return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
            this.areaColor1 = this.createLinear('rgba(58, 157, 255, 0.37)','rgba(44, 76, 242, 0)')
            this.areaColor2 = this.createLinear('rgba(58, 255, 236, 0.2)','rgba(54, 153, 232, 0)')
            this.strokeColor1 = this.createLinear('rgba(44, 76, 242)','rgba(58, 157, 255)')
            this.strokeColor2 = this.createLinear('rgba(54, 153, 232)','rgba(58, 255, 236)')
            let fontColor = 'rgba(255,255,255,0.5)';
            this.lineOptions = {
                title:{
                    text:'',
                    textStyle:{
                        color:fontColor,
                        fontSize:12
                    },
                    top:0,
                    left:0
                },
                legend:{
                    show:false,
                    type:'plain',
                    data:['<20km','>300km'],
                    icon:'rect',
                    textStyle:{
                        color:fontColor,
                        fontSize:12
                    },
                    itemWidth:12,
                    itemHeight:8,
                    top:30,
                    right:0
                },  
                grid:{
                    height:'50%'
                },
                animationDuration:1000,
                xAxis:{
                    type:'category',
                    axisLine:{
                        lineStyle:{
                            color:'',
                            fontSize:10
                        }
                    },
                    axisTick:{
                        lineStyle:{
                            color:fontColor
                        },
                        alignWithLabel:true,
                        inside:true
                    },
                    axisLabel:{
                        color:fontColor,
                        fontSize:10
                    },
                    data:['1','2','3','4','5','6','7']
                },
                yAxis:{
                    type:'value',
                    name:'车辆数',
                    nameLocation:'end',
                    nameTextStyle:{
                        color:fontColor,
                        align:'right'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'',
                            fontSize:10
                        }
                    },
                    splitNumber:3,
                    axisTick:{
                        lineStyle:{
                            color:fontColor
                        }
                    },
                    axisLabel:{
                        color:fontColor,
                        fontSize:10
                    },
                    splitLine:{
                        show:false
                    }
                },
                series:[]
            }
            this.lineChart.setOption(this.lineOptions);
            let op = {
                series:[{
                    type:'line',
                    name:'<20km',
                    data:this.data1,
                    areaStyle:{
                        color:this.areaColor1
                    },
                    itemStyle:{
                        color:this.strokeColor1
                    },
                    lineStyle:{
                        color:this.strokeColor1,
                        width:1
                    },
                    showSymbol:false,
                    smooth:true
                }]
            }
            let t=this;
            setTimeout(()=>{
                t.lineChart.setOption(op);
            },1000)
        },
        changeData(seriesData){
            this.lineChart.setOption({series:[{
                type:'line',
                name:'<20km',
                data:seriesData,
                areaStyle:{
                    color:this.areaColor1
                },
                itemStyle:{
                    color:this.strokeColor1
                },
                lineStyle:{
                    color:this.strokeColor1,
                    width:1
                },
                showSymbol:false,
                smooth:true
            }]})
        }
    },
    computed:{
        typeChange(){
            return this.$store.state.riskType;
        }
    },
    watch:{
        typeChange(a,b){
            if(a == '黑区风险'){
                this.changeData(this.data2)
            }else{
                this.changeData(this.data1)
            }
        }
    },
    mounted(){
        let t = this;
        this.$nextTick(()=>{
            t.lineChart.resize()
        })
        this.init();
    }
}
</script>
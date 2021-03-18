<template>
    <div class="sc-line-chart">

    </div>
</template>
<script>
export default {
    name:'line-chart',
    data(){
        return{
            lineOptions:{},
            lineChart:null
        }
    },
    methods:{
        init(){
            this.lineChart = this.$echarts.init(document.querySelector('.sc-line-chart'));
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
            let data1 = [10,340,40,40,40,300,140,140,160,280,50,50];
            let data2 = [160,200,100,300,80,1000,100];
            let areaColor1 = this.createLinear('rgba(58, 157, 255, 0.37)','rgba(44, 76, 242, 0)')
            let areaColor2 = this.createLinear('rgba(58, 255, 236, 0.2)','rgba(54, 153, 232, 0)')
            let strokeColor1 = this.createLinear('rgba(44, 76, 242)','rgba(58, 157, 255)')
            let strokeColor2 = this.createLinear('rgba(54, 153, 232)','rgba(58, 255, 236)')
            let fontColor = 'rgba(255,255,255,1)';
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
                    // height:'50%',
                    // show:true
                },
                animationDuration:2000,
                xAxis:{
                    type:'category',
                    name:'周',
                    nameTextStyle:{
                        color:'rgba(58, 173, 242, 1)',
                        align:'right',
                        verticalAlign:'top',
                        // lineHeight:20
                    },
                    axisLine:{
                        lineStyle:{
                            color:'rgba(58, 173, 242, 0.2)',
                            fontSize:10
                        }
                    },
                    axisTick:{
                        show:false
                    },
                    axisLabel:{
                        color:fontColor,
                        fontSize:10
                    },
                    data:['1','2','3','4','5','6','7','8','9','10','11','12']
                },
                yAxis:{
                    type:'value',
                    name:'公里',
                    nameLocation:'end',
                    nameTextStyle:{
                        color:'rgba(58, 173, 242, 1)',
                        align:'right'
                    },
                    axisLine:{
                        show:false,
                        lineStyle:{
                            color:'',
                            fontSize:10
                        }
                    },
                    axisTick:{
                        show:false,
                        lineStyle:{
                            color:fontColor
                        }
                    },
                    axisLabel:{
                        color:fontColor,
                        fontSize:10
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'rgba(58, 173, 242, 0.2)',

                        }
                    }
                },
                series:[]
            }
            this.lineChart.setOption(this.lineOptions);
            let op = {
                series:[{
                    type:'line',
                    name:'<20km',
                    data:data1,
                    areaStyle:{
                        color:areaColor1
                    },
                    itemStyle:{
                        color:strokeColor1
                    },
                    lineStyle:{
                        color:strokeColor1,
                        width:1
                    },
                    showSymbol:false
                }]
            }
            let t=this;
            setTimeout(()=>{
                t.lineChart.setOption(op);
            },500)
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
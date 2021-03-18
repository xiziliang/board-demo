<template>
    <div class="radar-chart">

    </div>
</template>
<script>
export default {
    name:'radar-chart',
    data(){
        return {
            radarOptions:{},
            radarChart:null,
            seriesData:[[0,213,163,67,183],[4258,1462,126,64,122],[1511,436,50,17,39]],
            seriesData1 : [[1511,436,50,17,39],[0,213,163,67,183],[4258,1462,126,64,122]],
            legendData : ['低风险','中风险','高风险'],
            areaColor1:null,
            areaColor2:null,
            areaColor3:null,
            lineColor:null
        }
    },
    methods:{
        init(){
            this.radarChart = this.$echarts.init(document.querySelector('.radar-chart'));
            this.radarChart.setOption(this.radarOptions)
        },
        createLinear(c1,c2){
            return new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
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
            this.areaColor1= this.createLinear('rgba(44, 76, 242, 0.06)','rgba(58, 157, 255, 0.45)');
            this.areaColor2 = this.createLinear('rgba(151, 255, 249, 0.07)','rgba(94, 255, 239, 0.3)');
            this.areaColor3 = this.createLinear('rgba(255, 244, 101, 0.17)','rgba(219, 255, 115, 0)');
            this.lineColor = this.createLinear('rgba(54, 153, 232, 1)','rgba(58, 255, 236, 1)');
            let indicatorData = [{
                name:'1',
                max:5000
            },{
                name:'2~5',
                max:1500
            },{
                name:'6~10',
                max:200
            },{
                name:'11-15',
                max:100
            },{
                name:'>50',
                max:200
            }];

            this.radarOptions = {
                
                title:{
                    text:'风险车辆',
                    textStyle:{
                        color:'rgba(255,255,255,0.5)',
                        fontSize:14,
                        fontWeight:500,
                        fontFamily:"PingFangSC-Medium,PingFang SC"
                    }
                },
                radar:{
                    center:['50%','55%'],
                    radius:'70%',
                    name:{
                        color:'#fff'
                    },
                    splitNumber:3,
                    splitLine:{
                        lineStyle:{
                            color:this.lineColor,
                            opacity:0.36
                        }
                    },
                    splitArea:{
                        areaStyle:{
                            color:''
                        }
                    },
                    indicator:indicatorData
                },
                legend:{
                    right:0,
                    bottom:0,
                    orient: 'vertical',
                    icon:'circle',
                    itemWidth:5,
                    itemHeight:5,
                    textStyle:{
                        color:'#fff',
                        fontSize:10
                    },
                    data:this.legendData
                },
                series:[{
                    type:'radar',
                    lineStyle:{
                        width:1,
                    },
                    symbol:'circle',
                    symbolSize:3,
                    data:[{
                        name:this.legendData[2],
                        value:this.seriesData[2],
                        lineStyle:{
                            color:'rgba(25, 103, 217, 1)',
                            opacity:.8
                        },
                        itemStyle:{
                            color:'rgba(25, 103, 217, 1)',
                            borderColor:'rgba(25, 103, 217, 1)'
                        },
                        areaStyle:{
                            color:this.areaColor1,
                        }
                    },{
                        name:this.legendData[1],
                        value:this.seriesData[1],
                        lineStyle:{
                            color:'rgba(36, 198, 136, 1)',
                        },
                        itemStyle:{
                            color:'rgba(36, 198, 136, 1)',
                            borderColor:'rgba(36, 198, 136, 1)'
                        },
                        areaStyle:{
                            color:this.areaColor2,
                        }
                    },{
                        name:this.legendData[0],
                        value:this.seriesData[0],
                        lineStyle:{
                            color:'rgba(255, 244, 101, 1)',
                        },
                        itemStyle:{
                            color:'rgba(255, 244, 101, 1)',
                            borderColor:'rgba(255, 244, 101, 1)'
                        },
                        areaStyle:{
                            color:this.areaColor3
                        }
                    },]
                }],
                // backgroundColor: {
                //     type: 'radial',
                //     x: 0.5,
                //     y: 0.5,
                //     r: 0.7,
                //     colorStops: [{
                //         offset: 0,
                //         color: ' rgba(54,153,232,1)' // 0% 处的颜色
                //     },{
                //         offset: 1,
                //         color: 'rgba(58,255,236,1)' // 100% 处的颜色
                //     }],
                //     globalCoord: false // 缺省为 false
                // }
            }
            this.init();
        },
        changeData(seriesData){
            this.radarChart.setOption({series:[{
                data:[{
                    name:this.legendData[0],
                    value:seriesData[2],
                    ineStyle:{
                        color:'rgba(25, 103, 217, 1)',
                        opacity:.8
                    },
                    itemStyle:{
                        color:'rgba(25, 103, 217, 1)',
                        borderColor:'rgba(25, 103, 217, 1)'
                    },
                    areaStyle:{
                        color:this.areaColor1,
                    }
                },{
                    name:this.legendData[1],
                    value:seriesData[1],
                    lineStyle:{
                        color:'rgba(36, 198, 136, 1)',
                    },
                    itemStyle:{
                        color:'rgba(36, 198, 136, 1)',
                        borderColor:'rgba(36, 198, 136, 1)'
                    },
                    areaStyle:{
                        color:this.areaColor2,
                    }
                },{
                    name:this.legendData[2],
                    value:seriesData[0],
                    lineStyle:{
                        color:'rgba(255, 244, 101, 1)',
                    },
                    itemStyle:{
                        color:'rgba(255, 244, 101, 1)',
                        borderColor:'rgba(255, 244, 101, 1)'
                    },
                    areaStyle:{
                        color:this.areaColor3
                    }
                },]
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
                this.changeData(this.seriesData1)
            }else{
                this.changeData(this.seriesData)
            }
        }
    },
    mounted(){
        let t = this;
        this.$nextTick(()=>{
            t.radarChart.resize();
        })
        this.getData();
    }
}
</script>
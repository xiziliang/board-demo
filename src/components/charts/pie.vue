<template>
    <div class="pie-chart">

    </div>
</template>
<script>
export default {
    name:'pie-chart',
    data(){
        return{
            pieOptions:{},
            pieChart:null,
            data1 : [{value:124,name:'未预警数量'},{value:44,name:'预警数量'},{value:69,name:'解除预警数量'}],
            data2 : [{value:104,name:'未预警数量'},{value:89,name:'预警数量'},{value:40,name:'解除预警数量'}]
        }
    },
    methods:{
        init(){
            this.pieChart = this.$echarts.init(document.querySelector('.pie-chart'));
            this.pieChart.setOption(this.pieOptions);
        },
        getData(){
            let linearColor = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#3665E8'
                    },
                    {
                        offset: 1,
                        color: '#3AADF2'
                    }
            ])
            this.pieOptions = {
                title:{
                    text:'数量对比',
                    textStyle:{
                        color:'rgba(255,255,255,0.6)',
                        fontSize:14,
                        fontFamily:"PingFangSC-Regular,PingFang SC",
                        top:0,
                        left:0
                    }
                },
                series:[{
                    type:'pie',
                    name:'数量对比',
                    color:['#3AFFEC','#5D52F7','#3AADF2'],
                    center:['50%','50%'],
                    radius:['30%','40%'],
                    data:this.data1,
                    itemStyle:{
                        // borderColor:'#fff'
                    },
                    label:{
                        fontSize:14,
                        align:'left',
                        width:50,
                        formatter:'{a|{b}}\n{d}%',
                        rich:{
                            a:{
                                color:'#fff',
                                fontSize:12,
                                height:25
                            },
                        },
                    },
                    labelLine:{
                        show:true,
                        length:10,
                        length2:20,
                        lineStyle:{
                            color:'#FFFFFF',
                            width:1
                        }
                    }
                }]
            }
            this.init();
        },
        changeData(seriesData){
            this.pieChart.setOption({series:[{
                type:'pie',
                name:'数量对比',
                color:['#3AFFEC','#5D52F7','#3AADF2'],
                center:['50%','50%'],
                radius:['30%','40%'],
                data:seriesData,
                itemStyle:{
                    // borderColor:'#fff'
                },
                label:{
                    fontSize:14,
                    align:'left',
                    width:50,
                    formatter:'{a|{b}}\n{d}%',
                    rich:{
                        a:{
                            color:'#fff',
                            fontSize:12,
                            height:25
                        },
                    },
                },
                labelLine:{
                    show:true,
                    length:10,
                    length2:20,
                    lineStyle:{
                        color:'#FFFFFF',
                        width:1
                    }
                }
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
            t.pieChart.resize();
        })
        this.getData();
    }
}
</script>
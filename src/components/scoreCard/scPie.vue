<template>
    <div class="sc-pie-chart">

    </div>
</template>
<script>
export default {
    name:'pie-chart',
    data(){
        return{
            pieOptions:{},
            pieChart:null
        }
    },
    methods:{
        init(){
            this.pieChart = this.$echarts.init(document.querySelector('.sc-pie-chart'));
            this.pieChart.setOption(this.pieOptions);
        },
        createColor(c1,c2){
            return new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [{
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
            let data1 = [
                {value:10, name:'地址匹配'},
                {value:5, name:'状态'},
                {value:15, name:'拆除'},
                {value:25, name:'聚集'},
                {value:20, name:'跨区'},
                {value:30, name:'跨机构'},
            ]
            let linearColor = this.createColor('#3665E8','#3AADF2');
            let areaColor1 = this.createColor('rgba(58, 255, 236, 1)','rgba(54, 153, 232, 1)');
            let areaColor2 = this.createColor('rgba(58, 157, 255, 1)','rgba(44, 76, 242, 1)');
            this.pieOptions = {
                series:[{
                    type:'pie',
                    name:'数量对比',
                    color:[areaColor1,areaColor2],
                    center:['50%','50%'],
                    radius:['0%','70%'],
                    data:data1,
                    roseType:'area',
                    itemStyle:{
                        // borderColor:'#fff'
                    },
                    label:{
                        fontSize:14,
                        align:'left',
                        width:50,
                        // formatter:'{a|{b}}\n{d}%',
                        formatter:'{a|{b}}',
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
                        length:15,
                        length2:0,
                        lineStyle:{
                            color:'rgba(58, 173, 242, 1)',
                            width:1
                        }
                    }
                }]
            }
            this.init();
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
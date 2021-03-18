<template>
    <div class="score-card">
        <div class="score-head">
            <i class="close" @click="close()"></i>
        </div>
        <div class="score-content">
            <div class="left-content">
                <div class="l-item" style="height:60%;">
                    <div class="s-title">
                        <div class="s-t-item1"></div>
                        <div class="s-t-item2"></div>
                        <div class="s-t-item3">风险评估</div>
                    </div>
                    <div class="s-chart">
                        <gauge-chart></gauge-chart>
                    </div>
                </div>
                <div class="l-item" style="height:40%;">
                    <div class="s-title">
                        <div class="s-t-item1"></div>
                        <div class="s-t-item2"></div>
                        <div class="s-t-item3">预警分析</div>
                    </div>
                    <div class="s-chart">
                        <pie-chart></pie-chart>
                    </div>
                </div>
            </div>
            <div class="right-content">
                <div class="r-item" style="height:60%;">
                    <div class="s-title">
                        <div class="s-t-item1"></div>
                        <div class="s-t-item2"></div>
                        <div class="s-t-item3">基本信息</div>
                    </div>
                    <div class="s-r-item s-r-top-info">
                        <ul>
                            <li style="background-color:rgba(58, 147, 255, 0.1);"><p class="s-r-item-p1">车主姓名</p><p class="s-r-item-p2">张三</p></li>
                            <li><p class="s-r-item-p1">证件号</p><p class="s-r-item-p2">728395023812738219</p></li>
                            <li style="background-color:rgba(58, 147, 255, 0.1);"><p class="s-r-item-p1">门店名称</p><p class="s-r-item-p2">好车酷酷二手车经纪（天津）有限公司</p></li>
                            <li><p class="s-r-item-p1">客户名称</p><p class="s-r-item-p2">上海易鑫融资租赁有限公司</p></li>
                            <li style="background-color:rgba(58, 147, 255, 0.1);"><p class="s-r-item-p1">申请编号</p><p class="s-r-item-p2">2290195</p></li>
                            <li><p class="s-r-item-p1">车架号</p><p class="s-r-item-p2">LSVCH6A49DN211570</p></li>
                            <li style="background-color:rgba(58, 147, 255, 0.1);"><p class="s-r-item-p1">录入日期</p><p class="s-r-item-p2">2019-03-03 15:34:29</p></li>
                            <li style=""><p class="s-r-item-p1">设备状态</p><p class="s-r-item-p2" style="text-align: left;">有线设备 863013181524147 离线182天23小时36分23秒 定位河北省保定市清苑区s331.离保衡田屯路与建设南路交叉口东北150米佳家旅馆约47米</p></li>
                        </ul>
                    </div>
                </div>
                <div class="r-item" style="height:40%;">
                    <div class="s-title">
                        <div class="s-t-item1"></div>
                        <div class="s-t-item2"></div>
                        <div class="s-t-item3">用车行为分析</div>
                    </div>
                    <div class="s-r-bottom-info">
                        <p style="margin-bottom:3px;">用车活跃度<span>高风险</span></p>
                        <p>用车稳定性<span>中风险</span></p>
                    </div>
                    <div class="s-r-item">
                        <line-chart></line-chart>
                    </div>
                </div>
            </div>
        </div>
        <div class="score-trangle s-item1"></div>
        <div class="score-trangle s-item2"></div>
        <div class="score-trangle s-item3"></div>
        <div class="score-trangle s-item4"></div>
    </div>
</template>
<script>
import pie from '../scoreCard/scPie';
import gauge from '../scoreCard/scGauge';
import line from '../scoreCard/scLine';
export default {
    name:'scoreCard',
    data(){
        return{

        }
    },
    methods:{
        close(){
            this.$store.commit('SET_scoreCard_status',0);
        }
    },
    components:{
        'gauge-chart':gauge,
        'pie-chart':pie,
        'line-chart':line
    },
    mounted(){

    }
}
</script>
<style lang="less" scope>
@import "../../assets/less/sorceCard.less";
</style>
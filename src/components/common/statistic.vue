<template>
    <div class="statistics">
        <div class="name" @click="changeType()">
            <span>{{currentType}}</span><i :style="{transform: `rotate(${iAngle}deg)`}"></i>
        </div>
        <div class="business-total">
            <p class="title">当前业务总量</p>
            <DigitRoll :rollDigits="showNums.totalNums"></DigitRoll>
        </div>
        <div class="other-total">
            <div class="today-total">
                <p>当日</p>
                <DigitRoll :rollDigits="showNums.todayNums"></DigitRoll>
            </div>
            <div class="month-total">
                <p>本月</p>
                <DigitRoll :rollDigits="showNums.monthNums"></DigitRoll>
            </div>
        </div>
    </div>
</template>
<script>
import DigitRoll from '@huoyu/vue-digitroll';
export default {
    name:'statistic',
    data(){
        return{
            currentType:'设备数',
            iAngle:0,
            carsNums:{
                totalNums:3718027,
                todayNums:4430,
                monthNums:62480,
            },
            equipmentNums:{
                totalNums:5339106,
                todayNums:7586,
                monthNums:108939,
            },
            showNums:{
                totalNums:5339106,
                todayNums:7586,
                monthNums:108939,
            },
            riseNums:5
        }
    },
    methods:{
        changeType(){
            this.currentType = this.currentType == '设备数' ? '车辆数' : '设备数';
            this.iAngle = this.iAngle == 0 ? 180 : 0;
            if(this.currentType == '设备数'){
                this.showNums.totalNums = this.equipmentNums.totalNums;
                this.showNums.todayNums = this.equipmentNums.todayNums;
                this.showNums.monthNums = this.equipmentNums.monthNums;
            }
            if(this.currentType == '车辆数'){
                this.showNums.totalNums = this.carsNums.totalNums;
                this.showNums.todayNums = this.carsNums.todayNums;
                this.showNums.monthNums = this.carsNums.monthNums;
            }
        }
    },
    mounted(){
        let t = this;
        setInterval(() => {
            t.riseNums = Math.round(Math.random(10));
            t.showNums.totalNums+= t.riseNums;
            t.showNums.monthNums+= t.riseNums;
            t.showNums.todayNums += t.riseNums;
        },1000);
    },
    components:{
        DigitRoll
    }
}
</script>
<style lang="less">
.statistics{
    width: 400px;
    height: 200px;
    position: absolute;
    bottom: 6%;
    left: 6%;
    text-align: center;
    .name{
        font-size:20px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(58,255,236,1);
        text-align: left;
        margin-bottom: 14px;
        cursor: pointer;
        i{
            transition: all .5s;
            display: inline-block;
            margin-left: 10px;
            cursor: pointer;
            width: 14px;
            height: 11px;
            background: url('../../assets/image/triangle.png') center no-repeat;
        }
    }
    .other-total{
        display: flex;
        .today-total{
            margin-right: 50px;
        }
    }
    .business-total{
        margin-bottom: 8px;
        .title{
            font-size:14px;
            font-family:PingFangSC-Semibold,PingFang SC;
            color:rgba(255,255,255,1);
            line-height:20px;
            text-align: left;
        }
        .d-roll-wrapper{
            margin: 0;
            li{
                .d-roll-bar{
                    div{
                        font-family:Impact;
                        font-size: 30px;
                        color:rgba(255,255,255,1);
                        line-height:36px;
                    }
                }
                background: url('../../assets/image/numbers_bg.png') center no-repeat;
                margin-right: 1px;
                text-align: center;
                flex-grow:0;
                width:33px;
                height:42px;
            }
        }
    }
    .today-total,.month-total{
        p{
            text-align: left;
            font-size:14px;
            font-family:PingFangSC-Semibold,PingFang SC;
            // font-weight:600;
            color:rgba(255,255,255,1);
            line-height:20px;
            margin-bottom: 8px;
        }
        .d-roll-wrapper{
            margin: 0;
        }
        li{
            width:30px;
            height:40px !important;
            background:rgba(58,255,236,0.08);
            border:1px solid rgba(58,255,236,1);
            border-right: none;
            flex-grow:0;
            div{
                text-align: center;
                font-size:32px;
                font-family:Impact;
                color:rgba(58,255,236,1);
                line-height:39px;
            }
        }
        li:last-child{
            border-right:1px solid rgba(58,255,236,1)
        }
    }
}
</style>
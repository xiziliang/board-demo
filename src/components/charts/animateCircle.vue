<template>
    <div class="animate-circle">
        <div class="circle-item">
            <iCircle :percent="precent" :size="circleSize" :stroke-color="['#3665E8','#3AADF2']">
                <span style="font-size:16px;color:#3AFFEC;display:block;margin-bottom:5px;font-family:Impact;">{{ animatedNumber }}</span>
                <span style="font-size:10px;color:#ffffff;display:block;width:60px;margin:0 auto;line-height:15px">{{ type }}</span>
            </iCircle>
        </div>
    </div>
</template>
<script>
import { TweenLite } from 'gsap'
export default {
    name:'',
    props:{
        circles:Object
    },
    data(){
        return{
            tweenedNumber:0,
            nums:0,
            type:'',
            into:0,
            base:40000,
            circleSize:70
        }
    },
    methods:{
        
    },
    computed:{
        animatedNumber(){
            return this.tweenedNumber.toFixed(0);
        },
        precent(){
            return parseInt(((this.tweenedNumber/this.base)*100).toFixed(0));
        }
    },
    watch:{

    },
    mounted(){
        let t = this;
        let num = this.circles.nums;
        let len = num.toString().length;
        this.type = this.circles.type;
        // this.base = this.circles.base;
        switch( len ){
            case 3:
                this.into = 10;
                break;
            case 4:
                this.into = 100;
                break;
            case 5:
                this.into = 1000;
                break;
            case 6:
                this.into = 10000;
                break;
        }
        setTimeout(()=>{
            TweenLite.to(t.$data, 3, {tweenedNumber : num })
        },500)
        if(document.body.offsetHeight<880){
            this.circleSize = 60;
        }
        
    }
}
</script>
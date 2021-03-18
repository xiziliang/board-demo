<template>
    <div class="car">
        <div class="car-content">
            
        </div>
    </div>
</template>
<script>
import car from '../../assets/js/myThree';
export default {
    name:'car',
    data(){
        return{
            three:null
        }
    },
    methods:{
        init(){
            this.three = new car('car','car_bg.png',[0,-310,100]);
            this.three.init();
        }
    },
    mounted(){
        let t = this;
        setTimeout(()=>{
            t.init();
        },100)
    }
}
</script>

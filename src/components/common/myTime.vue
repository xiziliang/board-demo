<template>
    <span>{{nowTime}}</span>
</template>
<script>
export default {
    name:'myTime',
    data(){
        return{
            nowTime:'00:00:00'
        }
    },
    methods:{
        getTime(){
            let time = new Date();
            let hour = time.getHours();
            let min = time.getMinutes();
            let seconds = time.getSeconds();
            hour = hour<10?'0'+hour:hour;
            min = min<10?'0'+min:min;
            seconds = seconds<10?'0'+seconds:seconds;
            this.nowTime = `${hour}:${min}:${seconds}`
        }
    },
    created(){
        let t =this;
        setInterval(() => {
            t.getTime();
        }, 1000);
    }
}
</script>
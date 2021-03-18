<template>
    <div class="word-cloud">
        <div class="word-cloud-title">地址分类</div>
        <svg class="svg-bg" ref="wordCloudBox" width="100%" height="100%">
                <g class="svg-go" v-for="(item,index) in word" :key="index" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" :style="{animation: `go 2s  ease-in-out ${0.1*index}s infinite`}">
                    <g id="" :fill="item.color" :transform="`translate(${item.x},${item.y}) scale(${item.scale})`">
                        <g id="">
                            <polygon :stroke="item.color" stroke-width="0.5" fill-opacity="0.216881793" points="34 1 63.4448637 18 63.4448637 52 34 69 4.55513627 52 4.55513627 18">
                            </polygon>
                            <foreignObject :x="item.font.x" :y="item.font.y" :width="item.font.width" :height="item.font.height">
                                <p :style="{color:item.color,fontSize:`${item.fz}px`}">{{item.type}}</p>
                            </foreignObject>
                            <circle cx="34.5454545" cy="1.54545455" r="1.54545455"></circle>
                            <circle  cx="34.5454545" cy="69.5454545" r="1.54545455"></circle>
                            <circle cx="63.5454545" cy="18.5454545" r="1.54545455"></circle>
                            <circle  cx="63.5454545" cy="52.5454545" r="1.54545455"></circle>
                            <circle  cx="4.54545455" cy="52.5454545" r="1.54545455"></circle>
                            <circle  cx="4.54545455" cy="18.5454545" r="1.54545455"></circle>
                        </g>
                    </g>
                </g>
        </svg>
    </div>
</template>
<script>
import myCloud from '../../assets/js/myCloud';
import car from '../../assets/js/myThree';
export default {
    name:'word-cloud',
    data(){
        return {
            word:[{
                x:130,
                y:40,
                fz:12,
                size:'70px',
                font:{
                    x:-6,
                    y:26,
                    width:80,
                    height:20
                },
                scale:1.1,
                color:'#3AFFEC',
                type:'非常停地',
            },{
                x:70,
                y:50,
                fz:16,
                size:'40px',
                font:{
                    x:-4,
                    y:25,
                    width:80,
                    height:20
                },
                scale:0.9,
                color:'#3AFFEC',
                type:'常停地',
            },{
                x:210,
                y:85,
                fz:14,
                size:'40px',
                font:{
                    x:-4,
                    y:25,
                    width:80,
                    height:20
                },
                scale:0.7,
                color:'#3155FF',
                type:'疑安装地',
            },{
                x:180,
                y:0,
                fz:16,
                size:'40px',
                font:{
                    x:14,
                    y:14,
                    width:40,
                    height:44
                },
                scale:0.7,
                color:'#3155FF',
                type:'重复地址离线',
            },{
                x:105,
                y:10,
                fz:16,
                size:'40px',
                font:{
                    x:-6,
                    y:24,
                    width:80,
                    height:20
                },
                scale:0.6,
                color:'#3AFFEC',
                type:'汽车服务',
            },{
                x:135,
                y:115,
                fz:16,
                size:'40px',
                font:{
                    x:-6,
                    y:24,
                    width:80,
                    height:20
                },
                scale:0.6,
                color:'#3AFFEC',
                type:'汽车销售',
            },{
                x:205,
                y:45,
                fz:16,
                size:'40px',
                font:{
                    x:-6,
                    y:24,
                    width:80,
                    height:20
                },
                scale:0.6,
                color:'#3AFFEC',
                type:'黑区',
            }]
        }
    },
    methods:{
        initWordCloud(wordList){
            let wordOption = {  
                wordList, 
                size:[300,250],  // 盒子的宽高
                svgElement: this.$refs.wordCloudBox  //使用ref选择节点
            }
            myCloud(wordOption,this.getArticleList)
        },
        getArticleList(){
            console.log('aaa')
        },
        init(){
            let bg = new car('word-cloud','wordcloud_bg.png',[0,-400,150]);
            bg.init();
        }
    },
    mounted() {
        setTimeout(()=>{
            this.init();
        },100)
        let wordList = [
            {text:'vue',size:20},
            {text:'html',size:25},
            {text:'JavaScript',size:30},
            {text:'java',size:30},
            {text:'C#',size:30},
            // {text:'Python',size:30},
            // {text:'CSS',size:30},
            // {text:'Go',size:30},
            // {text:'React',size:30},
        ]
        if(document.body.offsetWidth<1700){
            this.word.forEach(element=>{
                element.x = element.x-20;
            })
        }
        // this.initWordCloud(wordList)
    },
}
</script>
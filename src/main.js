import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

import { Layout,Sider,Footer,Content,Header,Progress,Circle,Icon } from 'view-design';
import 'view-design/dist/styles/iview.css'

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/radar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/tooltip';



// let echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/map');
// require('echarts/lib/chart/bar');
// require('echarts/lib/chart/pie');
// require('echarts/lib/chart/line');
// require('echarts/lib/chart/gauge');
// require('echarts/lib/chart/radar');
// require('echarts/lib/chart/scatter');
// require('echarts/lib/chart/effectScatter');
// require('echarts/lib/chart/heatmap');
// require('echarts/lib/component/geo');
// require('echarts/lib/component/legend');
// require('echarts/lib/component/radar');
// require('echarts/lib/component/title');
// require('echarts/lib/component/visualMap');
// require('echarts/lib/component/tooltip');

Vue.component('Layout',Layout)
Vue.component('Sider',Sider)
Vue.component('Content',Content)
Vue.component('Footer',Footer)
Vue.component('Header',Header)
Vue.component('Progress',Progress)
Vue.component('iCircle',Circle)
Vue.component('Icon',Icon)

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

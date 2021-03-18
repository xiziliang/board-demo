import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      scoreCardStatus:0,
      riskType:'跨区风险',
  },
  mutations: {
      //控制评分卡显示
      SET_scoreCard_status(state,status){
        state.scoreCardStatus = status;
      }
  },
  actions: {
  },
  modules: {
  }
})

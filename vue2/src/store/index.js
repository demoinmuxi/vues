import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter:0
  },
  mutations: {
    add(state){
      state.counter++
    }
    //通过commit触发
  },
  actions: {
    add(a){
      console.log(a,'a');
      const {commit}=a;
      commit('add');
    },
    //异步的通过dispatch触发
    asyncadd(a){
      const {commit}=a;
      setTimeout(() => {
      console.log(a,'a');
      commit('add');
      }, 2000);
    }
  },
  modules: {
  }
})

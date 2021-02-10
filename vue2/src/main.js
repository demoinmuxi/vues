import Vue from 'vue'
import App from './App.vue'
import renderHeader from './components/RenderVue'
import functionalVue from './components/functionalVue'
import myPlugin from './components/pluginVue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
Vue.directive('focus',{
  inserted(el){
    el.focus();
  }
});
Vue.directive('colorblue',{
  inserted(el,binding){
    el.style.color="blue";
    console.log(binding);
  }
});
Vue.prototype.$bus=new Vue();
Vue.filter('jiaqian',function(value) {
    return '￥'+value;
});
// 全局过滤器
Vue.use(myPlugin,{hi:'hi i am a plugin'});
Vue.component('renderHeader',renderHeader);
Vue.component('functionalVue',functionalVue);
Vue.addedplugin();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

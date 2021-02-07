import { createApp } from 'vue'
import App from './App.vue'
import TongXin from './components/TongXin.vue'
import Bus from './components/Bus.vue'
createApp(App)
.component("TongXin",TongXin)
.component("Bus",Bus)
.mount('#app')

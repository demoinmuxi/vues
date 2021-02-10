import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterVue from '../components/RouterVue.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/route/:name',
    //name 为动态id 可以在组件RouterVue中通过this.$route.params.name获得
    //路径 /route/ee?name=100&jj=1 可以匹配到该路由，query参数可以通过 this.$route.query(.name,.jj)获取
    name:'route',
    component:RouterVue,
    // children:[
    //   {
        
    //   }
    // ],
  },
  {
    path: '/about/:id',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

<template>
  <div>
    <div>{{ $route.params.name }}</div>
    <button @click="to">routerTo</button>
  </div>
</template>

<script>
export default {
  watch: {
    //一般监听器
    // prop(newValue, oldValue) {
    //     do
    // }
    $route: {
      immediate: true,
      //是否初始化时触发
      handler(newone, oldone) {
        console.log("$route changed old", oldone, "new", newone);
      },
    },
  },
  mounted() {
    console.log(this.$route, this.$router);
  },
  methods: {
    to() {
      this.$router.push("/route/" + Math.random());
      //编程式导航
      //字符串如上
      //对象 可选参数格式与this.$route相同
      //this.$router.push({
      //       path:'',或者命名路由  (name:'')
      //       params:{},
      //       query:{},
      //   })
      //通过VueRouter的内置方法实现路由跳转功能
    },
  },
};
</script>

<style>
</style>
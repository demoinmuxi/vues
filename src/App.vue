<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <p v-for="i in texts" :key="i">{{ i }}</p>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
function getTexts() {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(["t1", "t2", "t3"]);
    }, 2000);
  });
}
export default {
  name: "App",
  data() {
    return {
      texts: [],
    };
  },
  async created() {
    //组件示例已创建未挂载dom不存在
    this.texts = await getTexts();
  },
  mounted() {
    // 已挂载dom存在
  },
  components: {
    HelloWorld,
  },
  watch: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

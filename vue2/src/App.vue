<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Ani v-if="show"></Ani>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Ani from "./components/Animate01.vue";
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    hide() {
      this.show = false;
      console.log(this.show,'111');
    },
  },
  created() {
    //父组件先于子组件
    this.$bus.$on("off", this.hide);
    this.$on("h", () => {
      console.log("$bus");
    });
  },
  mounted() {
    //子组件先于父组件
    this.$bus.$emit("hs", "hi");
    ((a) => {
      console.log(a, "8");
      this.$emit("h");
    })(9999);
  },
  name: "App",
  components: {
    HelloWorld,
    Ani,
  },
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

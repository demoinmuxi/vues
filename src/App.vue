<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <TongXin @addtolist="addtolist"></TongXin>
  <hr />
  <d-tong-xin-pro ref="o" @addtolistpro="addpro" v-model:value="text">
    <template v-slot:a='zyy'>
      <div>
        {{zyy.cc}}
      </div>
      <div>
        {{cc}}
      </div>
    </template>
  </d-tong-xin-pro>
  <p v-for="(i, index) in texts" :key="index">{{ i }}</p>
</template>

<script>
//@input="getText" 可以用如下方法替代
// 事件触发和监听在同一个组件上
//v-model:value="text" 子组件触发事件（固定名称格式）
// 'update:value' 会把触发事件时传入的参数赋值给value属性
import HelloWorld from "./components/HelloWorld.vue";
import DTongXinPro from "./components/TongXinPro.vue";
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
      text: "",
      cc:'父组件',
    };
  },
  methods: {
    addtolist(prams) {
      console.log(prams);
      this.texts.push(prams);
    },
    addpro() {
      this.texts.push(this.text);
      this.text = "";
    },
    getText(e) {
      console.log(e);
      this.text = e;
    },
  },
  async created() {
    //组件示例已创建未挂载dom不存在
    this.texts = await getTexts();
  },
  mounted() {
    // 已挂载dom存在
    console.log(this.$refs,this.$refs['o']);
  },

  // beforeCreate(){} // 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务
  // created(){} // 组件初始化完毕，各种数据可以使用，常用于异步数据获取
  // beforeMounted(){} // 未执行渲染、更新，dom未创建
  // mounted(){} // 初始化结束，dom已创建，可用于获取访问数据和dom元素
  // beforeUpdate(){} // 更新前，可用于获取更新前各种状态
  // updated(){} // 更新后，所有状态已是最新
  // beforeDestroy(){} // 销毁前，可用于一些定时器或订阅的取消
  // destroyed(){} // 组件已销毁，作用同上

  components: {
    HelloWorld,
    DTongXinPro,
    // DTongXinPro,
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

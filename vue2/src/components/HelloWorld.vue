<template>
  <div>
    <renderHeader  level=1 :class="$style.red" title="hi">{{'小标题'}}</renderHeader>
    <functionalVue class="deepselect" level=1 title="ha">{{'无状态组件'}}</functionalVue>
    <transition-group name="fade">
      <div v-for="(r, i) in store" :key="i" v-colorblue:[k].kk="'this is in binding'">{{ r }}</div>
    </transition-group>
    <button @click="add">add</button>
    <transition name="fade">
      <div class="hello" v-if="hide" @click="tohide">
        <h1>{{ msg }}</h1>
      </div>
    </transition>
  </div>
</template>

<script>
import m from './mixinVue.js'
export default {
  mixins:[m],
  mounted() {
    this.$added();
    this.$bus.$on("hs", (a) => {
      console.log(a);
    });
    console.log(this.$style.red);
  },
  data() {
    return {
      hide: "1",
      store: ["hh", "hi"],
      k:'动态参数,不加计算属性[]表示字符串',
      //有动态参数:[k]有形如.stop的后缀 有固定参数="1"
    };
  },
  methods: {
   
    tohide() {
      this.hide = !this.hide;
      setTimeout(() => {
        this.hide = true;
      }, 3000);
    },
    add() {
      this.store.push("yyyy");
      //列表动画
    },
  },
  filters:{
    jiaq(value,m="￥"){
      return m+value;
    }
  },
  // 已弃用 r | jiaqian|jiaq("$$")
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* v-enter v-enter-active v-enter-to v-leave v-leave-active v-leave-to */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.deepselect >>> h4{
  color: rgb(98, 243, 135);
  background:red;
  /* 深度选择器可以影响子组件，在sass scss中 不能用>>>可以用 ::deep
   或者 /deep/  */
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.hide {
  /* display: none; */
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<style module>
  .red{
    color:red;
  }
</style>
<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    
  >
    <div class="box" @click="hide"><span>1</span><span>2</span><span>3</span></div>
  </transition>
</template>
<script>
// <transition
// v-on:before-enter="beforeEnter" // 动画开始前，设置初始状态
// v-on:enter="enter" // 执行动画
// v-on:after-enter="afterEnter" // 动画结束，清理工作
// v-on:enter-cancelled="enterCancelled" // 取消动画
// v-on:before-leave="beforeLeave"
// v-on:leave="leave"
// v-on:after-leave="afterLeave"
// v-on:leave-cancelled="leaveCancelled"
// ></transition>
import  Velocity from 'velocity-animate'
export default {
    methods: {
        beforeEnter(el){
            //el就是当前实例对象
            console.log(el);
            el.style.opacity=0;
        },
        enter(el,done){
            Velocity(el,{opacity:1},{duration:1500,complete:done});
            console.log(done);
        },
        afterEnter(){},
        beforeLeave(el){
            el.style.opacity=1;
        },
        leave(el,done){
            Velocity(el,{opacity:0},{duration:1500,complete:done});
        },
        hide(){
            this.$bus.$emit('off');
        },
    },
};
</script>

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: aqua;
}
</style>
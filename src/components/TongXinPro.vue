<template>
  <!-- 低内聚版本 -->
  <input type="text" name="" @input="change" id="" :value="text">
  <slot name="a" :cc="cc"></slot>
  <slot name="b"></slot>
  <button @click="add">Add</button>
</template>

<script>
export default {
    props:['value'],
    data() {
        return {
            text:this.value,
            cc:'作用域插槽子组件props',
            //具名作用域插槽通过属性传值
        }
    },
    methods: {
        change(e){
            this.text=e.target.value;
            this.$emit("update:value",e.target.value);
            this.$emit("input",e.target.value);
        },
        add(){
            this.$emit("addtolistpro");
            this.text='';
        }
    },
}
</script>

<style>

</style>
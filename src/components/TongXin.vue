<template>
  <input type="text" name="" id="" v-model="text">
    <button @click="AddToList">AddToList</button>
</template>

<script>
export default {
    data() {
        return {
            text:'',
        }
    },
    methods:{
        AddToList(){
            this.$emit("addtolist",this.text);
            this.text='';
        },
    }
}
</script>

<style>

</style>
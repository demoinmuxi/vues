export default {
    // 内容会与混入组件合并，mixin内容优先级低于换入组件
    created(){
        this.hello();
    },
    methods:{
        hello(){
            console.log("I am a mixin");
        }
    },
}
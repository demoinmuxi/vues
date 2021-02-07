export default {
    install(Vue,options){
        console.log(options,'options');
        Vue.addedplugin=()=>{
            console.log("from pluginVue");
        };
        Vue.prototype.$added=()=>{
            console.log("from $added pluginVue");
        Vue.mixin({
            //影响之后的每一个vue实例
            created() {
                console.log("vue by plugin 全局注入的mixin");
            },
        });
        };
    },
}
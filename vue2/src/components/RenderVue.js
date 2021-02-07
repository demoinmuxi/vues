export default {
    props:['level','title'],
    render(h) {
        // 渲染函数h其实是createElement函数
        let v=h(
            'h'+this.level,
            // 标签名
            {attrs:{title:this.title}},
            // 数据
            this.$slots.default,
            // 子节点数组
        );
        console.log(v,'render');
        console.log(this,"this");
        return v;
    },
}

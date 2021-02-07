// 组件没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法时，可以将组件标记为
// functional ，这意味它无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)。
export default {
    functional:true,//标记函数式组件
    props:{
        level:{
            type:String,
            default:'1',
        },
        class:String,
    },
    render(h,context){
        const {level} = context.props;
        console.log(context);
        let children=[];
        children.push(
            h(
                'h4',
                {attrs:{
                    tag:'我是函数式组件里的子组件',
                    style:'font-size:10px',
                }},
                context.children
            )
        );
        children=children.concat(context.children);
        console.log(children,'iii');
        return h(
            'h'+level,
            {attrs:{fn:'functionalVue'},
            class:[context.data.staticClass]},
            // 或者class写作
            // {
            //     [context.data.staticClass]:true,
            // }
            children
        );
    },
}
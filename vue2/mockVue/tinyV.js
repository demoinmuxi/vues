class V {
    constructor(obj) {
        this.$el = obj.el;
        this.$data = obj.data();
        this.methods = obj.methods;
        Object.keys(this.$data).forEach(r=>{
            this.defineReactive(this,r,this.$data[r]);
            // this.shallowDefineReactive(r);
        });
        this.compile(document.querySelector(this.$el));
    };
    compile(el){
        const childNodes=el.childNodes;
        Array.from(childNodes).forEach(node=>{
            if(this.isElement(node)){
                this.compileEle(node);
                console.log("ele");
            }else if(this.isInterpolation(node)){
                this.compileText(node);
                console.log("{{"+node.textContent+"}}");
            }
            if (node.childNodes&&node.childNodes.length>0) {
                this.compile(node);
            }
        });
        console.log("compile OK");
        // console.log(this);
    }
    compileText(node){
        window.temp=this;
        window.innerText=RegExp.$1;
        eval('window.text=temp.'+innerText+';window.tr=0;');
        console.log(window.text,window.innerText,tr,'----');
        node.textContent=window.text;
    }
    isElement(node){
        return node.nodeType===1;
    }
    compileEle(node){
        let nodeAttrs=node.attributes;
        Array.from(nodeAttrs).forEach(attr=>{
            let attrName = attr.name;
            let exp = attr.value;
            if (this.isDirective(attrName)) {
                let dir = attrName.substring(2);
                this[dir]&&this[dir](node,exp);
            }
        });
    }
    isDirective(attr){
        return attr.indexOf('v-')===0;
    }
    do(node,exp){
        // setInterval(() => {
        //     // this.$data.a.e=1;
        // }, 1000);
    }
    isInterpolation(node){
        return node.nodeType===3&& /\{\{(.*)\}\}/.test(node.textContent);
    }
    shallowDefineReactive(key){
        if (this.$data[key] instanceof Array) {
            Object.defineProperty(this,key,{
                get(){
                    console.log('get arr',);
                    return this.$data[key];
                },
                set(newval){
                    this.$data[key]=newval;
                    this.update();
                    console.log('set arr');
                }
            });
        }else{
            Object.defineProperty(this,key,{
                get(){
                    console.log('get arr',);
                    return this.$data[key];
                },
                set(newval){
                    this.$data[key]=newval;
                    // this.update();
                    console.log('set arr');
                }
            });
        }
    }
    update(){
        console.log('update');
        // this.compile(document.querySelector(this.$el));
    }
    defineReactive(obj, key, val, setfn) {
        if (this.observe(val, obj, key)) {
            return
        }
        Object.defineProperty(obj, key, {
            get() {
                console.log("get", `${key}:${val}`);
                return val
            },
            set(newval) {
                if (newval !== val) {
                    console.log(`set ${key}->${newval}`);
                    val = newval;
                    setfn && setfn();
                    this.update();
                }
            },
        });
    }
    //递归遍历需要响应的对象
    observe(val, obj, key) {
        if (typeof val !== 'object' || val == null) {
            return
        }
        if (val instanceof Array) {
            obj[key] = this.proxyify(val);
            return true
            //to do 利用地址修改 使得proxy代理数组
        } else if (val instanceof Object) {
            Object.keys(val).forEach(key => {
                this.defineReactive(val, key, val[key]);
            });
        }
    }
    //增加删除新属性无法检测,新增加一个方法
    set(obj, key, val) {
        if (obj instanceof Array) {
            this.proxyify(obj);
        } else if (obj instanceof Object) {
            this.defineReactive(obj, key, val);
        }
    }
    Ring(obj,arrname,fn){
        // this.update(arrname)
    }
    proxyify(obj) {
        Object.keys(obj).forEach(
            key => this.observe(obj[key], obj, key)
        );
        let that = this;
        return new Proxy(obj, {
            get(target, name, value) {
                console.log('get--', target, name, value);
                return Reflect.get(target, name);
            },
            set(target, name, value, receiver) {
                console.log("set---");
                console.log(target, name, value, receiver);
                console.log('---end');
                Reflect.set(target, name, value, receiver);
                that.update();
                return true;
            }
        });
    }
}
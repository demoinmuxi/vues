const obj = {}
//数据响应式
function defineReactive(obj, key, val,setfn) {
    if (observe(val, obj, key)) {
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
            }
        },
    });
}
//递归遍历需要响应的对象
function observe(val, obj, key) {
    if (typeof val !== 'object' || val == null) {
        return
    }
    if (val instanceof Array) {
        obj[key] = proxyify(val);
        return true
        //to do 利用地址修改 使得proxy代理数组
    } else if (val instanceof Object) {
        Object.keys(val).forEach(key => {
            defineReactive(val, key, val[key]);
        });
    }
}
//增加删除新属性无法检测,新增加一个方法
function set(obj, key, val) {
    if (obj instanceof Array) {
        proxyify(obj);
    } else if (obj instanceof Object) {
        defineReactive(obj, key, val);
    }
}
function proxyify(obj) {
    Object.keys(obj).forEach(
        key => observe(obj[key],obj,key)
    );
    return new Proxy(obj, {
        get(target, name, value) {
            console.log('get--',target, name, value);
            return Reflect.get(target, name);
        },
        set(target, name, value, receiver) {
            console.log("set---");
            console.log(target, name, value, receiver);
            console.log('---end');
            Reflect.set(target, name, value, receiver);
        }
    });
}
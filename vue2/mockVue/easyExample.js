const obj = {}
//数据响应式
function defineReactive(obj, key, val, origin,setfn) {
    observe(val, obj, key,origin);
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
defineReactive(obj, 'foo', { t: 'foo', tt: { t: 'foo', y: [333, 'ii', { t: 3, u: [3, 44] }] } },obj);
console.log(obj);
console.log(obj.foo.tt.y[2].u[1], 'try');
//递归遍历需要响应的对象
function observe(val, obj, key,origin) {
    if (typeof val !== 'object' || val == null) {
        return
    }
    if (val instanceof Array) {
        origin[obj][key] = proxyify(val);
        //to do 利用地址修改 使得proxy代理数组
    } else if (val instanceof Object) {
        Object.keys(val).forEach(key => {
            defineReactive(val, key, val[key],origin);
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
            console.log(target, name, value);
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
// console.log(Object.keys(new Proxy([6,8],{set(){},get(){}})),Object.keys(new Proxy({w:2},{set(){},get(){}})),new Proxy({w:2},{set(){},get(){}}),typeof obj,Proxy);
// const arr = new Proxy([], {
//     get(target, name, value) {
//         console.log(target, name, value);
//         return Reflect.get(target, name);
//     }, set(target, name, value, receiver) {
//         console.log("set");
//         console.log(target, name, value, receiver);
//         console.log('---');
//         Reflect.set(target, name, value, receiver);
//     }
// });

// arr[0] = 100;
// arr[1] = 222;
// let a = arr[1];
// arr[2] = { r: 33, t: { e: 4 } };
// arr[2].r = 10;
// console.log(arr);
// console.log(arr[2]);
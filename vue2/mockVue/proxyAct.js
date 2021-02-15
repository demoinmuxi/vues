let obj={
    t:{w:[33],i:[[3],{e:[3]}]},j:[9]
}
function defineReactive(obj,fn) {
    fn&&fn();
    Object.keys(obj).forEach(key=>observe(obj,key));
    return new Proxy(obj, {
        get(target, name, value) {
            console.log('get--',{...target}, name, value);
            return Reflect.get(target, name);
        },
        set(target, name, value, receiver) {
            console.log('set--',{...target}, name, value, receiver);
            Reflect.set(target, name, value, receiver);
        }
    });
    
}
function observe(obj,key){
    if (typeof obj[key]!=='object'||obj[key]==null) {
        return
    }
    obj[key]=defineReactive(obj[key]);
}
obj=defineReactive(obj);
console.log({...obj},'obj');
console.log(obj.t=0);
console.log(obj.t.w[0],obj.t.i[1].e[0]);
obj.t.i[1].e[0]=100;
console.log({...obj},'obj');

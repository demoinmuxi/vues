// const obj={}
function defineReactive(obj ,key, val,setfn) {
    Object.defineProperty(obj,key,{
        get(){
            console.log("get",`${key}:${val}`);
            return val
        },
        set(newval){
            if (newval!==val) {
                console.log(`set ${key}->${newval}`);
                val=newval;
                setfn&&setfn();
            }
        },
    });
}

// defineReactive(obj,'foo','foo')
// obj.foo;
// obj.foo='333';
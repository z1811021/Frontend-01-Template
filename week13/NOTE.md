Proxy作为库的设计者和框架设计者专用的功能 用于修改某些操作的默认行为，等同于在语言层面做出修改。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

Proxy有两个参数一个是原始的对象 一个是用来定制拦截的行为

> A Proxy is created with two parameters:

> target: the original object which you want to proxy

> handler: an object that defines which operations will be intercepted and how to redefine intercepted operations.


```
<script>
const handler = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    }
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p); 
</script>
```
![image.png](https://upload-images.jianshu.io/upload_images/11567598-698980d1428e30ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
<script>
    let object = {
        a: 1,
        b: 2
    }
    let handlers = []
    function reactive(obj) {
        return new Proxy(obj, {
            get(obj, prop) {
                console.log(obj, prop)
                return obj[prop]
            },
            set(obj, prop, val) {
                console.log(obj, prop, val)
                obj[prop] = val
                for (let handler of handlers)
                    handler()
                return obj[prop]
            }
        })
    }

    function effect(handler) {
        handler()
        handlers.push(handler)
    }
    let dummy;
    let proxy = reactive(object)

    effect(() => dummy = proxy.a)
    console.log(dummy)
    proxy.a = 111
    console.log(dummy)
</script>
```

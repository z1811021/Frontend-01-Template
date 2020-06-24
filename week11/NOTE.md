### 异步操作
```

const timeOut = function (num) {
  return new Promise(function (resolve, reject) {
    // 进行异步操作
    setTimeout(()=>{
      resolve(num)
    },3000)
  });
};

const asyncF = async function () {
  const f1 = await timeOut(1);
  // 过三秒先打印1
  console.log(f1);
  const f2 = await timeOut(2);
  // 再过三秒打印2
  console.log(f2);
};

asyncF()
```

async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当执行到await的时候会先执行await，等完成后再继续。

```
const timeOut = function (num) {
  return new Promise(function (resolve, reject) {
    // 进行异步操作
    setTimeout(()=>{
      resolve(num)
    },3000)
  });
};

const asyncF = async function (num) {
  const f1 = await timeOut(1);
  // 过三秒先打印1
  console.log(f1);
  const f2 = await timeOut(num);
  // 再过三秒打印2
  console.log(f2);
  // 返回2
  return f2
};

asyncF(2).then((res)=>{
  console.log(res)
})
```

### async的异常处理
只要在async函数中跑出错误就会被reject
并在catch中找到
```
const throwErr = async () => {
  // 抛出错误 返回的Promise对象会自动reject
  throw new Error('err')
};

throwErr().then((res)=>{
  console.log(res)
  }).catch((err)=>{
    // 会在catch中被找到
    console.log(err)
})
```
所以我们我们返回的promise对象可能会报错，所以最好放在try catch里


```
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
```
如果await的函数不需要同步操作的话我们可以用Promise.all变为同步,具体Promise.all可以参考
[https://www.jianshu.com/p/2b535c6e63d0](https://note.youdao.com/)


### Demo

```
先创建一个方法返回Promise对象
function doTask({id, success=true,time=100}){
  return new Promise(function (resolve, reject) {
    setTimeout(function(){// 模拟异步
      var msg
      if(success) {
        msg = `thing ${id} is done`
        console.log(msg)
        resolve(msg);
      } else {
        msg = `thing ${id} failed`
        console.error(msg)
        reject(msg)
      }
    }, time)
  })
}

//同步
async function doSerialTing() {
  await doTask({id:1})
  console.log('sth')
  await doTask({id:2, time: 1000})
  await doTask({id:3})
}

doSerialTing()


// 异步
async function doParallelTing() {
  var [res1, res2, res3] = await Promise.all([
      doTask( {id:1}),
      doTask( {id:2, time: 1000 }), 
      doTask( {id:3})
  ])
  console.log(res1,res2,res3)
}

doParallelTing()

```

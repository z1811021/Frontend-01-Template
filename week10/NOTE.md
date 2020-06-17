- **事件流向**

先捕获然后处理，然后再冒泡出去

addEventListener false冒泡 true捕获


![image.png](https://user-gold-cdn.xitu.io/2018/12/6/16783cfde7f87fac?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body>
    <button id="btn">DOM事件流</button>
    <script>
    var btn = document.getElementById("btn");
    btn.onclick = function(event) {
        console.log("div 处于目标阶段");
    };
    document.body.addEventListener("click", function(event) {
        console.log("event bubble 事件冒泡");
    }, false);
    document.body.addEventListener("click", function(event) {
        console.log("event catch 事件捕获");
    }, true);
    </script>
</body>

</html>
```
![image.png](https://upload-images.jianshu.io/upload_images/11567598-644900e65d7bd5e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> ##### 事件捕获阶段（Capture Phase）
> 事件的第一个阶段是捕获阶段。事件从文档的根节点出发，随着 DOM 树的结构向事件的目标节点流去。途中经过各个层次的 DOM 节点，并在各节点上触发捕获事件，直到到达事件的目标节点。捕获阶段的主要任务是建立传播路径，在冒泡阶段，事件会通过这个路径回溯到文档跟节点。
> ##### 目标阶段（Target Phase）
> 当事件到达目标节点的，事件就进入了目标阶段。事件在目标节点上被触发，然后会逆向回流，直到传播至最外层的文档节点。
> ##### 冒泡阶段（Bubble Phase）
> 事件在目标元素上触发后，并不在这个元素上终止。它会随着 DOM 树一层层向上冒泡，直到到达最外层的根节点。也就是说，同一个事件会依次在目标节点的父节点，父节点的父节点...直到最外层的节点上被触发。
> 冒泡过程非常有用。它将我们从对特定元素的事件监听中释放出来，相反，我们可以监听 DOM 树上更上层的元素，等待事件冒泡的到达。如果没有事件冒泡，在某些情况下，我们需要监听很多不同的元素来确保捕获到想要的事件。

> 所有的事件都要经过捕捉阶段和目标阶段，但是有些事件会跳过冒泡阶段。例如，让元素获得输入焦点的 focus 事件以及失去输入焦点的 blur 事件就都不会冒泡。


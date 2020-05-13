前端的同学大家经常会在面试中碰到关于浏览器的问题但是我们由于经常在代码中很少碰到这方面的知识我们经常会忽略它，今天就来系统的总结一下。

我们经常会碰到这种高频试题 

**从输入域名到最后呈现经历的过程**

这个题其实是个开发性试题 你从很多方面回答都是对的。

比如 

**域名解析 --> 发起TCP的3次握手 --> 建立TCP连接后发起http请求 --> 服务器响应http请求，浏览器得到html代码 --> 浏览器解析html代码，并请求html代码中的资源（如js、css、图片等） --> 浏览器对页面进行渲染呈现给用户 --> 四次挥手结束**

当然我们也可以细化从浏览器得到html

**域名解析 --> 发起TCP的3次握手 --> 建立TCP连接后发起http请求 --> 服务器响应http请求，浏览器得到html代码 --> 计算 DOM 树上的 CSS 属性-->浏览器把请求回来的 HTML 代码经过解析，构建成 DOM 树 --> 最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图(排版)--> 浏览器对页面进行渲染呈现给用户 --> 四次挥手结束**


接下来我们看下大学中都会遇到的OSI七层模型

1. - Layer 7 - Application
1. - Layer 6 - Presentation
1. - Layer 5 - Session
1. - Layer 4 - Transport
1. - Layer 3 - Network
1. - Layer 2 - Data Link
1. - Layer 1 - Physical

在我们开始请求TCP的时候这个时候是在Transport层 在Node.js中属于net模块

IP属于Network层 在Node.js中要引入C++ libnet或者libpcap

接下来在HTTP时就在上面三层 在Node.js中属于HTTP模块

这也就是为什么我们创建HTTP server时候要用到HTTP模块

我们写个列子

```
const http = require('http');
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});


server.listen(8088)
```

### HTTP

HTTP 协议是基于 TCP 协议出现的，对 TCP 协议来说，TCP 协议是一条双向的通讯通道，HTTP 在 TCP 的基础上，规定了 Request-Response 的模式。这个模式决定了通讯必定是由浏览器端首先发起的。

#### request
一个HTTP请求报文由请求行（request line）、请求头部（header）、空行和请求数据4个部分组成

1. 请求行 get post put
1. 请求头部 accept user agent
1. 空行 （最后一个请求头之后是一个空行，发送回车符和换行符，通知服务器以下不再有请求头）
1. 请求数据 （post中）


```

POST / HTTP/1.1 301 Moved Permanently   // request line
Date: Fri, 25 Jan 2019 13:28:12 GMT // header
Content-Type: text/html
Content-Length: 182
Connection: keep-alive
Location: https://time.geekbang.org/
Strict-Transport-Security: max-age=15768000
                                 // 空行
<html> // body
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>openresty</center>
</body>
</html>
```
#### response

HTTP响应也由三个部分组成，分别是：状态行、消息报头、响应正文。
1. 状态行 get post put
1. 消息报头 accept user agent
1. 空行 （最后一个请求头之后是一个空行，发送回车符和换行符，通知服务器以下不再有请求头）
1. 响应正文 （post中）
状态行 有状态码



```
POST / HTTP/1.1 301 Moved Permanently   // status line
Date: Fri, 25 Jan 2019 13:28:12 GMT // header
Content-Type: text/html
Content-Length: 182
Connection: keep-alive
Transfer-Rncoding: chunked
                                 // 空行
2
<html> // body
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
hi
</body>
</html>
```

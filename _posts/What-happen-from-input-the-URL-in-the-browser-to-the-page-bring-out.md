---
title: '从面试题“输入URL...发生了什么?”学到的(上)'
excerpt: '较详细地描述了输入URL到页面展现的过程，而下篇将扩展补充这一过程涉及的另一些知识点'
date: '2017-10-13 16:47:45'
tags: '从浏览器地址栏输入URL到页面展现'
---

**面试官：从浏览器地址栏输入URL到页面展现到底发生了哪些事？**  

我曾在面试中被问到这个问题，面试官的要求就是尽可能详细地描述这个过程,但结果并不总是让人满意；为了更好得理解网络协议这一部分内容，我仔细阅读了《HTTP权威指南》一书，并且认真做了笔记，发现随着知识的积累，每次去回答这个问题都有不一样的体验，收获也更多，而HTTP/TCP协议确实是非常复杂的一个话题，我仅仅想通过这篇文章来捋一捋HTTP网络编程的一些知识点，顺便看一下自己能否把尽可能详细地描述这个复杂的过程，列举包括涉及到的知识点，包括积累的阅读笔记，由于内容过多，原本写成一篇的内容拆成上下两篇，本篇主要包含前一部分内容:

来看下这个过程到底发生了哪些事：

1. 在浏览器输入URL地址；
2. 浏览器从URL中解析出服务器的主机名；
3. 根据主机名在DNS服务器中转换为对应的服务器的IP地址；
4. 与服务器建立TCP连接；  
5. 浏览器向服务器发送HTTP请求报文；  
6. 服务器向浏览器返回请求结果；  
7. 浏览器解析文档，渲染出web页面；  

### #在浏览器输入URL地址

所有的操作源于在浏览器地址栏敲下一个URL网址，URL(Uniform Resource Locator) 也叫统一资源定位符，描述了特定服务器上某资源特定的位置,URL包括三个部分:

1. scheme描述访问资源使用的协议;  
2. 服务器的因特网地址；
3. 其余部分指定了web服务器上的某个资源;  

例如 <https://www.abc.com/a.html> 协议名为 http, 页面所在的机器的 DNS 名为 www.abc.com，请求目标机器的资源为 a.html。

### #浏览器根据域名找到对应IP地址

我们知道 google.com只是一个域名(Domain)，而IP地址是由32位的二进制数字组成，两者都是用来标识因特网上的某一台主机，该主机的网页内容可以通过域名和IP来访问，例如你可以通过网址 <http://www.firefox.com.cn/> 来访问火狐，而IP63.245.215.20也是能够准确地定位到该资源，真正的资源地址看上去并没有那么好记，我们在访问这台机器网页内容的时候肯定也不愿意使用这一串难记的数字，而是使用域名来代替,之所以叫“域名”,是因为因特网的命名系统中使用了很多的“域”,但是机器在处理IP数据传输的时候，却不是使用域名而是使用IP，因为域名长度是不确定的，机器处理起来效率不高，需要在两者之间进行转换，这涉及到DNS查询解析过程，查询的步骤如下：

1. 从浏览器缓存中查询，浏览器会存储一定时间内的DNS记录；
2. 如果没有找到，从操作系统中缓存中查询；
3. 路由器也会有DNS记录，继续在路由器缓存中查询；
4. 如果没有找到，继续在ISP(Internet Service Provider)互联网提供商机器中查询，这里是接入internet的中继站；
5. 最后是在DNS(域名服务器)系统上查找；

**关于DNS服务器和解析器**
DNS服务器可以理解为域名和IP地址相互映射的一个分布式数据库，你只需要记住网站域名即可，DNS服务器帮我们完成域名到IP的转换过程;DNS的本质是它发明了一种分层次的，基于域的命名方案，并且用的是一个分布式数据库系统实现此命名方案，简要地讲，DNS 的使用方法如下：为了将一个名字映射成IP地址，程序会调用一个解析器的库，利用名字解析器会往DNS服务器去查询名字，将找到的 ip 地址返回给解析器，解析器再将 ip 返回调用方，有了目标机器的 ip，应用程序和目标机器能建立一个 TCP 连接。
**DNS轮询**:
DNS轮询是实现负载均衡的一种方法，为什么要做负载均衡？传统意义上一个域名映射到一个IP，但为了处理大规模的访问请求，会使用多个主机组成服务器集群，在DNS服务器中为域名配置多个A记录，为了均衡服务器的负载，集群的服务器会将众多的访问请求分散到系统的不同节点，从而减缓单台机器的压力，实现系统的更高的稳定性和处理效率。  

### #与服务器建立连接TCP连接

一次完整的HTTP请求是从TCP三次握手建立成功后开始的，HTTP协议和三次握手没有直接联系，HTTP协议属于应用层，而TCP是传输层的东西，但几乎所有的HTTP通信都是由TCP/IP承载的，TCP为HTTP提供了一条可靠的传输通道；在正式发送数据之前，TCP会通过传递两个分组来确定是否建立连接，这个过程也就是俗称的“TCP的三次握手”,握手🤝过程包括以下几个步骤：  

1. 请求新的TCP连接时，客户端会向服务器发送一个一个小的TCP分组(40-60字节)，这个分组中有一个特殊的SYN(synchronous)标识，用来标记这是一个比较特殊的请求；  
2. 如果两者之间的连接正常，服务器接受到了这个请求，会对这个分组中的一些参数进行计算，并向客户端返回一个TCP分组，分组的SYN和ACK标记表示服务端已经接受到了这个请求；  
3. 客户端收到这个请求后，会再给服务端发送一个确认信息，告诉服务端已经收到了回复的信息，表明二者已成功建立；  

### #浏览器向web服务器发送HTTP请求

HTTP是一种无状态协议，因此在HTTP中引入了Cookie技术，服务器可以向客户端写Cookie,客户端每次的请求会带上这个Cookie;
HTTP请求发生在客户端，HTTP的请求报文包括请求行、消息报头、请求正文三部分的内容，例如上述例子请求Google服务器中的一张图片,浏览器会向服务器发送的请求：

```sh
Request URL:https://www.google.com/images/branding/product/ico/googleg_lodp.ico  
Request Method:GET  
Status Code:200   
Remote Address:127.0.0.1:1080  
...(其它头部信息)
```

头部信息里标明了请求的URL，请求方法为GET,请求的返回状态码为200，该请求的远端地址等信息.  

```sh
:authority:www.google.com  
:method:GET  
:path:/images/branding/product/ico/googleg_lodp.ico  
:scheme:https  
accept:image/webp,image/*,*/*;q=0.8  
accept-encoding:gzip, deflate, sdch, br  
accept-language:zh-CN,zh;q=0.8,en;q=0.6  
cookie:NID=114=UH7hzSHkRuceh9rcMn4W9SqHIPYCyF033pOTO_30Rl359A2qAKiWwKPOLa5rvGjxc6jRhrDoEO42F3xUWbB60FF4MTsupqrLu1yHNeHqNF0xiS4EQy9sj_thI4Hqt2Tp; 1P_JAR=2017-10-23-10  
referer:https://www.google.com/  
user-agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36  
x-chrome-uma-enabled:1  
x-client-data:CI62yQEIo7bJAQjBtskBCPqcygEIqZ3KAQ==

```

常见的一些请求Headers头字段:
**accept-ranges**
image/webp,image/*,*/*;q=0.8;表示浏览器这边支持接受的MIME类型是image图片;  
例如常见的text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8优先顺序是从左到右；
**Accept-Charset**  
Accept-Charset请求报头用于指定客户端接受的字符，
**Connection:keep-alive**  
通常来讲，HTTP的生命周期就是发送一次(request)请求到接受到(response)响应，而且一个request只能有一个response，在HTTP1.1Z中增加KeepAlive后，能让浏览器复用已有的TCP连接，当前一个请求已经响应完毕，服务器端没有立即关闭TCP链接，和服务端之间保持长连接，这个连接是可以复用的，客户端发送一次请求，收到一次请求后，第二次就不需要再重新建立连接了，可以直接使用这次连接继续发送请求，设置为Connection:keep-alive表示开启，设置为Connection:close表示关闭。
**Keep-alive: 300**
设置这个长连接的保持连接时间。  
**Accept-Language**  
这边能够接受的语言类型。
**cache-control：**  
cache-control指定请求和响应遵循的缓存机制，设置字段有no-cache, no-store, max-age, max-stale, min-fresh, only-if-cached；  
**user-agent**:客户端的一些必要信息，包括操作系统、浏览器、浏览器内核信息等;  
**accept-encoding**: gzip, deflate, sdch, br  
浏览器端能接受的解码的数据编码方式，比如gzip,也就是服务器端可以给客户端发送gzip格式的压缩文件。
**Cookie**: AJSTAT_ok_times=2; Hm_lvt_52e0dad202840d404a698bfb400d6496=1506422618;  
Cookie以键值对字符串的形式存储在客户端本地文件中，网络服务器会在HTTP头中携带向客户端发送的cookie，在客户终端，浏览器解析这些cookie并将它们保存下来，它会自动将同一服务器的任何请求Headers上带上这些cookie。

接下来再来看下返回信息Headers头的信息：

### #服务器向浏览器返回请求结果

```sh
accept-ranges:bytes  
alt-svc:quic=":443"; ma=2592000; v="39,38,37,35"  
cache-control:private, max-age=31536000  
content-encoding:gzip  
content-length:1494  
content-type:image/x-icon  
date:Mon, 23 Oct 2017 10:38:47 GMT  
expires:Mon, 23 Oct 2017 10:38:47 GMT  
last-modified:Thu, 08 Dec 2016 01:00:57 GMT  
server:sffe  
status:200  
vary:Accept-Encoding  
x-content-type-options:nosniff  
x-xss-protection:1; mode=block  
```  

**content-type**  
在实体报头中指明发送给接收者的实体正文的媒体类型，例如Content-Type:text/html;charset=ISO-8859-1。  
**set-cookie**  
向客户端设置cookie
**server**  
响应报头域包含了服务器用来处理请求的软件信息,与User-Agent请求报头域是相对应的,例如常见的Apache、Nginx、openresty等。  
**Cache-Control**  
响应报头中关于缓存的字段有:  
public: 表明响应可被任何缓存区缓存;  
private:  表明对于单个用户的整个或部分响应消息，不能被共享缓存处理;
no-cache:  表明请求或响应消息不能缓存;
no-store:  请求和响应消息都不使用缓存;
no-transform: 缓存或代理不能改变由头规定的实体体的任何方面n，包括实体自身的内容；  
must-revalidate: 因为缓存可以配置成忽略服务器指定的过期时间，must-revalidate字段表示一个已经被缓存的响应，在接下来的使用中需要重新验证缓存条目;  
proxy-revalidate:   proxy-revalidate 指令可以被用在响应一个已授权的请求，以便允许用户缓存存储，之后返回无需重新验证的响应（因为它已经被授权一次,但仍然需要代理来为用户重新验证,以确保每个用户已授权;  
max-age:  指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应;

**Expires**:  
因为使用缓存，代理服务器和浏览器可以在一段时间内直接从缓存中加载内容，而Expires字段是用来指定页面过期的时间，,一旦过期就必须从服务器上重新加载.时间必须使用GMT格式。
Expires：Tue, 24 Oct 2017 14:46:36 GMT;  他告诉浏览器缓存有效性持续到2017年10月24日这个时间为止，在这个时间之内相同的请求使用缓存，这个时间之外使用http请求。Expires是HTTP1.0的标准，而1.1定义的Cache-Control也是控制缓存有效期的字段，当二者同时存在时，Cache-Control的优先级大于Expires，而具体的浏览器端的缓存策略，将在下篇进行扩展。
**Last-Modified**
实体报头域用于指示资源的最后修改日期和时间。

### #浏览器解析文档，渲染出web页面

经过前面复杂的请求过程，浏览器终于拿到了所需的资源，接下来要做的工作就是将web资源呈现出来，浏览器的工作原理其实是非常复杂的一个过程，这里涉及到两个重要的部分:渲染引擎、JavaScript引擎。

**渲染引擎**  
渲染引擎的职责就是渲染，即在浏览器窗口中显示所请求的内容。
解析html以构建dom树 -> 构建render树 -> 布局render树 -> 绘制render树：  

1. 将从服务器获取的HTML文档构建成文档对象模型，也就是我们常说的DOM;  
2. 载入和解析样式表，构成层叠样式表模型CSSOM(CSS Object Model)，也就是把css字符串解释后生成style rules;  
3. 结合CSSDOM构建渲染树，即render树，检查DOM树中的每个DOM节点，判断是否需要生成RenderObject,例如display:none的节点；
4. 布局，此时的RenderObject树并不包含位置和大小信息，webkit将进行布局计算，也就是说确定每个元素的位置、层叠关系等，如果样式发生变化，需要重新计算布局，这很耗费性能；
5. 调用方法进行绘制；而我们常说的重绘（repaint），例如当这些元素的颜色、背景等发生变化时，需要重新绘制一遍;
6. 网页展现在屏幕上；  

关于浏览器的渲染的过程，实际情况中，上述过程不可能一次性完成，JavaScript脚本的加载 往往会阻塞这个过程，下面有几点是值得注意的：

1. 渲染HTML和加载js是并行进行，也就是说加载并不会阻塞页面的渲染，但是执行会；载入的Javascript在浏览器中的运行有两大特性：1)载入后马上执行，2）执行时会阻塞页面后续的内容（包括页面的渲染(页面空白情况)、其它资源的下载）。这也是为什么我们会把script标签放在文档的最后位置上。
2. 使用defer、asycn标识无阻塞脚本,两者共同点在于使脚本延迟到页面解析完毕后再运行，相当于告诉浏览器立即下载，但是延迟执行。不同点是延迟脚本总是按照他们的顺序执行，但是async异步脚本并不保证按照指定的先后顺序执行。
...

而在下篇内容中将扩展HTTP协议必须掌握的一些知识点，继续深入理解TCP协议、缓存、浏览器渲染过程等内容；  

### #参考资料

1.[从输入 URL 到页面加载完成的过程中都发生了什么事情](http://fex.baidu.com/blog/2014/05/what-happen/)
2.[https://github.com/skyline75489/what-happens-when-zh_CN](https://github.com/skyline75489/what-happens-when-zh_CN)

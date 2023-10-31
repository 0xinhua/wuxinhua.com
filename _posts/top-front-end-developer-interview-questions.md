---
title: '前端面试系列 - 前端八股文'
excerpt: '前端八股文是指前端面试过程中经常被问到的问题，基本也是必问的一些问题。相比于国外公司面试，国内互联网公司前端面试里，考八股文和手写代码是逃不了的两部分，这里汇总了最近面试被问到频率较高的一些基础题及我的简要回答'
date: '2022-12-26 22:50:00'
tags: 面试 前端面试题 前端八股文 前端面试八股文
---

前端面试八股文是指前端面试过程中经常被问到的一系列问题，基本也是面试必问的基础问题，被大家戏称为前端八股文。在国内互联网公司前端面试里，考八股文和手写代码是逃不了的两部分，这里汇总了最近面试被问到频率较高的一些基础题及简要回答，主要包括 HTML 、JavaScript、前端框架三部分内容，如有错误或遗漏欢迎反馈斧正，后续有新问题会持续更新，希望大家在 2023 年都能找到合适满意的工作。

# Html

## DOM 和 BOM 的区别

- Document Object Model（文档对象模型）把「文档」当做一个「对象」来处理，即把 html 页面结构解析成一个对象，提供一个接口API，让你去操作所有的节点 dom，通过 document 属性就可以访问、检索、修改 XHTML 文档内容与结构。 最核心的对象是 document。
- Browser Object Model（浏览器对象模型）,即把「浏览器」当做一个「对象」来看待，BOM 的最核心对象是 window 对象
- BOM 的 window 包含了document，所以可以说 BOM 包含了 DOM。

## position 取值

- **static** 默认的定位类型，这个时候 top right 这些值无效，浏览器决定位置
- **relative** 它必须搭配 top、bottom、left、right 这四个属性使用，用来指定偏移的方向和距离，相对于默认位置（即 static 时的位置）进行偏移
- **absolute** 表示，相对于上级元素（一般是父元素）进行偏移，也是得搭配上下左右四个值来使用。（定位基点（一般是父元素）不能是 static 定位，否则会按 html 来计算）
- **fixed** 表示，相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口。这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。
- **sticky** 很像 relative 和 fixed 的结合，实现吸顶效果，它的具体规则是，当页面滚动，父元素开始脱离视口时（即部分不可见），只要与 sticky 元素的距离达到生效门槛，relative 定位自动切换为 fixed 定位；等到父元素完全脱离视口时（即完全不可见），fixed 定位自动切换回 relative 定位

## H5 语义化

html 语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；在没有样式 CCS 情况下也以一种文档格式显示，并且是容易阅读的。搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。

## 延迟加载，script 标签为什么放后面？引出 defer 和 async 区别

前端加载 html，html 解析器运行于主线程中，如果遇到\<script> 标签后会阻塞，直到脚本从网络中下载并被执行，也就是说\<script>标签的脚本会阻塞浏览器的渲染。这里还涉及到页面生命周期：

- **DOMContentLoaded** 页面已经完全加载了 html 并且构建了 dom 树，但样式和 img 这样的资源还没有加载完
- **load** —— 浏览器不仅加载完成了 HTML，还加载完成了所有外部资源：图片，样式等。
- **beforeunload/unload** —— 当用户正在离开页面时。

当浏览器处理一个 HTML 文档，并在文档中遇到 **\<script>** 标签时，就会在继续构建 DOM 之前运行它。这是一种防范措施，因为脚本可能想要修改 DOM，甚至对其执行 **document.write** 操作，所以 `DOMContentLoaded` 必须等待脚本执行结束。如何解决这个问题，可以使用 script 标签的两个属性，defer 和 async。

- 没有 **defer** 或 **async**，就会阻塞了，浏览器会立即加载执行这个script 脚本，就是卡在这个标签之后的这些文档元素前加载并执行
- 有 **async**，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行。
- 有 **defer** ，同样也是并行异步的，不同的地方就是 script js 的执行会在所有元素解析完，并且在 DOMContentLoaded 事件触发前完成。

## 前端 cookie，怎么获取cookie及更新cookie

- 前端通过 document.cookie 就能拿到 cookie，清除的话可以通过更新过期时间
- 之所以会出现 cookie，是因为 http 是一个无状态的协议，使同一个客户端连续两次发送请求给服务器，服务器也识别不出这是同一个客户端发送的请求。cookie 的出现就是为了解决这个问题。
- cookie 在维基百科的解释是小型文本文件，指某些网站为了辨别用户身份存储在用户本地终端的数据，一般大小不会超过 4 kb，以键值对形式存在。
- cookie 的设置可以在服务端的响应头里添加 set-Cookie 字段

cookie 的属性：

- Expires 用于设置 Cookie 的过期时间，Max-Age 表示 cookie 失效前的经过的秒数
- Max-Age 可以为正数、负数、甚至是 0。
- Domain 指定了 Cookie 可以送达的主机名
- Path 指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部。比如设置 Path=/docs，/docs/Web/ 下的资源会带 Cookie 首部，/test 则不会携带 Cookie 首部。
- 设置 HTTPOnly 属性可以防止客户端脚本通过 document.cookie 等方式访问 Cookie，有助于避免 XSS 攻击。
- SameSite 属性可以让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。
- SameSite 可以有下面三种值：
  1. **Strict** 仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致
  2. **Lax** 允许部分第三方请求携带 Cookie
  3. **None** 无论是否跨站都发送 Cookie

## ie67兼容问题

- 在 IE6，7 下输入类型的表单控件加 border:none 无效，设置 border:0。
- IE6 下块元素有浮动和横向 margin 的时候，横向的 margin 值被放大成两倍。给浮动元素加 display:inline。

## 重排跟重绘

要讲明白这两个概念，需要先说一下浏览器的页面生成过程，当我们通过 url 链接访问一个页面时，在加载完 html、css 、script资源后会有一个解析布局绘制页面的过程，对应的三个操作解析、布局、绘制，网页生成的时候，至少需要排列及绘制一次，随着用户的操作后续有可能而后面会触发重排和重绘。

过程：

- html 会解析成一个 dom 树
- css 会被解析成一个 cssom 树
- 结合这两个树，会生成一个渲染树 Render Tree 这个过程称为 Attachment
- 生成布局，也就是在屏幕上画出渲染树节点的位置
- 将布局绘制在屏幕上，即显示出整个画面

重排(reflow)：当 dom 的变化影响了元素的几何信息（例如它的位置，尺寸等），这个时候浏览器会重新计算它的属性值，并且把它放在正确位置上，这个叫重排（重新生成布局，重新排列）

常见的触发属性或方法：width，height、font-size、display、scrollTo等

重绘(repaints)：当一个元素的外观发生了变化，但没有改变布局，浏览器会把元素外观重新绘制出来。常见的触发属性： color，border-style、background-position 等

重绘不一定会导致重排，但是重排一定会导致重绘。

一些方法减少不必要的重排：

- 减少不必要的 DOM 深度，一个级别进行更改可能会致使该树的所有级别（上至根节点，下至所修改节点的子级）都随之变化。这会导致花费更多的时间来执行重排。
- 如果您想进行复杂的渲染更改（例如动画），请在流程外执行此操作，position-absolute 或 position-fixed 来实现此目的。
- 避免使用不必要且复杂的 CSS 选择器（尤其是后代选择器），因为此类选择器需要耗用更多的 CPU 处理能力来执行选择器匹配。
- 在大部分浏览器有渲染队列优化，建议通过改变class 来集中改样式
- 缓存布局信息，例如下面的例子：

```js
div.style.left = div.offsetLeft + 1 + 'px';

div.style.top = div.offsetTop + 1 + 'px';

// 上述会进行两次重排，而通过变量存储后，讲进行一次重排

var curLeft = div.offsetLeft;

var curTop = div.offsetTop;

div.style.left = curLeft + 1 + 'px';

div.style.top = curTop + 1 + 'px';

这也相当于是分离读写操作了优化为1次重排
```

## 盒子模型及box-sizing

每一个元素在浏览器中都可以理解成一个盒子，它包含对应的四个属性值：宽高、boder 边框、padding 内边距、外边距 margin

分为了 W3C 盒子模型(标准盒模型)和 IE 盒子模型(怪异盒模型)

标准盒子模型的内容空间的宽度是由 width 属性设置的，例如宽度 = width + border + 内边距的值，也就是说 width 只是里面的内容的宽度，实际大小会加上 border + padding的值。

- 盒子总宽度 = width + padding + border + margin;
- 盒子总高度 = height + padding + border + margin

它的实际区域内容宽高值分别是：

 宽：width + padding + border

 高：height + padding + border

但在ie也就是怪异盒子模型里，会包含 border 和 padding 的值，也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，内容区的实际宽度是 width 减 去(border + padding) 的值。

- 盒子总宽度 = width  + margin;
- 盒子总高度 = height + margin

它的实际区域内容宽高值分别是：

- 宽：width
- 高：height

## flex：0 1 auto

三个参数分别对应的是 flex-grow, flex-shrink 和 flex-basis，默认值为0 1 auto。

- 1.flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
- 2.flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- 3.flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。

## BFC

**BFC**（Block Formatting Context），即块级格式化上下文，它是页面中的一块渲染区域，容器页面里的子元素不会影响到外部的元素，并且有一套属于自己的渲染规则：

- 例如盒子的排列会在垂直方向上一个个排列
- 相邻盒子间的 margin 会发生重叠

触发条件：

- 根元素，即 html
- 浮动元素：float 为 left right
- position 为 absolute 或 fixed
- overflow 不是 visible 的

（创建BFC的方式：根元素、浮动元素和绝对定位元素，非块级盒子的块级容器，overflow 值不为 visiable 的块级盒子）

应用场景：

- 防止 margin 塌陷，例如两个 p 取大的值，这个时候可以在外层包一层 div
- 清除浮动，例如在子元素浮动的情况，父元素没有被撑开，BFC 在计算高度时浮动元素也会计算的，给父元素加上 overflow hidden
- 自适应多栏布局，例如使用 float 布局两栏布局，左侧 float left，左边依然会与包含块的左边相接触，这个时候可以给外边距加 verflow: hidden;

## 如何画一个三角形

通过控制边宽及 transparent 来实现

```css
#demo{
  width:100px;
  height:100px;
  border:3px red solid;
}

#demo{
  width:100px;  
  height:100px;  
  border: 20px solid;  
  border-color: red blue red blue; 
}
```

```css
#demo{
  width:0px;  
  height:0px;  
  border: 40px solid;  
  border-color: red blue red blue; 
}
```

```css
#demo{
  width:0px;
  height:0px;
  border:40px solid transparent;
  border-bottom:80px solid red;
}
```

## defer 和 async 区别

- 默认情况下，脚本的下载和执行会根据文档的先后顺序进行，当它在下载和执行时，文档解析就会被阻塞，加载执行后再回来解析
- 使用 defer 和 async 后JavaScript 脚本下载在新的线程中进行，不会阻塞 HTML 解析。
- 不同点是执行：
  - async 执行时机：下载完后，立即执行
  - defer 下载完后，在 dom 解析完之后、触发 DOMContentLoaded 方法之前执行

## link 和 @import 的区别

- 两种都是加载 css 的方式，link 是一个 html 标签，但 import 是 css 提供的
- link 会跟页面加载时同时加载，import 会等页面加载完再加载
- link 的权重会高于 import

## 清除浮动的方法

- 添加一个类名为 clear 的节点，设置 clear both
- 给父元素添加样式 overflow:hidden 触发 bfc
- 给父元素添加伪类 :after 和 zoom （推荐）

## DOMContentLoaded 和 load 区别

- **DOMContentLoaded** —— 浏览器已完全加载 HTML，并构建了 DOM 树，但像 **\<img>** 和样式表之类的外部资源可能尚未加载完成。
- **load** —— 浏览器不仅加载完成了 HTML，还加载完成了所有外部资源：图片，样式等。
- **beforeunload/unload** —— 当用户正在离开页面时。

## 块状元素行内元素

块级元素，顾名思义，该元素呈现“块”状，所以它有自己的宽度和高度，块级元素比较霸道，它独自占据一行高度（float浮动除外），一般可以作为其他容器使用，可容纳块级元素和行内元素。

- 高度，行高，外边距（margin）以及内边距（padding）都可以控制；
- 元素的宽度如果不设置的话，默认为父元素的宽度（父元素宽度100%

行内元素不可以设置宽（width）和高（height），但可以与其他行内元素位于同一行，行内元素内一般不可以包含块级元素。行内元素的高度一般由元素内部的字体大小决定，宽度由内容的长度控制。

- 不会独占一行，相邻的行内元素会排列在同一行里，直到一行排不下才会自动换行，其宽度随元素的内容而变化；
- 高宽无效，对外边距（margin）和内边距（padding）仅设置左右方向有效 上下无效；
- 设置行高有效，等同于给父级元素设置行高；

input、img就是行内块级元素，

## 左侧固定，右边自适应

- bfc

```css
.con1_l{
  float:left;
}
.con1_r{
  overflow: hidden;
}
```

- flex
- display:flex; 右边 flex-grow:1;
- float + margin

```css
.con2_l{
  float:left;
}
.con2_r{
  margin-left:200px;
}
```

- calc

```css
/* 5 calc */
.con5_l{
  float:left;
}
.con5_r{
  width:calc(100% - 200px);
  float:left;
}

```

# JavaScript

## 堆跟栈的区别

内存空间分为栈 Stack 和 堆 heap 两种，其中栈存放变量及基础类型，堆存放复杂对象、也叫引用数据类型，栈**自动分配**相对**固定大小**的内存空间。。

在 JS 里内存是由系统自动分配管理的，内存管理机制是内存基元会在变量创建时分配，然后在它们不再被使用时“自动”释放，后面这个过程也叫垃圾回收机制，

- 栈空间是先进后出，后进先出的特点
- 引用类型的值是按引用访问的，可以理解为保存在栈内存中的一个地址，这个地址与堆内存实际值相关联

## 栈跟队列的区别

- 栈：是限制在表的一端进行插入和删除运算的线性表。栈又称后进先出简称：[LIFO](https://www.baidu.com/s?wd=LIFO&tn=44039180_cpr&fenlei=mv6quAkxTZn0IZRqIHckPjm4nH00T1Y4rj0dPhNWmyDkPARdPW6Y0ZwV5Hcvrjm3rH6sPfKWUMw85HfYnjn4nH6sgvPsT6KdThsqpZwYTjCEQLGCpyw9Uz4Bmy-bIi4WUvYETgN-TLwGUv3En1mzPHmsrjf1)表

- 队列：也是一种运算受限的线性表。它只允许在标的一端进行插入，而在另一端进行删除。队列亦称：先进先出[FIFO](https://www.baidu.com/s?wd=FIFO&tn=44039180_cpr&fenlei=mv6quAkxTZn0IZRqIHckPjm4nH00T1Y4rj0dPhNWmyDkPARdPW6Y0ZwV5Hcvrjm3rH6sPfKWUMw85HfYnjn4nH6sgvPsT6KdThsqpZwYTjCEQLGCpyw9Uz4Bmy-bIi4WUvYETgN-TLwGUv3En1mzPHmsrjf1)表

而栈就像管道里放箱子，后放的在上边，所以后进先出。

队列是先进先出：就像一条路，有一个入口和一个出口，先进去的就可以先出去。

栈只能从头部取数据，也就最先放入的需要遍历整个栈 最后才能取出来，而且在遍历数据的时候还得为数据开辟临时空间，队列则不同，它基于地址指针进行遍历，而且可以从头或尾部开始遍历，速度快很多

## IIFE

IIFE（立即调用函数表达式）是一个在定义时就会立即执行的 JavaScript 函数。好处：表达式中的变量不能从外部访问。

```js
(function () {
  statements
})();
```

## use strict 模式

 use strict 现在用得不是特别多，其实根据字面意思也能知道它其实是要去我们用严格的行为模式来写代码执行代码。"use strict" 是在ECMAScript5 中新增的一个声明，但它不是一条语句，是一个字面量表达式。可以在脚本或函数的头部添加 use strict 来声明。

例子：

- 例如不允许使用未声明的变量
- 不能使用 eval 、arguments 当变量名
- 函数的参数不能同名

作用：

- 消除代码运行的一些不安全、不严谨的地方，以及减少怪异行为，保证运行的安全
- 为下一代 js 做准备，为什么这么说呢，严格模式新增了一些保留关键字像 interface package

## arguments 及用法

- arguments 是一个类数组对象，代表传给一个 function 的参数列表。相关问题：[为什么 JS 的 arguments 没有被设计成数组](https://stackoverflow.com/questions/3242485/why-isnt-a-functions-arguments-object-an-array-in-javascript)
- 伪数组：
  - 没有数组 Array.prototype 的属性值，类型是 Object，而数组类型是 Array
  - 数组是基于索引的实现，length 会自动更新，而对象是键值对；
  - 使用对象可以创建伪数组，伪数组可以正常使用数组的大部分方法；

## 函数的形参个数

- `length`是函数对象的一个属性值，指该函数期望传入的参数数量，即形参的个数
- 形参的数量不包括剩余参数个数，以及仅包括第一个具有默认值之前的参数个数
- `console.log(((...args) => {}).length);`

## 原型及原型链

原型及原型链主要涉及到这三个名词 __proto__、prototype、 constructor：

1. __proto__、 constructor属性是对象所独有的，prototype属性是函数独有的；
2. __proto__属性是从一个对象指向另一个对象，即从一个对象指向该对象的原型对象（也可以理解为父对象），它的含义就是告诉我们一个对象的原型对象是谁；
3. constructor是从一个对象指向一个函数。指向的函数就是该对象的构造函数，谁构造了这个对象；
4. prototype 属性可以看成是一块特殊的存储空间，存储了供子类、父类使用的方法和属性；

每个js复杂数据类型（Object Function Array）等都会自带一个 prototype 对象，这个对象就是我们说的原型。

_proto_ 访问器属性，它指向原型对象，所以不管你是 Function 还是 Object 都会有__proto__属性，这些最终都指向了Object.protoype原型对象，它也是对象，它也有 _proto_ ，它的原型对象指向了 null。

在 JavaScript 中原型是一个 prototype 对象，用于表示类型之间的关系。

原型对象的用途是为每个实例对象存储共享的方法和属性，它仅仅是一个普通对象而已。并且所有的实例是共享同一个原型对象，因此有别于实例方法或属性，原型对象仅有一份。

JavaScript 万物都是对象，对象和对象之间也有关系，并不是孤立存在的。对象之间的继承关系，在 JavaScript 中是通过 prototype 对象指向父类对象，直到指向 Object 对象为止，这样就形成了一个原型指向的链条，专业术语称之为原型链。

```js
function Fn() {} // Fn为构造函数

var f1 = new Fn(); //f1是Fn构造函数创建出来的对象
```

构造函数的 prototype 属性值就是对象原型。（Fn.prototype就是对象的原型）

构造函数的 prototype 属性值的类型就是对象 typeof Fn.prototype===object.

对象原型中的 constructor 属性指向构造函数 （Fn.prototype.constructor===Fn)

对象的 **proto** 属性值就是对象的原型。（f1.__proto__就是对象原型）

## 函数 curry 化

常见的面试题，实现一个 curry add 函数，将 add(a + b) 转换为 add(a)(b)，既然需要返回继续可执行的函数，第一个想到的是闭包，把当前函数当结果返回就能继续执行了

```js
function add(a, b) {
 return a + b;
}

// curry 化
function curryAdd(a) {
 return function(b) {
  return a + b
 };
};

// 如果用箭头函数实现
const curryAdd = a => b => a + b
add(1,2)
curryAdd(1)(2) // 3

const curry = function (fn, ...a) {
  // 实参数量大于等于形参数量吗？
  return a.length >= fn.length ?
    // 如果大于返回执行结果
    fn(...a) :
    // 反之继续柯里化，递归，并将上一次的参数以及下次的参数继续传递下去
    (...b) => curry(fn, ...a, ...b);
};
const add = (a, b, c) => a + b + c;
// 将add加工成柯里化函数
const addCurry = curry(add);
console.log(addCurry(1, 2, 3));// 6
console.log(addCurry(1)(2)(3));// 6
console.log(addCurry(1, 2)(3));// 6
console.log(addCurry(1)(2, 3));// 6
```

## 继承的实现

- ES6 中引入了 class 关键字，class 可以通过 extends 关键字实现继承, class 关键字只是原型的语法糖，JavaScript 继承仍然是基于原型实现的。
- 原型链继承

```js
function Parent () {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName())
```

- 借用构造函数 使用 call

## 实现extends

```js
Object.defineProperty(Object.prototype,
  "extend",
  {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function(o){
      // 获取所有的自有属性
      var names = Object.getOwnPropertyNames(o);
      for(var i =0;i< names.length;i++){
          // 如果属性已存在则跳过
          if(names[i] in this) continue;
          // 获取该属性的属性描述符
          var desc = Object.getOwnPropertyDescriptor(o,names[i]);
          Object.defineProperty(this,names[i],desc)
      }
    }
  }            
)

var a = { item: 1}
Object.defineProperty(a,"item2",{
  writable: true,
  enumerable: false,
  configurable: true,
  value: 2
})
var b = {}
b.extend(a)
```

## 数据类型

常见的几种数据类型，按存储类型来分的话有 6 种：

基础类型

- 布尔类型
- null 类型
- undefined 类型
- number 数字类型
- 字符串

引用类型：

- 对象

## set 和 map 及对象区别

Set 对象是值的集合，Set 中的元素只会出现一次，即 Set 中的元素是唯一的。

```jsx
let mySet = new Set();
mySet.add(1) // Set [ 1 ]
mySet.has(1); // true
mySet.size // 1
```

- **WeakSet** 只能是对象的集合，而不能像 [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 那样，可以是任何类型的任意值。
- 内存中对原始对象的引用是弱引用，所以不可枚举的，弱引用。
- **Map** 对象保存键值对，并且能够记住键的原始插入顺序。任何值对象或者基本类型都可以作为一个键或一个值。Map 中的一个键只能出现一次；它在 Map 的集合中是独一无二的。

与 Object 的区别：

- Map 的键可以是任意值，但 Object 只能是 string 或者 symbol
- Map 有 size 属性，可以获取长度，object 只能自己计算
- Map 是 [可迭代的](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)的，所以可以直接被迭代，object 不可直接迭代，但可以使用 keys 或 entries方法
- 场景：
  - 针对于存在大量增删操作键值对情况的场景，使用 Map 更合适
  - Map 在存储大量数据的场景下表现更好，尤其是在 key 为未知状态，并且所有 key 和所有 value 分别为相同类型可迭代的情况下

## consturctor

- constructor 属性不影响任何 JavaScript 的内部属性。当我们 instanceof 检测对象的原型链，通常你是无法修改的，主要是为了把实例的构造器的原型对象暴露出来，比如你写了一个构造函数，别人使用的时候其实用的是实例化的对象，如果想扩展一下对象的话，就可以用实例 constructor.prototype 去修改或扩展原型对象

## 常见的类型检测

- typeof 返回一个字符串，优势就是检测一个未被声明的变量的时候，结果不会报错，会返回 ”undefined“，但它不能细分对象的类型。typeof NaN 是 “number”
- Object.prototype.toString.call()
- 判断 constructor 属性

## ****Object.prototype.toString.call() 原理****

**toString()** 方法转换为字符串的结果。[object, type] type 其实拿到的是 Symbol.toStringTag，是一个内置 symbol，它通常作为对象的属性键使用。其实 toString 是对象上的方法，每一个对象上都有这个方法，那就意味着数字、字符串和布尔值这些基本数据类型不能使用 toString()方法，但上例中的基本数据类型却是可以使用，这要归功于javascript中的包装类，即 Number、String 和 Boolean。原始值不能有属性和方法，当要使用 toString() 方法时，会先将原始值包装成对象再使用。

所有类都继承自 Object，按理来说输出结果应该都类似于 [object Object] 这样。不一样的原因是所有类在继承 Object的时候，改写了 toString() 方法。所以当我们想要判断数据类型时，必须使用 Object 上的**toString()**方法。

## 如何判断一个变量是否是数组

- Object.prototype.toString.call(arr))  //"[object Array]"
- constructor 是否是 Array，
- instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。但 instanceof 也不是特别可靠，例如多个窗口下不同frame下这个 instanceof 的指向不同
- instanceof 本质上是判断右边的构造函数的 prototype对象是否存在于左边的原型链上，是的话返回 true。所以不论数组、对象还是函数，instanceof Object 都返回 true
- isArray 方法

## 如何判断一个变量是否是函数

- typeof 会返回 function 字符串
- Object.prototype.toString.call() 返回 **[object Function]**
- 正则表达式匹配，匹配关键字 function 或箭头函数

## 如何判断一个变量是否是 promise

- 原型链是否有 then catch 方法

## var、const、let 对比

这里涉及到作用域、变量提升的问题，作用域本质上是指变量/函数可供访问的范围。

当在最外层函数的外部声明 var 变量时，作用域是全局的。这意味着在最外层函数的外部用 var 声明的任何变量都可以访问到。但当你在函数范围内申明变量时，外部的代码是无法访问到这个变量的。

var 的一个问题是变量被修改覆盖，举个简单的例子:

```js
var greeter = 'hello'
if (true) {
 var greeter = 'world'
}
console.log(greeter) // 这里会打印 world 替换成 let 后能解决这个问题

```

let 是块级作用域，块是由 {} 界定的代码块，大括号中有一个块。大括号内的任何内容都包含在一个块级作用域中，因为变量仅在其块级作用域内存在。

区别：

- var 申明的变量可以修改，也可以重复申明。
- let 申明的变量可以修改，但无法被重复申明
- 块级作用域，{} 里面 let 定义的变量，外部访问不到，类似于 for 循环里使用
- 变量提升也有一个区别
  - 用`var`声明的变量会被提升到其作用域的顶部，并使用 undefined 值对其进行初始化。
  - 用`let`声明的变量有暂时性死区，没有变量提升，不会对值进行初始化。访问的时候是直接 Reference Error

## foreach for() for in for of map 区别

- foreach 不返回值，结果是 undefined，会改变原来数组
- map 返回执行结果后的数组返回一个新数组
- for in 只要可迭代的就能使用，返回的index 下标，顺序有可能不准确，可以迭代 object
- for of 只要可迭代的，返回的是值，不能迭代 object

## 函数的防抖和节流

两个都是优化高频重复操作代码的一个方式，例如我们在使用浏览器的 resize scroll 等事件时，当用户短时间内触发这些事件时，绑定的回调函数会不断地被调用，就有两种优化策略 throttle 节流 和 debounce 防抖

- throttle n 秒内只运行一次，在 n 内重复触发，只有一次生效
- debounce n 秒后去执行该事件，若 n 秒内被重复触发，则重新计时

用发车的一个例子来描述这两种情况，如果每个乘客上车发一次车比较耗时：

- 节流：第一个乘客上车后开始计时，10 分钟准时发一次
- 防抖：第一个乘客上车，攒 10 分钟后开始发车，10 分钟内有人上车再开始重新计时

```js
// throttle 节流
const throttle = (fn, delay) => {
 let timer = null;
 return function (... args) {
  if (!timer) {
   timer = setTimeout(() => {
    fn.apply(this, args);
     timer = null;
   }, delay)
  }
 }
};

// debounce 防抖
function debounce(fn, delay) {
 let timer;
 return function() {
  let args = arguments;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
   fn.apply(this, args);
  }, delay)
 }
}
```

## requestAnimationFrame 优势

- 原理：window.requestAnimationFrame() 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画
- 最大的优势是由系统屏幕刷新率来决定回调函数的执行时机。这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。
- 使用 setTimeout 实现的动画，当页面被隐藏（隐藏的\<iframe>）或最小化（后台标签页）时，setTimeout 仍然在后台执行动画任务而且还浪费 CPU 资源和电池寿命。
- 函数节流：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次

## requestIdleCallback

window.requestIdleCallback() 方法使用插入一个函数，这个函数将在浏览器空闲时期被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间 timeout，则有可能为了在超时前执行函数而打乱执行顺序。

## 浅拷贝和深拷贝

浅拷贝：拷贝了赋值的引用地址，修改值会影响到原始值，拷贝的是对象的引用地址。指向的还是同一片空间。

深拷贝：拷贝所有的属性，地址也与原先的不同，修改不会影响到原始值

实现一个简单的深拷贝：

- JSON.stringify(obj) ⇒ JSON.parse() 例如遇到 function 和 symbol 时会被忽略
- Object.assgin({}, obj) 第一层上深拷贝，第二层浅拷贝
- 使用递归来实现

```js
function deepclone (obj) {
 let cloneObj = [].isArray(obj) ? [] : {};
 if (obj && typeof obj === 'object') {
  for (key in obj) {
   if (obj.hasOwnProperty(key)) {
    if (obj[key] && typeof obj[key] === 'object') {
     cloneObj[key] = deepclone(obj[key])
    } else {
     cloneObj[key] = obj[key]
    }
   }
  }
 }
 return cloneObj;
}
```

## new 具体做了什么，手动实现一个 new

使用 new 来新建一个构造函数或类得到对应实例，是非常普遍的操作了，ES5 中使用 function 构造函数，到 ES6 使用 class 都可以使用 new 来新建实例。

- new 一个构造函数，得到的实例继承了构造器的构造属性(this.name这些)以及原型上的属性
- 创建一个空的对象，将它的引用赋给 this，继承函数的原型，即设置该对象的 **proto**，该函数的原型对象 prototype 上
- 通过 this 将属性和方法添加到这个对象上，
- 最后返回 this 指向的新对象

```js
//定义的new方法
let newMethod = function (Parent, ...rest) {
  // 1.以构造器的 prototype 属性为原型，创建新对象；
  let child = Object.create(Parent.prototype);
  // 2.将 this 和调用参数传给构造器执行
  let result = Parent.apply(child, rest);
  // 3.如果构造器没有手动返回对象，则返回第一步的对象
  return typeof result  === 'object' ? result : child;
};
```

## this 指向问题

分严格模式和非严格模式及在指定的场景：

- 在函数中：
  - 严格模式是 undedined
  - 非严格模式 window
- 在对象中去调用一个方法
  - 严格模式和非严格模式下都是指向 obj 这个对象
  - 如果它是箭头函数，没有自己的 this，它的 this 是继承而来的，默认指向在定义它时所处的对象(宿主对象）
- call,apply,bind(ES5新增)绑定的,this 指的是绑定的对象

## 作用域及作用域链

js 的作用域分为：全局作用域、块级作用域、函数作用域。

全局作用域是指函数或者 {} 外面的执行环境，叫全局作用域，根据 js 执行环境不同，全局作用域不同。

在函数内部定义的变量，就是局部作用域。在函数作用域内，对外是封闭的，从外层作用域无法直接访问内部作用域，但是函数内部作用域可以访问外部的作用域。

作用域是分层的，子作用域可以访问父作用域，不能从父作用域引用子作用域中的变量；如果一个变量或者其他表达式不在当前的作用域，那么js 机制会继续沿着作用域链向上查找直到全局作用域（ Node中 的 global 或浏览器中的 window），如果找不到则表示变量不可用

## 变量提升

变量提升：

- 函数声明的变量提升优先级高于变量申明的提升
- 提升只是申明的提升，但变量赋值还是在原来的位置

## 宏任务和微任务

异步任务队列又分为微任务（micro task）队列和宏任务（macro task）队列；事件循环的过程中，执行栈在同步代码执行完成后。

- 优先检查微任务队列是否有任务需要执行，有，全部拿出来先执行，如果没有，再去宏任务队列检查是否有任务执行，如此往复。
- 微任务一般在当前循环就会优先执行，而宏任务会等到下一次循环。

常见的宏任务：

- setTimeout
- setInterval
- requestAnimationFrame

微任务：

- Promise.then
- Promise.catch
- MutationObserver
- process.netTick

## bind apply call 实现方式

为什么会存在这样的两个方法，主要是 js 存在定义时上下文、执行上下文以及上下文 context 可以改变的，换句话说其实上为了改变 this 的指向。

当一个对象没有某个方法的时候，但是其它对象有，我们就可以借助 call 或 apply 来实现用它对象上方法的调用。

```js
function Friut {}

Friut.prototype = {
 color: 'red',
 say: function () {
 console.log('color is:' + this.color)
 }
}

var apple = new Friut;
apple.say();

// 重新定义一个水果对象 banana，它没有say方法，可以使用apple的的say

var banana = {
 color: 'yellow'
}
apple.say.call(banana) // color is: yellow
```

bind，call 和 apply 的区别：

- 目的是一样的，只是接受参数形式不一样，call 需要把参数按顺序传递进去，但 apply 则是需要使用数组
- bind()方法也是用来改变 this 指向的，但不太一样的是返回的是对应的函数，而不是立即执行。bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind()方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

手动实现 call apply bind  [参考链接](https://juejin.cn/post/6859642206601347080)

```js
// call
Function.prototype.myCall = function(context) {
  if(typeof this !== 'function') {
    console.log('type error')
  }
  // 获取参数
  let args = [...arguments].slice(1);
  result = null
  context = context || window
  context.fn = this
  // 调用函数
  result = context.fn(...args);
  // 删除属性
  delete context.fn
  return result
}

// apply
Function.prototype.myApply = function (context) {
  if(typeof this !== 'function') {
    throw new TypeError('error')
  }
  let result = null
  context = context || window
  context.fn = this
  if (arguments[1]) {
    result = context.fn([...arguments[1]]) // 调用赋值的函数
  }
  delete context.fn
  return result
}

// bind
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  // 获取参数
  let args = [...arguments].slice(1)
  context.fn = this
  return function Fn() {
    return fn.apply(this instanceof Fn ? this : context, args.concat(...arguments))
  }
}
```

## 闭包

一句话解释闭包：闭包允许函数访问并操作函数外部的变量。要理解闭包，先理解 js 的变量作用域。

js 的变量作用域有两种，一种是全局变量，另一种是局部变量，函数内部可以读取到外部的全局变量，但函数外部无法读取内部的局部变量。那有没有什么办法可以访问到这个变量呢，有的，使用闭包。

- 保护函数的私有变量不受外部的干扰。形成不销毁的栈内存。
- 能保存值，把一些函数内的值保存下来。闭包可以实现方法和属性的私有化。

## 箭头函数和普通函数

```js
let sum = (num1, num2) => num1 + num2;
// 等同于
let sum = function(num1, num2) {
  return num1 + num2;
};
```

箭头函数是 es6 新语法，跟传统普通函数比有以下一些优势:

- 简洁更加清晰。
  - 例如当没有参数的时候，直接写空括号即可，如果一个参数也可以省去包裹的括号
  - 如果函数体只是返回一个对象或只有一句代码，可以省去函数体的大括号
- 最重要的其实是 this 指向问题，箭头函数不会创建自己的 this，所以它没有自己的 this 它只会从自己的作用域链的上一层继承 this，所以它的 this 捕获阶段是定义时确认的，而不是调用时。例如执行下面代码时分别输出不同的结果，普通函数执行时 this 指向传入的 obj，所以这里输出 id2，而 箭头函数的话是继承它定义时的一个全局变量的 this，也就是最外层的 id， 所以这里输出 id1。 除了没有 this，箭头函数也没有自己的 arguments 对象，但是可以通过剩余操作符 … 来输出参数列表。

```js
var id = 'id1';
var obj = {
  id: 'id2',
  a: function(){
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};

obj.a();    // 'id2'
obj.b();    // 'id1'
```

- .call() .apply().bind() 方法可以用来动态修改函数执行时 **this** 的指向，但在箭头函数里不起作用
- 箭头函数无法作为构造函数，原因是没有原型 prototype，无法链接到实例的原型链上，没有 super，箭头函数不能用作 Generator 函数，不能使用 yeild 关键字

## eventloop 事件循环

> JS 从诞生起就是一门单线程的非阻塞脚本语言

单线程意味着不管执行什么任务，当前都只有一个主线程在执行任务

但是要做到非阻塞的话，意味着例如在处理异步请求的时候不能卡在当前代码，代码继续往下执行，这时会 pending 这个异步任务，当它返回结果后再去执行注册的相应回调。

一般是在 栈里来执行方法，而堆用来存放一些较大的数据，像对象等。javascript 执行的时候会存放在内存的不同地方，使用栈 stack 和 堆 heap 来加于区分。

一个方法执行会向执行栈中加入这个方法的执行环境，在这个环境中也可以调用自己，当这个执行环境中的代码 执行完毕并返回结果后，js会退出这个执行环境并把这个执行环境销。

上面是同步代码，异步代码有一点不一样，因为异步代码不会立即返回结果，而是将这个事件挂起，这个时候就需要用到这个事件队列的机制，异步返回结果后，js 会把这个事件存放在与当前执行栈不一样的一个队列中，我们称之为事件队列，但被放入到队列的事件并不会立刻执行这个回调。而是等待当前执行栈所有任务执行完，主线程处于闲置状态时，再去查找队列里是否还有任务没有执行，有的话再把它拿出来放在执行栈中去执行，如此反复就形成了事件循环。

## 单行程

为什么 js 是单线程？一开始是主要在浏览器端来使用 js，需要保证程序执行的一致性。

## web worker

worker 线程的使用有一些注意点：

- 同源限制：分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。  
- 文件限制：为了安全，Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本必须来自网络，且需要与主线程的脚本同源。
- DOM操作限制：worker 线程在与主线程的 window 不同的另一个全局上下文中运行，其中无法读取主线程所在网页的 DOM 对象，也不能获取 document、window 等对象，但是可以获取 navigator、location(只读)、XMLHttpRequest、setTimeout 等浏览器API。
- 通信限制：worker 线程与主线程不在同一个上下文，不能直接通信，需要通过 postMessage 方法传递消息来通信。
- 脚本限制：worker 线程不能执行 alert、confirm，但可以使用 XMLHttpRequest  对象发出 ajax 请求。

场景：

- 加密数据：有些加解密的算法比较复杂，或者在加解密很多数据的时候，这会非常耗费计算资源，导致 UI 线程无响应，因此这是使用 Web Worker 的好时机，使用Worker 线程可以让用户更加无缝的操作 UI。
- 预取数据：有时候为了提升数据加载速度，可以提前使用 Worker 线程获取数据，因为 Worker 线程是可以是用 XMLHttpRequest 的。

## 解释一下 Mutation Observer api

Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。

可以理解为 DOM 发生变动就会触发 Mutation Observer 事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说，DOM 的变动立刻会触发相应的事件；Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。

通过传入一个函数来创建一个 MutationObserver 实例，每当有变化发生，这个函数将会被调用。函数的第一个参数是变动数组，每个变化都会提供它的类型和已经发生的变化的信息

这个被创建的对象有三个方法：

- observe — 启动监听
- disconnect — 用来停止观察
- takeRecords — 返用来清除变动记录，即不再处理未处理的变动。
- 实现一个发布订阅
- 实现一个观察者模式

## JS实现跨域

在前端领域中，跨域是指浏览器允许向服务器发送跨域请求，为什么有这个跨域，主要是同源策略。同源策略是浏览器的一个核心的安全策略，主要指"协议+域名+端口”三种需要相同，不同的话会被限制发请求、cookie 、localstorage 、dom等也无法读取

常见的跨域方式

- jsonp
的原理就是利用 **\<script>** 标签没有跨域限制，通过 script 标签 src 属性，发送带有 callback 参数的 GET 请求，服务端将接口返回数据拼凑到callback 函数中，返回给浏览器，浏览器解析执行。
- 跨域资源共享（CORS）（Cross-origin resource sharing）。 它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制。

浏览器将CORS跨域请求分为简单请求和非简单请求。

- 请求方式 head get post
- header 头 content-type限于 application/x-www-form-urlencoded、multipart/form-data、text/plain

简单请求里会新增加一个 Origin 字段。需要传递你接口的源的信息，后端判断是否同意这次请求，对应的相应头里也会返回 Access-Control 开头的字段，Access-Control-Allow-Origin。Allow-Credentials，默认是不带 cookie，如果需要带设置成 true

不是简单请求，会多发一个预请求，预检"请求用的请求方法是 OPTIONS，表示这个请求是用来询问的。请求头信息里面，关键字段是 Origin，表示请求来自哪个源。除了 Origin 字段，预检请求的头信息包括两个特殊字段：

- Access-Control-Request-Method
- Access-Control-Request-Headers
- Nginx代理跨域和nodejs中间件跨域原理都相似

## 事件冒泡捕获

两种实现，例如当中一个 div 元素当中有一个 p 子元素，如果两个元素都有一个 click 的处理函数，那么我们怎么才能知道哪一个函数会首先被触发呢？微软提出了名为事件冒泡 (event bubbling) 的事件流。事件冒泡可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到 document 对象。

## 什么是内存泄露，怎么监控内存泄露问题

我们知道如果需要执行代码，操作系统的运行时就需要开辟内存空间来运行，当运行完及时释放内存，如果有不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。

轻则影响程序的运行速率，重则容易造成程序崩溃。

说一下场景的容易引起内存泄露的场景

- 使用闭包

```js
var fn = (function(){      
  var a = '***';// 被闭包所引用，不会被回收 
  return function(){        
  console.log(a);     
  } 
})()
```

- 绑定事件时，dom已清除，但事件未清除导致
- 计时器未及时 clear
- 死循环调用

## jsb 实现原理

Web 端和 Native 可以类比于 Client/Server 模式，Web 端调用原生接口时就如同 Client 向 Server 端发送一个请求类似，JSB 在此充当类似于 HTTP 协议的角色，将 Native 与 JavaScript 的每次互相调用看做一次 RPC 调用。前端相当于 rpc 里的客户端，Native 相当于 rpc 里的服务端

实现 JSBridge 主要有两种：

- js 端调用 Native 有两种方法：
  - URL Schema 的拦截操作
  - 注入 api， App 将 Native 的相关接口注入到 JS 的 Context（window）的对象中，一般来说这个对象内的方法名与 Native 相关方法名是相同的，Web端就可以直接在全局 window 下使用这个暴露的全局JS对象，进而调用原生端的方法。
- native 调用js
  - 其中 Native 调用 Web 端是直接在 JS 的 Context 直接执行 JS 代码，只要 H5 将 JS 方法暴露在 Window 上给 Native 调用即可。

## 浮点运算不准确的问题

主要原因是转换成了二进制进行运算

```js
/**
 * 精确加法
 */
function add(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
```

## gc 回收机制

JavaScript 垃圾回收机制的原理说白了也就是定期找出那些不再用到的内存（变量），然后释放其内存。这里主要讲一下 v8 的 gc 回收算法，主要是两种：

- 标记清除算法

目前在 JavaScript引擎 里这种算法是最常用的，到目前为止的大多数浏览器的 JavaScript 引擎都在采用标记清除算法。此算法分为**标记**和**清除**两个阶段，这使得一位二进制位（0和1）就可以为其标记，非常简单。

标记清除算法有一个很大的缺点，就是在清除之后，剩余的对象内存位置是不变的，也会导致空闲内存空间是不连续的，出现了内存碎片并且由于剩余空闲内存不是一整块，它是由不同大小内存组成的内存列表，这牵扯出了内存分配的问题

- 引用计数算法

这其实是早先的一种垃圾回收算法，它把对象是否不再需要简化定义为对象有没有其他对象引用它。例如定义一个变量赋值时1，当它被另一个变量覆盖时，-1，当这个值的引用次数变为 0 的时候，说明没有变量在使用，清理掉内存

- 对比：
- 引用计数一刻就会被回收，所以它可以立即回收垃圾。那边是隔一段时间得执行一下gc程序去标记及清除
- 引用计数的存储的引用次数的这个值可能是很大的

## 前端模块化 CommonJS AMD CMD

- 模块化历史及雏形

```js
<script>
  // your code
</script>
```

- 分文件

```js
<script src="./a.js">
<script src="./b.js">
```

- 命名空间

```js
<script src="./a.js">
window.moduleA = {
  data: 'a',
  funA: () => {}
}
```

- IIFE

```js
(function () {
  let data = ‘a’
})()
```

- CMD、AMD 、ES6Moudle
  - CommonJS 模块规范，最早也是目前用的最多的，例如 node.js，主要的关键有两部分，模块化代码规范和模块加载器 loader：
    - 核心有 module.exports  require
    - 模块加载器由 Node.js 提供，放在浏览器端就不太合适
  - AMD
    - Asynchronous Module Definition，即异步模块定义规范。模块根据这个规范，在浏览器环境中会被异步加载
    - define 和 require
    - 由于没有得到浏览器的原生支持，AMD 规范需要由第三方的 loader 来实现，最经典的就是 [requireJS](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frequirejs%2Frequirejs)库
  - ESM ES6 Module 也被称作 ES Module(或 ESM)， 是由 ECMAScript 官方提出的模块化规范
- commonjs Node.js是commonJS规范的主要实践者，它有四个重要的环境变量为模块化的实现提供支持：module、exports、require、global, 模块文件都写在本地磁盘里，读取很快
- AMD 规范采用异步方式加载模块，模块的加载不影响它后面语句的运行
- AMD 先把要用的模块都在最前面申明，CMD 是在需要用的时候再申明并引入
- AMD 推崇依赖前置、提前执行，CMD 推崇依赖就近、延迟执行

## history路由和hash的区别

前端路由的核心：

1. 改变url且不让浏览器向服务器发起请求
2. 可以使用浏览器的前进，后退，跳转功能

hash：

在 url 中的 # 之后对应的是 hash 值, 其原理是通过 hashChange() 事件监听hash值的变化, 根据路由表对应的 hash 值来判断加载对应的路由加载对应的组件。

前端配置路由表, 不需要后端的参与，因为 hash 值变化不会向后端发请求，所以属于前端路由，兼容性好, 浏览器都能支持。

history 是 url 地址规范, 不需要#，包括 back,forward,go 三个方法，这种模式充分利用 history.pushState replaceStateAPI 来完成 URL 跳转而无须重新加载页面。

区别：hash 的传参是基于 url 的，如果要传递复杂的数据，会有体积的限制

## Vue 路由守卫执行流程

1. **beforeRouteLeave**: 路由组件的组件离开路由前钩子，可取消路由离开。
2. **beforeEach**: 路由全局前置守卫，可用于登录验证、全局路由 loading 等。
3. **beforeEnter**: 路由独享守卫
4. **beforeRouteEnter**: 路由组件的组件进入路由前钩子。
5. **beforeResolve**: 路由全局解析守卫
6. **afterEach**: 路由全局后置钩子
7. **beforeCreate**: 组件生命周期，不能访问 this。
8. **created**: 组件生命周期，可以访问 this，不能访问 dom。
9. **beforeMount** :组件生命周期
10. **deactivated**: 离开缓存组件a，或者触发 a 的 beforeDestroy 和 destroyed 组件销毁钩子。
11. **mounted**: 访问/操作 dom。
12. **activated**: 进入缓存组件，进入a的嵌套子组件(如果有的话)。

# Node.js

## Node.js 单线程实现高并发原理

1. Node.js 与操作系统交互，我们在 Javascript 中调用的方法，最终都会通过 process.binding 传递到 C/C++ 层面，最终由他们来执行真正的操作。Node.js 即这样与操作系统进行互动。

2、nodejs 所谓的单线程，只是主线程是单线程，所有的网络请求或者异步任务都交给了内部的线程池去实现，本身只负责不断的往返调度，由事件循环不断驱动事件执行。

3、Nodejs 之所以单线程可以处理[高并发](https://so.csdn.net/so/search?q=%E9%AB%98%E5%B9%B6%E5%8F%91&spm=1001.2101.3001.7020)的原因，得益于 libuv 层的事件循环机制，和底层线程池实现。

# TS

## 为什么用 TS

- TypeScript 提供比 JavaScript 更好的错误检查。这是因为 TypeScript 使用静态类型系统，这意味着在执行代码之前会检查变量的类型。
- 类型系统和编译器有助于组织代码并及早发现错误。
- Ts 是 Js 的超集，并不是重新发明了 JS，TS诞生的原因 JS 缺乏严格的类型及类型检查的，例如 1+’1’ = “11” 1+null =1，TS 给检查并且提示
- TS 核心是Type，所以除了常规的像 Number String Boolean Null Undefined 之外它提供更多了类型，例如 Array Void Tuples Never unknown

## 什么是泛型及它应用

型是静态类型语言的基本特征，允许将类型作为参数传递给另一个类型、函数、或者其他结构。TypeScript 支持泛型作为将类型安全引入组件的一种方式。这些组件接受参数和返回值，其类型将是不确定的，直到它在代码中被使用。

泛型的语法为 <T>，其中 T 表示传入的类型。在这种情况下，T 和函数参数的工作方式相同，其作为将在创建结构实例时声明的类型的占位符。因此，尖括号内指定的泛型类型也称为泛型类型参数。泛型的定义可以有多个泛型类型采参数，例如：<T, K, Z>。

例如当我们想实现一个传入什么类型就得到什么类型的函数时，就可以用到泛型，有没有一种方法在调用的时候再指定类型呢。

将泛型与函数一起使用的最常见场景之一就是，当有一些不容易为所有的用例定义类型时，为了使该函数适用于更多情况，就可以使用泛型来定义

```js
function identity<T>(value: T): T {
  return value;
}
```

[https://nodelover.gitbook.io/typescript/fan-xing#le-jie-object.create](https://nodelover.gitbook.io/typescript/fan-xing#le-jie-object.create)

## any unkown

二者都是可以赋值给任意类型的， **any** 会绕过类型检查，直接可用，而 **unkonwn** 则必须要在判断完它是什么类型之后才能继续用

## 关键字Exclude、Omit、Merge、Intersection、Overwrite的作用

常用的一些关键字

**Exclude<T, U>** 从Y中排出可以分配给U的元素.

**Omit<T, K>** 忽略T中的某些属性.

**Merge<O1, O2>** 将两个对象的属性合并.

**Compute<A & B>** 将交叉类型合并.

**Intersection<T, U>** 取T的属性，此属性同样哦存在于U.

**Overwrite<T, U>** 用U的属性覆盖T的相同属性.

## 什么是抗变、双变、协变和逆变

Covariant 协变，ts 对象兼容性是协变，父类<=子类是可以的，子类 <= 父类错误。
Contravariant 逆变，禁用 **strictFunctionTypes** 编译，函数参数类型都是逆变的，父类 <= 子类，是错误。子类 <= 父类，是可以的。
Bivariant 双向协变，函数参数的类型默认是双向协变的。父类 <= 子类，是可以的。子类 <= 父类，是可以的。

## type 和 interface 的区别

相同点：

1. 都可以描述对象或者函数
2. 都允许扩展（extends）

不同点：

1. 类型别名可以为任何类型引入名称，例如基本类型，联合类型等。
2. 类型别名不支持继承
3. 类型别名不会创建一个类型的名字
4. 类型别名无法被实现 implements，而接口可以被派生类实现
5. 类型别名重名会抛出错误，接口重名是会产生合并

## extends和 implements

implements一般是实现接口。extends 是继承类。

共同点

1. 都可以实现 **类与类** 之间的关联
2. 对于抽象类中的抽象方法都必须要实现

下面罗列它俩的不同点

1. extends 可以实现 **接口与接口**，**接口与类** 的继承，而 implements 不能实现接口与接口，接口与类的实现
2. implements 可以实现 **类继承接口**，而 extends 不能实现类继承接口
3. 使用 implements 时，需要定义或实现所有属性和方法，而 extends 只需要重新定义或者实现方法即可，对于属性来说，是可以直接继承，无需单独定义

implements 实现，一个新的类，从父类或者接口实现所有的属性和方法，同时可以重写属性和方法，包含一些新的功能
extends 继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法

## Typescript如何实现一个函数的重载

- 函数重载的意义在于能够让你知道传入不同的参数得到不同的结果，如果你的参数是一致的那就没有必要使用重载的意义。
- 在 ts 出现之前，函数可以接受可变数量的参数，不同类型的参数，甚至可以根据你调用函数的方式返回不同的类型，但是在 ts 里面这样写就有问题。所有有了这个重载，怎么定义呢？
- 定义函数重载需要定义重载签名和一个实现签名。
- 其中重载签名定义函数的形参和返回类型，没有函数体。

```js
type Types = number | string;
// 重载签名
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: string, y: number): string;
function add(x: number, y: string): string;
function add(x: Types, y: Types) {
  if (typeof x === 'string' || typeof y === 'string') {
      return x.toString() + y.toString();
  }
  return x + y;
}
const result = add('hearts', ' spades');
result.split(' ');
```

## 枚举和常量枚举

常量枚举只能使用常量枚举表达式并且不同于常规的枚举，他们在编译阶段会被删除。常量枚举成员在使用的地方会被内联起来，之所以真可以这么做是因为，常量枚举不允许包含计算成员。

# http相关

## Content-type的几种常见类型

- application/json 消息主体是序列化后的 JSON 字符串
- application/x-www-form-urlencoded  表单默认提交方式，key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。
- multipart/form-data  Http协议最开始是不支持文件上传的，增了一个Content-Type 类型用于发送文件，这就是我们今天熟知的 multipart/form-data。multipart 是“多部分”的意思，意味着 body 中的数据允许有多部分组成，可以同时传递文本数据和二进制数据。
- text/plain 纯文本格式，body 的内容就只是文本

## http 和 https 的区别，https 的加密原理

https 多了一个sercurty 安全，唯一的区别就是使用了 TSL(ssl) 来加密普通的http 请求和响应，并且对请求和响应进行数字前面，所以更安全。

## OSI 七层协议

OSI是一个开放性的通信系统互连参考模型

应用层：为程序提供网络服务，例如 HTTP，FTP，SMTP

表示层：这一层主要是数据格式化和加密解密

会话层：建立维护管理会话连接(在tcp/ip协议组合并一个应用层)

传输层： 建立管理端到端的连接 TCP、UDP

网络层：IP 寻址和路由选择

数据链路：控制网络层和物理层通信的

物理层：比特流传输 例如光缆和电缆等设备组网

## 三次握手

TCP 是一种面向连接的单播协议，在发送数据前，通信双方必须在彼此间建立一条连接。所谓的“连接”，其实是客户端和服务器的内存里保存的一份关于对方的信息，如ip地址、端口号等。

- **第一次握手** 客户端向服务端发送一个 SYN 报文（SYN = 1）
- **第二次握手**服务器收到客户端的 SYN 报文之后，会发送 SYN 报文作为应答（SYN = 1），并且指定自己的初始化序列号 ISN
- **三次握手**客户端收到服务器端响应的 SYN 报文之后，会发送一个 ACK 报文（：确认号。希望收到的下一个数据的第一个字节的序号），也是一样把服务器的 ISN + 1 作为 ack 的值，表示已经收到了服务端发来的的 SYN 报文服务器收到 ACK 报文之后，也处于 Establised 状态，至此，双方建立起了 TCP 连接。

## 四次挥手

这是由于 TCP 的**半关闭**（half-close）特性造成的，TCP 提供了连接的一端在结束它的发送后还能接收来自另一端数据的能力。

**第一次挥手**：客户端发送一个 FIN 报文（请求连接终止：FIN = 1），报文中会指定一个序列号 seq = u。并停止再发送数据，主动关闭 TCP 连接。

**第二次挥手** 服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序号值 +1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于 **CLOSE_WAIT** 状态。

**第三次挥手 ：**如果服务端也想断开连接了（没有要向客户端发出的数据），和客户端的第一次挥手一样，发送 FIN 报文，且指定一个序列号。此时服务端处于 LAST_ACK 的状态，等待客户端的确认

**第四次挥手**客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答（ack = w+1），且把服务端的序列值 +1 作为自己 ACK 报文的序号值

通俗的来说，两次握手就可以释放一端到另一端的 TCP 连接，完全释放连接一共需要四次握手

## 301和302的区别

- 核心的区别是永久性重定向和临时重定向，301 表示这个资源以及被永久删除了，而 302 表示旧的资源还在，目前只是临时从 A 跳转到了新的 B 地址。
- 两个都是做页面重定向，告诉浏览器访问当前页面的时候需要跳转到新的页面上，同时告诉浏览器的搜索引擎如何正确处理页面收录、索引等。301 页面会删除失效的 url 收录、索引，并替换为新的 url。而 302 会抓取新的内容但是保留旧的网址。

## 浏览器资源加载的优先级

资源的优先级被分为 5 级： Highest 、 Medium 、 Low 、 Lowest 、 Idle ;

浏览器首先会按照资源默认的优先级确定加载顺序：

1. html 、 css 、 font 这三种类型的资源优先级最高；
2. 然后是 preload 资源（通过 link 标签 rel=“preload" 标签预加载）、 script 、 xhr 请求；
3. 接着是图片、语音、视频；
4. 最低的是 prefetch 预读取的资源。

## websocket 协议

是一种网络传输协议，位于 OSI 模型的应用层。可在单个 TCP 连接上进行全双工通信，能更好的节省服务器资源和带宽并达到实时通迅，客户端和服务器只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输。使用场景如弹幕、协同编辑等

## XSS攻击和CSRF攻击

xss：跨域脚本攻击，原来就叫 CSS，主要是把恶意的脚本代码HTMLJS代码植入到网页中，当用户浏览时执行代码，可能获取到cookie、会话劫持、钓鱼网站等。

主要分两种：反射型，将恶意脚本附加到 url 参数中，这种危害性较小

持久性：恶意代码上传或存储至漏洞服务器中，用户浏览时就执行，例如获取cookie信息

防范：

- 前端输入过滤，限制格式长度等
- 后端的输入过滤，对于一些敏感字符 javascript alert sql
- 输出编码，在防止xss攻击上能起很大的作用，htmlencode < ⇒ &lt & ⇒ &amp
- 白名单黑名单

CSRF：跨站请求伪造。原理或本质就是让用户在已登录的站点上执行非本意的操作，

攻击者首先盗用了你的身份，然后以你的名义进行某些非法操作，web 中用户身份认证验证的一个漏洞：简单的身份验证仅仅能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。

两个必要条件：

- 登录受信任站点 A，并在本地生成 Cookie。
- 在不登出A的情况下，訪问危急站点 B。

常见的例如：img src 属性能够以 get 方式发送请求第三方资源，浏览器会带上你的 cookie

- 验证来源的 referer， 判断请求来源是否来自于可信页面，从而确保用户的请求是从可信网站发起的。
- 使用验证码、token

## Session 和 Cookie 的区别

- Cookie 是客户端保存用户信息的一种机制，服务端下发，客户端下次请求时携带
- Session 代表服务器和客户端一次会话的过程，
- cookie 目的可以跟踪会话，也可以保存用户喜好或者保存用户名密码，session 用来跟踪会话
- 有效期不同，Cookie 可设置为长时间保持，比如默认登录功能功能，Session 一般有效时间较短，客户端关闭或者 Session 超时都会失效

## http1 和 http2 的区别

- HTTP/1.1，使用基于文本格式，HTTP/2使用二进制格式，只有 0 和 1 的组合，协议解析实现方便且健壮
- 从HTTP/1.0 到 HTTP/2，都是利用 TCP 作为底层协议进行通信的。
- HTTP/1.1，引进了长连接(keep-alive)，减少了建立和关闭连接的消耗和延迟。
- HTTP/2，引入了多路复用：连接共享，提高了连接的利用率，降低延迟。
- HTTP/1.1 使用文本的形式传输消息头，HTTP/1.1 不会压缩请求头字段和响应头字段，从而产生不必要的网络流量。HTTP/2 主要基于 SPDY 协议，通过对HTTP 头字段进行[首部压缩](https://info.support.huawei.com/info-finder/encyclopedia/zh/HTTP--2.html#section26294157125)
、对数据传输采用[多路复用](https://info.support.huawei.com/info-finder/encyclopedia/zh/HTTP--2.html#section14159830131219)和增加[服务器推送](https://info.support.huawei.com/info-finder/encyclopedia/zh/HTTP--2.html#section106861538121216)等举措，来减少网络延迟，提高客户端的页面加载速度。

# 框架

## Vue

响应式更新流程图

![](https://assets.wuxinhua.com/blog/assets/interview/vue-watcher.png)

## Vue 的生命周期

![](https://assets.wuxinhua.com/blog/assets/interview/vue.png)

created

- 完成数据观测，属性与方法的运算，watch、event 事件回调的配置
- 可调用 methods 中的方法，访问和修改data数据触发响应式渲染 dom，可通过 computed 和 watch 完成数据计算

mounted

- 已完成 DOM 的挂载与渲染，此刻打印 vm.$e ，发现之前的挂载点及内容已被替换成新的DOM

## React virtual dom

virtual DOM 是一种编程理念（数据驱动视图），将 ui 虚拟 dom 保持到内存中，并且通过某些库渲染成真实的 dom，这个过程又叫做协调。

1. 我们将 render 产生的 Virtual DOM简称 ‘Vdom’
2. 通常调用 setState 方法触发 Vdom 更新
3. Virtual DOM Diff的层次

- 层级级别的比较
- 元素级别的比较

包括:

- createChild
- moveChild
- removeChild

实际上它只是一层对真实 DOM 的抽象，以 JavaScript 对象 (VNode 节点) 作为基础的树，用对象的属性来描述节点，最终可以通过一系列操作使这棵树映射到真实环境上

在 Javascript 对象中，虚拟 DOM 表现为一个 Object 对象。并且最少包含标签名 (tag)、属性 (attrs) 和子元素对象 (children) 三个属性，不同框架对这三个属性的名命可能会有差别

react 函数式组件思想 当你 setstate 就会遍历 diff 当前组件所有的子节点子组件, 这种方式开销是很大的, 所以 react 16 采用了 fiber 链表代替之前的树，可以中断的，分片的在浏览器空闲时候执行

vue 组件响应式思想 采用代理监听数据，我在某个组件里修改数据，就会明确知道那个组件产生了变化，只用 diff 这个组件就可以了

## react diff算法

- React 将 Virtual DOM 树转换为 Actual DOM 的最少操作过程称为调和（Reconciliation）
- 将 **O(n^3)**复杂度的问题转换成 **O(n)**复杂度的问题。
  - • Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计
  - 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
  - 对于同一层级的一组子节点，它们可以通过 UUID（key）进行区分。
  - React 分别对 Tree Diff、Component Diff、Element Diff 进行算法优化，例如树状结构跨层级变动时，并不移动而是，删除从新创建
  - diff 只对同一个父元素的同级子元素进行对比，根据type和key相同，则视为同一个元素

## computed 和 Watch区别

- 相同点：他们两者都是观察页面数据变化的。
- 不同点：computed 只有当依赖的数据变化时才会计算, 当数据没有变化时, 它会读取缓存数据。 watch 每次都需要执行函数。
- watch 更适用于数据变化时的异步操作。
- watch 支持异步代码而 computed 不支持。

## nextTick  的实现

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM，所以放在 Vue.nextTick() 回调函数中的执行。**nextTick** 本质是一种优化策略

我们可以理解成，Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue 将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。

Vue 是异步执行 dom 更新的，一旦观察到数据变化，Vue 就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个 watcher 被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和 DOm 操作。

## New vue 实例过程

- new Vue 的时候调用会调用 _init 方法
  - 定义 $set、$get 、$delete、$watch 等方法
  - 定义 $on、$off、$emit、$off 等事件
  - 定义 _update、$forceUpdate、$destroy 生命周期
- 调用 $mount 进行页面的挂载
- 挂载的时候主要是通过 mountComponent 方法
- 定义 updateComponent 更新函数
- 执行 render 生成虚拟 DOM
- _update 将虚拟 DOM 生成真实 DOM 结构，并且渲染到页面中

## v-if 和 v-show

控制手段不同编译过程不同编译条件不同:

控制手段：v-show 隐藏则是为该元素添加 css display:none，dom 元素依旧还在。v-if 显示隐藏是将 dom 元素整个添加或删除

编译过程：切换过程中合适地销毁和重建内部的事件监听和子组件；v-show 只是简单的基于 css 切换

原理：设置 display 属性，另一个是根据条件值判断生成 DOM

## styles scoped

表现的话就是组件样式互相隔离，样式私有化，不污染全局的作用；

Scope CSS 的本质是基于 HTML 和 CSS 属性选择器，即分别给 HTML 标签和 CSS 选择器添加 data-v-xxx；

具体来说，它是 通过 vue-loader 实现 的，实现过程大致分 3 步：

- 首先 vue-loader 会解析 .vue 组件，提取出 template、script、style 对应的代码块；
- 然后构造组件实例，在组件实例的选项上绑定 ScopedId；
- 最后对 style 的 CSS 代码进行编译转化，应用 ScopedId 生成选择器的属性；

## keep-alive

**keepalive** 可以接收3个属性做为参数进行匹配对应的组件进行缓存:

- include 包含的组件(可以为字符串，数组，以及正则表达式，只有匹配的组件会被缓存)
- exclude 排除的组件(以为字符串，数组，以及正则表达式，任何匹配的组件都不会被缓存)
- max 缓存组件的最大值(类型为字符或者数字，可以控制缓存组件的个数)

## vue 数据绑定原理

v2 核心：Object.defineProperty() 对属性的读取、修改进行拦截（数据劫持）

问题：例如遇到数组对象时，直接通过下标修改数组，界面会不会自动更新？

# React

## react hook 为什么得放在最上面

因为 Hook 的每一次渲染都按照同样的顺序被调用，主要是为保证在多次的 useState 和 useEffect 调用之间保持 Hook 状态的正确。详见 <https://overreacted.io/zh-hans/why-do-hooks-rely-on-call-order/>

## React fiber 原理

用 jsx 写 react 组件，render() 输出虚拟 dom（通过 babel 插件），虚拟 dom 转为 DOM，再在 DOM 上注册事件，事件触发 setState()修改数据，在每次调用 setState 方法时，React 会自动执行 render 方法来更新虚拟 dom，如果组件已经被渲染，那么还会更新到 DOM 中去。

js执行会占据主线程时间较长，会导致页面响应度变差，使得动画、手势交互等事件产生卡顿。

Fiber 之前的架构是同步更新，遍历，从根组件开始到子节点

React 在 V16 之前会面临的主要性能问题是：当组件树很庞大时，更新状态可能造成页面卡顿，根本原因在于——更新流程是 【同步、不可中断的】

- react 的组件设计，如果你的一个组件加载或者更新时，带动 200 个组件更新，那么它会等这 200 个组件更新完再让出进程，如果这个时候用户有交互，是没有反应的（如果说 200 个组件需要 200 毫秒，这 200 毫秒内交互无效），为了提高用户体验
- 把可中断的工作拆分成小任务
- 增量渲染（把渲染任务拆分成块，匀到多帧）渲染任务拆分之后，每次只做一小段，做完一段就把时间控制权交还给主线程，而不像之前长时间占用
- 支持 **render()** 返回多个元素，更好地支持 error boundary

## vue v3 Proxy

用于定义基本操作的自定义行为，说白了 **Proxy** 用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等），用到了Reflect 也就是反射对象

对比：

- Proxy 比 defineProperty 能观察的类型更多一点
- 对象上定义新属性时，Proxy 可以监听到，Object.defineProperty 监听不到
- 数组新增删除修改时，Proxy 可以监听到，Object.defineProperty 监听不到
- Proxy 有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的
- Proxy 有一定的兼容问题，proxy 不兼容ie，也没有 polyfill

## useEffect 与 useLayoutEffect

- useEffect 不会 block 浏览器渲染，而 useLayoutEffect 会。
- useEffect 会在浏览器渲染结束后执行，useLayoutEffect 则是在 DOM 更新完成后，浏览器绘制之前执行。

原因是 useEffect 是在浏览器绘制之后执行的，所以方块一开始就在最左边，于是我们看到了方块移动的动画。然而 useLayoutEffect 是在绘制之前执行的，会阻塞页面的绘制，所以页面会在 useLayoutEffect 里面的代码执行结束后才去继续绘制，于是方块就直接出现在了右边

## react 的 shouldcomponentupdate

- **shouldComponentUpdate** 方法接收两个传参：(nextProps, nextState)，分别表示变化后的  props（组件的参数） 和 state（组件的状态）；
- 这个方法一般是在子组件里来设置使用，例如父组件状态更新了，但子组件其实 props 没变化，但也会因为父组件的更新而跟着更新
- 组件的首次渲染或者调用 forceUpdate() 方法时**不会**触发用 shouldComponentUpdate 方法
- pureComponent 相比于 React.Component 内置了 shouldComponentUpdate 方法，它会同时对 props 和 state 的变化值进行浅比较，如果没有变化则跳过重渲染。

## React.memo、useMemo 和 useCallback

memo 默认情况下对负责对象做浅层比较，如果想控制对比过程，可以在第二个参数位置传入方法自己对比 props(prevProps, nextProps)

useCallback：

通过 useCallback 获得一个记忆后的函数，避免函数组件在每次渲染的时候如果有传递函数的话，重新渲染子组件。用来做性能优化。

useMemo：

记忆组件，和 useCallback 类似，不同的是：useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回给你

## React hooks 优势

- 代码可读性更强，原本同一块功能的代码逻辑被拆分在了不同的生命周期函数中，容易使开发者不利于维护和迭代，通过 React Hooks 可以将功能代码聚合，方便阅读维护
- 不再需要去处理复杂的 this指向问题，绑定事件

# 其它

## webpack loader plugin的区别

- loader 处理文件转换，webpack 默认只支持 js json 两种格式的文件的加载处理，它是一个转换器，将A文件进行编译成 B 文件，比如：将 A.less 转换为 A.css，单纯的文件转换过程。
- plugins 能够被用于执行更广泛的任务比如打包优化、压缩、针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务

## tree shaking原理

- ES6 的 import 语法可以完美使用 tree shaking，因为可以在代码不运行的情况下就能分析出不需要的代码。
  - ES6 Module 引入进行静态分析，故而编译的时候正确判断到底加载了那些模块
  - 静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码
- 核心就是去除 dead code
  - 不可达代码
  - 执行结果并用不到
  - 某个变量只有写，但没有读
- 步骤
  - Make 阶段，收集导出变量并记录到模块依赖图 ModuleGraph 变量中。
  - Seal 阶段，遍历 ModuleGraph 标记模块导出变量有没有被使用。
  - 生成产物时，若变量没有被其他模块使用时则删除对应的导出语句。

## 什么是 ast及如何写一个 babel plugin

AST 是对源代码的抽象语法结构的树状表现形式。

分词：将整个的代码字符串，分割成语法单元数组（token）。 JS中的语法单元（token）指标识符（function，return），运算符，括号，数字，字符串等能解析的最小单元。

语法分析：语义分析的目的是将分词得到的语法单元进行一个整体的组合，分析确定语法单元之间的关系。简单来说，语义分析可以理解成对语句（statement）和表达式（expression）的识别。

## chrome 插件的通信

![chrome extension](https://assets.wuxinhua.com/blog/assets/interview/chrome.png)

## 事务

**原子性(Atomicity)**：

事务是数据库的逻辑工作单位，它对数据库的修改要么全部执行，要么全部不执行。

**一致性(Consistemcy)**：

事务前后，数据库的状态都满足所有的完整性约束。

**隔离性(Isolation)**：

并发执行的事务是隔离的，一个不影响一个。如果有两个事务，运行在相同的时间内，执行相同的功能，事务的隔离性将确保每一事务在系统中认为只有该事务在使用系统。这种属性有时称为串行化，为了防止事务操作间的混淆，必须串行化或序列化请求，使得在同一时间仅有一个请求用于同一数据。通过设置数据库的隔离级别，可以达到不同的隔离效果。

**持久性(Durability)**：

在事务完成以后，该事务所对数据库所作的更改便持久的保存在数据库之中，并不会被回滚。

4个级别：

序列化，系统中所有的事务以串行地方式逐个执行，所以能避免所有数据不一致情况。

Repeatable read（可重复读）一个事务一旦开始，事务过程中所读取的所有数据不允许被其他事务修改。

Read Committed（已提交读）一个事务能读取到其他事务提交过(Committed)的数据。

Read Uncommitted（未提交读）一个事务能读取到其他事务修改过，但是还没有提交的(Uncommitted)的数据。

## 如何实现单点登录

- 共享 session 在 redis 上，登录验证状态放在 session 中，把用户信息顶域名 cookie 下发，子域名能共享 cookie 去验证一些登录态
- 使用 cas token

## 线程和进程区别

- 进程是对运行时程序的封装，是系统进行资源调度和分配的的基本单位
- 一个线程只能属于一个进程，而一个进程可以有多个线程，但至少有一个线程
- 进程在执行过程中拥有独立的内存单元，而多个线程共享进程的内存

## 对称加密和非对称加密

- 对称加密加密与解密使用的是同样的密钥，所以速度快，但由于需要将密钥在网络传输，所以安全性不高。
- 而非对称加密使用一对秘钥，一个用来加密，一个用来解密，而且公钥是公开的，秘钥是自己保存的，不需要像对称加密那样在通信之前要先同步秘钥。非对称加密与，其安全性更好。

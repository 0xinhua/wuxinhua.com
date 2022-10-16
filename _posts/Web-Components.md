---
title: '初探 Web Components'
date: '2020-08-02 16:58:01'
tags: Web Components
---

2019 年第一次了解到 [Web Components](https://www.webcomponents.org/) 这个概念，直到最近才开始尝试使用，这篇将简单介绍 Web Components，了解它的标准，解决什么问题以及它的优势，它提供的接口 API、兼容程度、如何使用它写一个简单的组件等。

## 什么是 Web Components

随着前端框架的流行，组件化开发已经趋于常态，我们通常会把功能通用的模块抽取然后封装成单个组件，这样使用和维护起来都会变得更加简单。但组件也受限于框架，例如一旦离开框架本身，组件就无法使用了，那有没有跨越框架范围的技术构建通用的组件呢？有的，就是今天要介绍的主角 Web Components。

> Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.

Web Components 是一套 Web API，允许你创建能在 Web 页面和应用中使用的自定义、可重用、封装的 HTML 标签。总体上来说 Web Components 是 “通过一种标准化的非侵入的方式封装一个组件”。Web Components 的概念最早由 Alex Russell 在2011年的 Fronteers大会上首次提出，2013年 Google 发布了 [Polymer](https://www.polymer-project.org/) 框架，是基于 [Web Components API](https://www.polymer-project.org/) 的实现，来推动 Web Components 的标准化。 2014 年的时候 Chrome 发布了早期的 v0 级别的组件规范，目前已更新到 v1 版本，被各大浏览器接受并支持。

## 特点

- 标准化  

    w3c 也不断在为 web 标准规范做努力，其中就包括 Web Components, 这套 API 规范成为标准被绝大多数浏览器支持后，我们就能开发更通用的组件了，不用花时间在框架的选择上，而是更聚焦在组件本身，通过 HTML、CSS、JS 来构建原生组件将会成为未来的前端标准。
- 非侵入式  

    侵入性是指设计时的组件耦合太强了，引入这个组件导致其它代码或者设计要做相应的更改来适应新组件，而非侵入式的组件没有过多的依赖，方便迁移至其他地方。Web Components 组件能够很好的组织好自身的 HTML 结构、 CSS 样式、JS 代码，而且不会干扰到页面中的其他代码。
- 不依赖第三方库或框架  

    Web Components 可以在不需要引入第三方的库或者框架的情况下通过浏览器的这套 API 创建可复用的组件，也可以和任意与 HTML 交互的 JavaScript 库和框架搭配使用。

## API

- ***HTML templates***

HTML 内的 DOM 模板，在 template 元素内声明，内联样式 style 需要放置在它的内部，模板技术引入了两个重要的元素 template 和 slot ，template 提供模板的功能，slot 则被用来提供一个占位符hao，使 template 更灵活。

template 标签本质上合 HTML 内置标签是一样的，但在 template 标签被激活前：

  - 标签不会被渲染，标签的内容也是会被隐藏 ，页面上看不到标签展示效果
  - 模板里的内容不会有副作用，例如  script 标签里不的脚本不会执行，图片不会加载，
视频不会播放
  - 基本上可以放置于任何节点上，例如 header、body 等；激活一个 template 最简单的方式是对它的内容做个深拷贝，然后再插入节点中，举个 🌰：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h3>Web Components</h3>
    <h3> example - 1</h3>
    <template id="mytemplate">
      <img src="" alt="image">
      <div class="comment"></div>
      <script>
        console.log('template')
      </script>
    </template>
</body>
<script src="./index.js"></script>
</html>

```

```javascript
// index.js
var t = document.querySelector('#mytemplate');
t.content.querySelector('img').src = 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7b5bd4445364f3887f7b708c812ca48~tplv-k3u1fbpfcp-zoom-1.image';
var clone = document.importNode(t.content, true);
document.body.appendChild(clone);
```

用户信息卡片及 Slot 的实例：

```html
<!-- html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h3>Web Components</h3>
    <template id="profile-tpl">
        <div class="profile-name"></div>
        <img src="" class="profile-img">
        <style>
            :host {
              display: block;
              border: 1px solid red;
            }
            img {
                max-width: 100px;
                border-radius: 50%;
                border: 1px solid seagreen;
            }
         </style>
    </template>
</body>
<script src="./index.js"></script>
</html>
```

```javascript
// index.js
let template =  document.querySelector('#profile-tpl');
template.content.querySelector('.profile-img').src = 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bec4077911a44e789fa163ac05b3a18~tplv-k3u1fbpfcp-zoom-1.image';
template.content.querySelector('.profile-name').textContent = 'bytedance';
document.body.appendChild(template.content);
```

```html
<!-- slot例子 -->
<p><slot name="my-tpl">default text</slot></p>
<my-template>
    <span slot="my-tpl">Let's have some different text!</span>
</my-template>
```

- ***Custom Elements***

    - 创建自定义 HTML 标签
    - 创建自定义 class 类
    - 使用生命周期的 Methods 方法

定义新的元素标签，可以被解析成 HTML。定义时首先需要声明一个类，这个类需要继承 HTMLElement 类，这样能够使用组件的一些生命周期回调函数，这些函数帮助我们增强组件的能力。总结一下要点：

  - 新的定制类需继承 HTMLElement
  - 当元素被挂载后会调用 connectedCallback 方法，代码中的this指向定制元素，这样我们可以在这个回调中使用 this.innerHtml 方法设置定制元素里的内容
  - 定制元素带来的问题是你在里面定义的样式可能会影响到外部的dom元素样式，如何进行隔离内，这是下面要介绍的一个 api  Shaodow DOM 。

生命周期回调函数：
  - connectedCallback 元素被插入DOM 时触发
  - disconnectedCallback 元素从DOM 被移除时时触发
  - adoptedCallback 被移到新的文档中时触发
  - attributeChangedCallback 元素的属性被添加、移除、更新、取代时触发

执行顺序(这里 attributeChangedCallback 在前面是因为需要调整配置，应该在插入 DOM 之前完成)：

```javascript
constructor -> attributeChangedCallback -> connectedCallback
```

用自定义标签的方式来实现一个用户卡片(user-card)的例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h3>Web Components</h3>
    <user-card></user-card>
    <!-- <foo-bar></foo-bar> -->
</body>
<script src="./index.js"></script>
</html>

```

```javascript
// index.js
class UserCard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = 'user-card';
  }
}
window.customElements.define('user-card', UserCard);
```

- ***Shadow DOM***

这里的 Shaodow DOM 不应该跟常用的几个框架中的 Virtual DOM 混淆（Virtual DOM 主要是做性能层的优化），Shadow DOM 让我们能够创建一套完全独立于其它元素的 DOM 树，也叫“影子DOM”,有了它可以保证当前的这个组件是个具备独立功能的组件，与其它DOM元素互不干扰。跟 iframe 相似，是一个独立是沙盒，但它没有自己的 window，有一个轻量级 document，另外 shadowRoot 对象不支持所有的 DOM API ，支持主流的 getElementById、querySelector 和 querySelectorAll 等方法


![](https://assets.wuxinhua.com//blog/assets/web-components/shadow-tree.png)

![](https://assets.wuxinhua.com//blog/assets/web-components/shadow-dom.png)

结构：
- Shadow host： 一个常规 DOM 节点，Shadow DOM 会被附加到这个节点上。
- Shadow tree：Shadow DOM 内部的 DOM 树。
- Shadow boundary：Shadow DOM 结束的地方，也是常规 DOM 开始的地方。
- Shadow root: Shadow tree 的根节点。

Element.attachShadow() 方法会将 shadow DOM 树附加给特定元素，并返回它的 ShadowRoot。该方法只有一个对象类型，一个 Key 值 mode，可以设置为 open 或 closed 来指定该模式的打开和关闭。open 状态表示可以通过 JavaScript 来获取 Shadow DOM，close 状态 shadowRoot 将会返回 null。

```javascript
let shadow = elementRef.attachShadow({mode: 'open'});
let myShadowDom = myCustomElem.shadowRoot;
```

例子：

```javascript
window.customElements.define('user-card', UserCard);
class FooBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.innerHTML = 'foo-bar';
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <p>I'm in the Shadow Root!</p>
    `;
  }
}
window.customElements.define('foo-bar', FooBar);

```

并非所有 HTML 元素都可以开启 Shadow DOM，例如用 img 这样的非容器素作为 Shadow Host 不合理，而且会报错。目前支持的元素： article、 body、h1 ~ h6、header、 p、 aside、 div、aside、nav、span、section、main、footer、blockquote。

```javascript
document.createElement('img').attachShadow({mode: 'open'});    
// => DOMException
```

另一个标准 HTML Imports (例如使用 <link rel="import" href="myfile.html >)，已废弃不再详述。

## 兼容性

2016 年 Safari 开始支持 Custom Elements 和 Shadow Dom，Firefox 则是在 2017 年跟进，目前各 API 兼容性如下：

![](https://assets.wuxinhua.com//blog/assets/web-components/web-components-api.png)

![](https://assets.wuxinhua.com//blog/assets/web-components/custom-elements.png)

![](https://assets.wuxinhua.com//blog/assets/web-components/html-templates.png)

![](https://assets.wuxinhua.com//blog/assets/web-components/shadow-dom-can-i-use.png)

## 其它

- 使用 define 定义自定义标签的时候，为了避免与原有标签冲突，不能使用单个单词强制使用短横线连接
- 定制元素标签不能是自闭合的，因为 HTML 只允许一部分元素可以自闭合。<user-card></user-card>
- 自定义标签的样式可以直接在全局定义，也可以把组件的样式应该与代码封装在一起，例如在 template 定义 style

```css
<style>
    user-card {
        border: 1px solid red;
    }
</style>

```

- 与目前其它框架的比较

  - Web Component 是 W3C 专门为组件化创建的标准，API 也是底层浏览器的 api，不存在跨框架无法使用的问题。
  - 而且从浏览器层面解决了一些作用域的问题，使用 Shadow DOM 封装样式,而且不需要再打包构建能直接跑在浏览器上，也实现了用 JavaScript 来写 JavaScript，用 CSS 来写 CSS ，用 HTML 来写 HTML，React 是用 JS 来写 CSS。
  - 标准的支持推动进展较慢，2013年提出 v0 版本，2016 年推进到 v1 版本，存在兼容性问题，坑还比较多
  - 主流三大框架 Vue 、React 、Angular 均支持使用 Web components，目前也有一些库或工具实现讲框架的组件转成通用的 Web components 组件，以及例如 [hybird](https://github.com/hybridsjs/hybrids) 这样的 UI 库能用 functional 方式来编写 Web components 组件

- 组件传值监听和事件绑定：
    - 如何传值及监听值的变化
    - 通过 DOM 属性，使用 getAttribute 能拿到组件设置的值，同时利用 setAttribute 也能更新组件的属性值
    - 同时利用 observedAttributes 及生命周期函数 attributeChangedCallback 完成对属性值的更新

```javascript
class CustomComponent extends HTMLElement {
  static get observedAttributes() {
    return ["attributesName"];
  }  attributeChangedCallback(name, oldValue, newValue) {
    // 当属性值变更时做一些操作
  }
}
```

- 事件绑定的方式比较简单，直接在自定义标签内添加事件监听即可，如果需要传递函数和内部触发函数，监听绑定 click 事件传入回调函数，在自定义组件内 dispatchEvent 触发点击事件

```javascript
class Button extends HTMLElement { 
    this.$btn = this._shadowRoot.querySelector('button');
    this.$btn.addEventListener('click', () => {}
}
```

```javascript
class ClickCounter extends HTMLElement {
  constructor() {
    super();
    
    this._timesClicked = 0;
    
    var button = document.createElement("button");
    button.textContent = "Click me";
    button.onclick = (evt) => {
      this._timesClicked++;
      this.dispatchEvent(new CustomEvent("clicked", {
        detail: this._timesClicked
      }));
    };
    
    this.append(button);
  }
};
customElements.define("click-counter", ClickCounter);
var counter = document.querySelector("click-counter");
counter.addEventListener("clicked", (evt) => {
  console.log(evt.detail);
});

```

## 附

- https://github.com/webcomponents
- https://www.webcomponents.org/
- [精读《Web Components 的困境》](https://github.com/dt-fe/weekly/issues/15)
- https://dmitriid.com/blog/2017/03/the-broken-promise-of-web-components/
- https://robdodson.me/regarding-the-broken-promise-of-web-components/
- [shadow dom open vs close](https://blog.revillweb.com/open-vs-closed-shadow-dom-9f3d7427d1af)
- [从HTML Components的衰落看Web Components的危机 ](https://github.com/xufei/blog/issues/3)
- https://zh-hans.reactjs.org/docs/web-components.html


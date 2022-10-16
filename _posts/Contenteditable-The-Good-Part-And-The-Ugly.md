---
title: 'contenteditable 踩坑记'
excerpt: ''
coverImage:
date: '2018-07-05 23:33:21'

---

## 关于富文本编辑器
知乎上有个问题[为什么都说富文本编辑器是天坑？](https://www.zhihu.com/question/38699645),很早就听说了实现一个富文本编辑器需要填很多的坑，“有幸”接触到富文本编辑器，记录下遇到的一些问题及解决方案.

富文本编辑器的实现一般有两种：
1. 通过设置[contenteditable](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable)属性，使得在HTML中的任何元素都可以编辑，加上使用一些JavaScript事件处理逻辑，可以将你的网页转换为完整且快速的富文本编辑器。
2. 基于[Draft.js](https://draftjs.org/)实现编辑器功能，Draft.js是Facebook开源的开发React富文本编辑器开发框架。
而使用contenteditable无疑是最简单的一种方式，但是 DOM 的处理存在很多兼容性的问题，并且处理起来异常麻烦，😢详情查看[为什么说contenteditable很糟糕](https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480)，而这里主要记录使用contenteditable属性实现一个简单编辑器过程的一些坑。

之所以不直接使用`input`、`textarea`，是因为考虑到实现以下功能`contenteditable`更具有优势：
1. 输入框的高度无限制，并且自适应
2. 对一些特定文本进行样式高亮调整等自定义工具栏
3. 指定位置插入图片、表情等内容
4. 所见即所得（What you see is what you get）

伴随而来的就是一堆需要解决的问题(这只是其中的很小的一部分...)：
1. placeholder提示语
2. 获取输入框的内容
3. 光标位置
4. 使用delete缩进时，插入多余的dom节点

## placeholder提示语
`input`和`textarea`能轻松实现`placeholder`提示语的效果，但作用于`contenteditable`的元素，`placeholder`不起作用，可以通过`css`的`:empty`解决：  

```css
[contenteditable=true]:empty::before {
  content: attr(placeholder);
}
```
## 获取输入框的内容

可以利用`innerHTML`、`innerText`、`textContent`获取输入框的内容，详细对比介绍一下这几个方法：

[innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML) 返回或修改标签之间的内容，包括标签和文本信息，基本上所有浏览器都支持。 

[innerText]() 打印标签之间的纯文本信息，会将标签过滤掉,此功能最初由Internet Explorer引入，在Firefox上存在兼容问题。

### innerText !== textContent

`innerText`和`textContent`均能获取标签的内容，但二者存在差别，使用的时候还需注意浏览器兼容性：
1. textContent会获取style元素里的文本（若有script元素也是这样），而innerText不会
2. textContent会保留空行、空格与换行符
3. innerText并不是标准，而textContent更早被纳入标准中
4. innerText会忽略`display: none`标签内的内容，textContent则不会
5. 性能上textContent > innerText

具体查看下面的例子:

<iframe height='333' scrolling='no' title='innerHTML vs innerText vs TextContent' src='//codepen.io/amnEs1a/embed/ajmYXo/?height=333&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/amnEs1a/pen/ajmYXo/'>innerHTML vs innerText vs TextContent</a> by kevin (<a href='https://codepen.io/amnEs1a'>@amnEs1a</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 光标的位置

首先遇到的一个问题是利用上述方法实现`placeholder`后，输入框的光标在Firefox中的位置会比其它浏览器要高一截。  
图片例子来自[medium-editor](https://github.com/yabwe/medium-editor/issues/234):
![](https://cloud.githubusercontent.com/assets/104138/11337627/a7ef8274-91ee-11e5-8cc7-a999e9b4f19b.gif)
请在friefox浏览器下查看这个bug[https://jsfiddle.net/wooLksnx/](https://jsfiddle.net/wooLksnx/)

尝试了很多方法来解决均无果，最终发现默认放置 <\br> 标签后，光标位置正常了。

```html
<div class="rich-editor" data-placeholder="Placeholder Text"><br></div>
```
而我的另一个需求是需要准确地在光标位置的后面插入指定的内容，获取光标位置，然后插入内容。

```JavaScript
// getSelection、createRange兼容
export function isSupportRange () {
  return typeof document.createRange === 'function' || typeof window.getSelection === 'function'
}

// 获取光标位置
export function getCurrentRange () {
  let range = null
  let selection = null
  if (isSupportRange()) {
    selection = document.getSelection()
    if (selection.getRangeAt && selection.rangeCount) {
      range = document.getSelection().getRangeAt(0)
    }
  } else {
    range = document.selection.createRange()
  }
  return range
}
```

```JavaScript
// 插入内容
export function insertHtmlAfterRange (html) {
  let selection = null
  let range = null
  if (isSupportRange()) {
    // IE > 9 and 其它浏览器
    selection = document.getSelection()
    if (selection.getRangeAt && selection.rangeCount) {
      let fragment, node, lastNode
      range = selection.getRangeAt(0)
      range.deleteContents()
      let el = document.createElement('span')
      el.innerHTML = html
      // 创建空文档对象,IE > 8支持documentFragment
      fragment = document.createDocumentFragment()

      while ((node = el.firstChild)) {
        lastNode = fragment.appendChild(node)
      }
      range.insertNode(fragment)
    
      if (lastNode) {
        range = range.cloneRange()
        range.setStartAfter(lastNode)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  } else if (document.selection && document.selection.type != 'Control') {
    // IE < 9
    document.selection.createRange().pasteHTML(html)
  }
}

```

### 使用**delete**缩进时，Chrome插入多余的dom节点
发现的另一个`bug`是在编辑器进行删除缩进操作时，浏览器会在`dom`节点中插入节点。

例如：

```HTML
<div contenteditable="true">
  <div>这是第一行的内容</div>
  <div>这是第二行的内容</div>
</div>
```
当年使用`delete`进行缩进成一行时，其它浏览器正常显示：

```HTML
<div contenteditable="true">
  <div>这是第一行的内容这是第二行的内容</div>
</div>
```
而Chrome会插入span标签，并且带上继承的一些style属性，font-family, font-size, line-height等：


```HTML
<div contenteditable="true">
  <div>这是第一行的内容<span style="line-height: 1.5em">这是第二行的内容<span></div>
</div>
```

解决方案是使用方法动态移除这些多余的标签，如[http://jsfiddle.net/THPmr/6/](http://jsfiddle.net/THPmr/6/)。


参考的一些资料：  
1. [INNERTEXT VS. TEXTCONTENT](http://kellegous.com/j/2013/02/27/innertext-vs-textcontent/)
1. [Why ContentEditable is Terrible](https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480)
1. [Working around Chrome's contenteditable span bug](https://www.neotericdesign.com/articles/2013/3/working-around-chrome-s-contenteditable-span-bug)

几款不错的开源富文本编辑器：   

1. [medium-editor](https://github.com/yabwe/medium-editor)
2. [wangEditor —— 轻量级web富文本框](https://github.com/wangfupeng1988/wangEditor) 

以上。
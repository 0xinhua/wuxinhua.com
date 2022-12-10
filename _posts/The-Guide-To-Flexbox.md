---
title: 'Flexbox布局完全指南'
excerpt: '本篇适用于所有刚接触到 flexbox 布局的同学，也适用于那些想更近一步了解 flexbox 的人，我将尽可能详细地用文字、图片、代码介绍、学习 flexbox 布局'
date: '2019-02-25 18:47:45'
tags:
---

![](https://assets.wuxinhua.com//blog/assets/flexbox/flex.png)

## 为什么写这样一篇文章

欢迎来到 flexbox 的世界。我很乐意接受新的思想、观念，或者尝试新的工具，虽然这个过程并不是很顺利。使用 flexbox 对页面进行布局的时间不是很长，发现它真的很好用，日常使用还不够熟练，还得经常翻阮老师的[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)，于是索性自己总结一篇，一边在实际应用中使用flexbox，一边学习基础理论知识。本篇适用于所有刚接触到 flexbox 布局的同学，也适用于那些想更近一步了解 flexbox 的人，我将尽可能详细地用文字、图片、代码介绍、学习 flexbox 布局。

## 一些基础知识

### display 属性

可以说`display`是开发者最为熟悉的一个属性，也是最为重要的一个属性，它指定元素的显示行为，准备得来说是规定了外部和内部显示属性的规则，来看 MDN 上对它的定义：  

> display CSS 属性指定了元素的显示类型，它包含两类基础特征，用于指定元素怎样生成盒模型——外部显示类型定义了元素怎样参与流式布局的处理，内部显示类型定义了元素内子元素的布局方式。

例如我们常用的一些：

```css
display: none;
display: block;
display: inline;
display: inline-block;
dispaly: table;
display: flex;
display: grid;

```
事实上每一个HTML标签都有一个默认的 `display` 属性值，例如：`<div>`、`<p>`、`<ul>` 等默认是`block` 块状元素，而 `span`、`img`、`svg` 等默认 `inline` 行内元素，二者比较大的区别：

block元素：
1. block 块状元素会占满整行的空间；
2. 常规布局中块级是基于竖直方向的，即紧接着的另一个块级元素会另起一行排列；
3. 能被设置 width、height 宽高；
4. 能作为其它块状元素、行内元素的父标签；

inline元素：
1. inline 行内元素则刚好相反，只占用它们需要的空间;
2. 内联基于水平方向，行内元素一个紧挨着另一个；
3. 不能被设置 width、height 宽高；
4. 只能作为行内元素的父标签；

### BFC与FFC

flexbox 布局重新定义了格式化上下文，这套规则叫 `FFC(Flex Formatting Contexts),Formatting context` 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)
FFC类似于 BFC(block formatting context)，BFC对于前端开发来说一个必须了解掌握的概念，这里只做简单描述：

BFC(block formatting context"块级格式化上下文")

1. 内部的块盒子会在垂直方向，一个接一个的布局；
2. box垂直方向的距离由margin决定，两个相邻的box margin会重叠；
3. BFC是一个隔离的独立容器，容器里的子元素不会影响到外面的元素，反之亦然；
4. 计算BFC的高度时，浮动元素也参与计算；

FFC(Flex Formatting Contexts"自适应格式化上下文")

display 值为 flex 或 inline-flex 的元素会变成一个 flex 容器，内部元素变成子项目。容器是一个相对独立的渲染区域，会按照自适应渲染规则来布局。

## flex基本概念

### 什么是flexbox

### flex容器

flexbox 主要由 flex 容器和 flex 子项目组成，对应的有分别作用于这两者的一些属性；想要使用flex布局，得先指定一个容器，这样容器内的元素就能使用flex来进行布局，容器有两个取值 flex 和 inline-flex, 简单地来说，如果你的容器是一个块级元素，可以使用 `flex`，而行内元素则可以使用 `inline-flex`，值得注意的是二者均能将容器实现flex布局，不同的地方在用 `flex` 将会使容器变为块级元素，而 `inline-flex` 使容器变成行内元素。

```css
.container {
  display: flex | inline-flex;
}
```

### 子项

有了容器相应的也就有了容器内的`item`子项，后续会逐个介绍子项的一些属性：order flex-grow flex-shrink flex-basis flex align-self 等。

## flex 属性

### # flex-direction

`flex-direction` 属性控制Flex项目沿着主轴（Main Axis）、侧轴（Cross-Axis）的排列方向，在flex 世界中存在两个主轴：Main-Axis（主轴） 和 Cross-Axis（侧轴）它有以下选项：

```css
flex-direction: row(默认) | row-reverse | column | column-reverse

```
`row` flex容器的主轴与文本方向相同，以行（水平）方向排列:
![](https://assets.wuxinhua.com//blog/assets/flexbox/flex-direction-row.png)
`column` 以列（垂直）方向排列:  

![](https://assets.wuxinhua.com//blog/assets/flexbox/flex-direction-column.png)
而 `row-reverse`和`column-reverse` 分别是行列的反向，如下图所示:  

![](https://assets.wuxinhua.com//blog/assets/flexbox/flex-direction-row-reverse.png)
![](https://assets.wuxinhua.com//blog/assets/flexbox/flex-direction-column-reverse.png)

### # flex-wrap

```css
flex-wrap: wrap(默认) | nowrap | wrap-reverse
```
决定 flex项目在容器内是否不换行排列，`nowrap` 默认是项目不进行换行:

![](https://assets.wuxinhua.com//blog/assets/flexbox/flex-wrap-nowrap.png)

当 flex 容器无法在一行内容纳所有的 flex 项目时会进行换行:

![](https://assets.wuxinhua.com//blog/assets/flexbox/flex-wrap-wrap.png)

wrap-reverse 同样是多行排列，只是方向是相反的: 

![](https://assets.wuxinhua.com//blog/assets/flexbox/flex-wrap-wrap-reverse.png)

### # flex-flow

`flex-flow` 是一个 flex-direction 及 Flex-wrap 组合简写。默认值为：row nowrap，例如：

```css
flex-flow: row wrap;
// 等同于
flex-direction: row
flex-wrap: wrap
```

### # justify-content

`justify-content` 定义了项目在主轴上的对齐方式。取值分别是：flex-start（左对齐）、 flex-end（右对齐）、center（居中）、 space-between（两端对齐）、space-around（均分间距，间距两侧对齐）、space-evenly（均分间距）均匀排列每个元素，每个元素之间的间隔相等

```css

justify-content: flex-start | flex-end | center | space-between | space-around

```
justify-content: flex-start 起始处左对齐
![](https://assets.wuxinhua.com/blog/assets/flexbox/justify-content-flex-start.png)  

justify-content: center 居中对齐
![](https://assets.wuxinhua.com/blog/assets/flexbox/justify-content-center.png)


justify-content: center 右对齐  
![](https://assets.wuxinhua.com/blog/assets/flexbox/justify-content-flex-end.png)

justify-content: space-between 两端对齐
![](https://assets.wuxinhua.com/blog/assets/flexbox/justify-content-space-between.png)  

justify-content: space-between 间隔相等 
![](https://assets.wuxinhua.com/blog/assets/flexbox/justify-content-space-around.png)  


### # align-items

`align-items` 定义项目在交叉轴方向上的对齐方式

flex-start：项目元素向侧轴起点对齐、flex-end：元素向侧轴终点对齐。

```csss
align-items: stretch | flex-start | flex-end | center | baseline;
```

flex-start：交叉轴的起点对齐  
flex-end：交叉轴的终点对齐  
center：交叉轴的中点对齐  
baseline: 项目基线对齐。  
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度

以上几个都是设置在容器上的一些属性，接下来看下项目上可设置的属性：

```css
order
flex-grow
flex-shrink
flex-basis
flex
align-self
```
### # order

`order`定义项目在容器里的排列顺序，默认为 0，数字越小，排得越前


如何控制容器内的“剩余空间”，这里需要使用到三个很重要的属性：
flex-basis、flex-grow、flex-shrink

### # flex-basis

这个属性日常用得比较少，其实就是 width 属性的替代品，并且优先级 flex-basis > width，即在分配空间前会预留出 flex-basis 的空间，它的默认值是 aotu，即项目本来的大小。

### # flex-grow

`flex-grow` 能够控制项目在容器中所占空间的大小，它接受一个数字值，默认为0。如果其它项目flex-grow 设置为1，其中一个子元素的值是2，在空间允许的条件下它将占用前者两倍的空间。

### # flex-shrink

`flex-shrink` 前面的grow是扩大，对应的shrink是缩小，即如果容器空间不足，项目将缩小宽度来适应容器，该属性定义了项目的缩小比例，默认为 1，为0 表示不减少，值越大缩小得就越厉害，

### # flex

`flex` 属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。

### # align-self

`align-self` 允许单个项目和其它项目有不一样的align对齐方式，默认值为auto，表示继承父元素的align-items属性。可选的属性值即align-items属性值：

```
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

(#待更新)

### 附录

参考学习的一些资料：

1、[理解Flexbox：你需要知道的一切](https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)  
2、[flexbox](https://www.w3cplus.com/blog/tags/157.html)  
3、[flexboxfroggy一款练习flexbox的小游戏](https://flexboxfroggy.com/)  
4、[display MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display)  
5、[写给自己看的display: flex布局教程](https://www.zhangxinxu.com/wordpress/2018/10/display-flex-css3-css/)  
6、[The Flexbox Guide](https://flaviocopes.com/flexbox/)
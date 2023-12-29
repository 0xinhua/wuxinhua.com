---
title: 'SVG动画实践'
excerpt: '利用SVG可以做非常多炫酷的动画，结合HTML5、CSS3，SVG就变得更加强大;本篇是SVG实践总结，主要包含以下方面的内容'
date: '2018-01-20 11:13:03'
tags: SVG
---

SVG算不上是一种新技术，早在2001年的时候，已经出台了相应的规范，它是一种使用XML描述2D图形的语言，利用SVG可以做非常多炫酷的动画，结合HTML5、CSS3，SVG就变得更加强大;本篇是SVG实践总结，主要包含以下方面的内容：  

1. 关于SVG
2. SVG的视窗和坐标体系
3. SVG 实践
4. SVG 动画
5. 附录  

#### 关于SVG

SVG是"Scalable Vector Graphics"的简称，中文翻译成“可缩放矢量图形”，从字面意义上有两层意思：可缩放+矢量图，SVG是一种新的描述图像的方式，在这之前，我们用的较多的是以*.jpg、*.gif、*.png等后缀的图像，这类图像统称为位图，使用一个个像素点来描述图像，所以也叫点阵图；位图的缩放会出现失真的情况，当放大到一定程度会呈现出类似于马赛克的状态，而矢量图是使用点和线来描绘图形，缩放对矢量图的清晰度没有影响；类似于 HTML，SVG 也是使用元素、属性、和样式来构建文档，也存在兼容的问题，浏览器支持情况如下图所示，SVG提供了很全的元素来供我们使用，例如`<circle>`、 `<ellipse>`、`<polyline>`、`<path>`....依次代表创建圆、椭圆、曲线、路径等，其中`path`是最强大的一个标签，没有之一，文章的后面会再次提到。
![SVG](https://assets.wuxinhua.com/caniusesvg.png)
SVG 的优势：

1. SVG是可伸缩的，并且不依赖分辨率；
2. 与JPEG和GIF图像比起来，体积更小；
3. 纯粹的XML；
4. 多种方式嵌入到网页中；
5. 用于查看和打印高保真文档；

#### SVG的坐标体系  

在进行SVG开发之前，由于不熟悉SVG的viewport、viewBox、坐标系等概念，饶了一些弯路，先熟悉一下viewBox视窗、坐标这几个概念：  

##### viewport

浏览器也有一个viewport，SVG的viewport与之类似，不同的是SVG这个窗口是可以修改的，“视窗”定义了我们以多大的区域来绘制SVG，这个概念类似于Canvas的画布，可以通过width和height来定义viewport,例如：  

```html
<!-- the viewport 大小为 500px 500px -->
<svg width="500" height="500">
    <!-- SVG content -->
</svg>
```

视窗可以指定具体的单位，如果没有给定，默认使用“px”单位，支持以下单位：px, %, pc, pt, mm, cm, in, ex, em, 不支持rem、vh、vw等单位。

###### 坐标系

SVG的坐标系和标准的笛卡尔直角坐标系还有点区别，svg坐标系的原点(0,0)位于左上角XY轴交叉点，X轴向右为正方向，向下为Y轴的正方向。

##### viewBox  

viewBox顾名思意“视区盒子”，viewBox和viewport有点让人傻傻分不清楚，其实viewBox是在viewport外存在的另一个坐标体系，用来辅助定义SVG的可视范围，我的理解是类似于使用截屏软件时，viewBox即截图框区域大小，我们可以移动这个框来选择截取位置，既能截全屏，也可以截取特定区域；当没有定义viewBox时，viewBox默认为viewport的大小，viewBox定义四个坐标，分别是：x  y  width  height，x:左上角横坐标，y:左上角纵坐标，width:宽度，height:高度，通过下面的代码来查看viewBox起的作用：  

```html
<!-- the viewport 大小为 300px 300px -->
<svg class="circle-chart" width="300" height="300"  xmlns="http://www.w3.org/2000/svg">
  <circle class="pie" stroke="#4285f4" stroke-width="20" stroke-dasharray="400,0" stroke-linecap="round" fill="none" cx="0" cy="0" r="63.66197723675813" />
</svg>
```

viewport的宽高均为300，定义一个圆心坐标为（0.0），周长为400的圆，那么圆半径 r = 400 / 2 * Math.PI = 63.66197723675813，圆的边宽度为30，即图中蓝色部分，在没有设置viewBox值的情况下，SVG的视区大小默认为viewport大小，由于坐标原点在左上角，所以我们只看到了圆环的右下1 / 4部分(图中#1所示)，如果想看到整个圆环，那么需要将viewBox视角往左上角方向移动，移动的距离为： r + stroke-width / 2 = 73.66197723675813的距离，如代码例子#2所示：
 > viewBox="-73.66197723675813 -73.66197723675813 300 300"

但这并不是我想要的，我需要将圆环放置在视图的中心位置，那么viewBox的x、y坐标均为-150即可(如代码例子#3所示)  
> viewBox="-150 -150 300 300"  

#### PreserveAspectRatio属性  

如果viewport和viewBox的宽高比不相同，你需要自己来指定如何在SVG阅读器（如浏览器）中显示SVG图像，你可以在SVG中使用preserveAspectRatio属性来指定，preserveAspetRation属性指出了如何缩放及如果对齐viewBox到viewport上,defer参数是可选值，它仅仅在image元素上应用preserveAspectRatio属性时才使用。preserveAspectRatio的align参数是否强制进行均匀的缩放,如果align设置为none，图形会被缩放以适应viewport大小，而不会管它的宽高比。可以将它想象为CSS中的background-position属性,viewBox就好像是背景图像，使用不同的align值就好比在viewport中使用不同的background-position值来定位viewBox一样，
> preserveAspectRatio = defer? align meetOrSlice

align有以下9种取值：  
**xMinYMin**：viewBox的<min-x>对齐viewport的最小X值，min-y对齐viewport的最小Y值。  
**xMinYMid**：viewBox的<min-x>对齐viewport的最小X值，viewBox的Y轴中点对齐viewport的Y轴中点。  
**xMinYMax**：viewBox的<min-x>对齐viewport的最小X值，min-y+<height>对齐viewport的最大Y值。  
**xMidYMin**：viewBox的X轴中点对齐viewport的X轴中点，min-y对齐viewport的最小Y值。  
**xMidYMid（默认值）**：viewBox的X轴中点对齐viewport的X轴中点，viewBox的Y轴中点对齐viewport的Y轴中点。  
**xMidYMax**：viewBox的X轴中点对齐viewport的X轴中点，min-y+<height>对齐viewport的最大Y值。  
**xMaxYMin**：viewBox的<min-x>+<width>对齐viewportX轴的最大值，min-y对齐viewport的最小Y值。  
**xMaxYMid**：viewBox的<min-x>+<width>对齐viewportX轴的最大值，viewBox的Y轴中点对齐viewport的Y轴中点。  
**xMaxYMax**：viewBox的<min-x>+<width>对齐viewportX轴的最大值，min-y+<height>对齐viewport的最大Y值。  

#### SVG实践

##### 利用SVG实现一个环形图表

给定数据，利用SVG实现一个类似甜甜圈🍩的按百分比划分的环形图，如下图所示:

```JavaScript
let data = [
                {value:335, name:'直接访问'}, // pie1
                {value:310, name:'邮件营销'}, // pie2
                {value:234, name:'联盟广告'}, // pie3
                {value:135, name:'视频广告'}, // pie4
                {value:1548, name:'搜索引擎'} // pie5
    ]
```

![donut](https://assets.wuxinhua.com/blog/assets/echart-donus.png)

**两种思路：**

1. 利用描边和偏移stroke-dashoffset来完成（下面#4中例子）;  
2. 按比例确定扇区的起始位置，利用path绘制各饼图，中间部分用另一个圆形遮盖 ;  

按第一种思路，利用SVG神奇的stroke属性来帮我们完成绘图,stroke包含以下几个属性：  
  **stroke-width**: 定义一条线，文本或元素轮廓厚度  
  **stroke-linecap**: 描边端点表现形式 butt、round、square  
  **stroke-dasharray**: 用于创建虚线  
  **stroke-dashoffset**: 偏移位置  
利用dasharray画出第一个扇区，描边的长度等于它弧长，第二个扇区偏移至第一个扇区结束位置，理一下描边思路，伪代码如下：

```js
    // 伪代码
    // 总数
    lat total = 335 + 310 + 234 + 135 + 1548 ; // 2562
    // 周长
    let circumference = 400;
    // pie1扇区的弧长
    dash1 = 335 / total * circumference;  // 52.30288836846214
    offset1 = 0;
    // pie2弧长算法同pie1,第二个扇区的偏移dashoffset
    offset2 = 周长 - 之前扇区的周长 + 第一个扇区的偏移量
    ~ 以此类推求出每个扇区的dasharray值 和 dashoffset值
```

```CSS
// 虚线值和偏移量值
.chart5 circle.pie1 {
  stroke-dasharray: 52.30288836846214 347.69711163153784;
  stroke-dashoffset: 0;
}
.chart5 circle.pie2 {
  stroke-dasharray: 48.39968774395004 351.60031225604996;
  stroke-dashoffset: 347.69711163153784;
}
.chart5 circle.pie3 {
  stroke-dasharray: 36.53395784543326 363.46604215456676;
  stroke-dashoffset: 299.2974238875878;
}

.chart5 circle.pie4 {
  stroke-dasharray: 21.07728337236534 378.92271662763466;
  stroke-dashoffset: 262.76346604215456;
}

.chart5 circle.pie5 {
  stroke-dasharray: 241.68618266978922 158.31381733021078;
  stroke-dashoffset: 241.68618266978922;
}
```

环形图结果如下图#6所示：  

代码地址: [https://codepen.io/amnEs1a/pen/wpNWWq/](https://codepen.io/amnEs1a/pen/wpNWWq/)

![](https://assets.wuxinhua.com/blog/assets/svg-circle.png)
#### SVG 动画  

上面#4的例子就是使用css3的Animation来实现的，因为SVG类似于 HTML，所以CSS3的三大利器(Transitions, Transforms和Animation)同样适用于SVG；SVG的动画还可以通过定义animation elements标签来实现（#5例子），这些标签最初是在`SMIL`动画规范中定义的，CSS能做的SMIL都能做，如果你偏向于使用JavaScript，可以试试[snapsvg](http://snapsvg.io/)；
> the Snap.svg JavaScript library makes working with your SVG assets as easy as jQuery makes working with the DOM.  

snapsvg被定义为`SVG界的jQuery`，让我们更方便得定义SVG动画。JavaScript实现动画的缺点是当SVG嵌入到img标签或者作为背景图片放入background-image属性中时，动画不起作用，但是例如SVG的path标签，通过定义d属性值来定义path的形状，这部分又无法通过CSS来实现，所以SIML可以说是弥补以上两者的一些缺陷，这里介绍一下使用SVG的SMIL；
SMIL允许：  

1. 变动一个元素的数字属性（x、y……）  
2. 变动变形属性（translation或rotation）  
3. 将颜色属性作为动画  
4. 按照运动轨迹移动  

> As of Chrome 45.0, SMIL animations are deprecated in favor of CSS animations and Web animations .

来看下浏览器对SMIL的支持情况，值得注意的是自Chrome 45.0起，SMIL动画就被废弃了，并且会在console中给出警告提示，推荐使用CSS动画和Web动画。
前面三个CSS3基本都能实现，厉害的是第4个，来体验一下SVG实现动画的几种方式：  

##### animate属性

通过添加SVG动画元素，比如<animate>到SVG元素内部来实现动画，对<animate> 元素来说，重要的属性有：  
attributeName：变动的属性的属性名。  
attributeType：属性类型
from：变动的初始值。  
to：变动的终值  
dur：动画的持续时间  
fill: 是否保留动画结果
repeatCount： 重复次数indefinite表示无限重复  

会发现类似于CSS3 animate的定义方式，如何把我们写的animate标签作用于SVG上呢？SMIL提供了两种方式：  

1. 将animate标签放包裹在SVG标签中：  

    ```HTML
    <circle id="chart5" ... >
      <animate ... /> 
      <!-- animate动画标签 -->
    </rect>
    ```

2. 使用`xlink:href`属性，指定作用于对应id标签：  

    ```HTML
    <circle id="chart5" ... >

    <animate xlink:href="#chart5" ... />

    </circle >

    ```

但省略xlink:href属性值后，动画默认作用于当前位置的父节点标签。  

```HTML
<circle id="chart5" class="pie" stroke-linecap="round" fill="none" cx="0" cy="0" r="63.66197723675813" />
<animate 
        xlink:href="#chart5"
        attributeName="stroke-dashoffset"
        from="400"
        to="0" 
        dur="6s"
        fill="remove"
        repeatCount="indefinite"
/>
```

例如上述代码定义了attributeName属性名为：`stroke-dashoffset`，在6s的时间内从400转换到0，`repeatCount`表示动画重复次数，`fill`类似于`animation-fill-mode`属性定义动画结束后是否回到最初的状态，有两个值：

1. freeze 表示保留动画结束时的属性值；  
2. remove 动画属性将被移除，默认是remove；  

##### animateTransform  

`<animateTransform>`元素可以执行变换属性的动画。这里的transform与CSS3的transform类似，例如需要执行一个旋转的动画，可以像下面这样定义：  

```HTML
    <animateTransform attributeName="transform" begin="0s" dur="2s"  type="rotate" from="0deg" to="180deg" repeatCount="indefinite" />
```

##### animateMotion  

animateMotion元素可以让SVG各种图形沿着特定的path路径运动，例如：

```HTML
<animateMotion path="M10,80" begin="0s" dur="2s" repeatCount="indefinite"/>
```

##### 利用SVG动画实现一个跳动的心❤️

这里将使用到`path`标签，可以把path理解成画笔，你只需要给定画笔移动的位置，path将完成绘图工作，path元素的形状是通过属性d定义的，属性d的值是一个“命令+参数”的序列，因为属性d采用的是用户坐标系统，所以不需标明单位，所以使用path绘图的前提是获得图形的：坐标 + 命令 + 参数；
path的命令用字母表示，有对应的含义，大写字母表示绝对定位，小写字母表示相对定位，例如：
> M 代表“移动到”某个位置  
  L 代表直线  
  Z 代表结束闭合路径  
  ···

```HTML
    <path class="path_ract" d="M0,0 L0,150 150,150 150,0 z"> 
    <!--从原点(0 , 0)的位置移动到(0 , 150)、（150,150）、（150,0 ） 再回到原点，并且画直线-->
```

圆的d值比较复杂，给出画圆的d值公式，圆心坐标(cx, cy) 半径为r：

```html
<path
    d="
      M cx cy
      m -r, 0
      a r,r 0 1,0 (r * 2),0
      a r,r 0 1,0 -(r * 2),0
    "
/>
```  

```Javascript
// 圆心坐标(cx, cy) 半径r
function getcirclePath(cx, cy, r){
    return 'M '+cx+' '+cy+' m -'+r+', 0 a '+r+','+r+' 0 1,0 '+(r*2)+',0 a '+r+','+r+' 0 1,0 -'+(r*2)+',0';
}
```

思路如下图所示，先利用path画一个正方形和两个圆，将圆分别向上和向右移动半径的距离，效果如下图所示[#codepen地址](https://codepen.io/amnEs1a/pen/ZvZOKr)，整个动画过程是使用SVG SMIL实现，可点击codepen的“return”按钮查看整个画图过程。  
![](https://assets.wuxinhua.com/heart.png)

代码地址：[https://codepen.io/amnEs1a/pen/ZvZOKr/](https://codepen.io/amnEs1a/pen/ZvZOKr/)

![](https://assets.wuxinhua.com/blog/assets/screenshot-heart.png)

之前在网上看了很多很酷炫的HTML5/SVG动画，这次自己用代码算是简单体验了一下，SVG确实很强大，好好利用起来，可以创造出很多有意思的事情，希望以上对刚刚接触到SVG的童鞋能有所启发和帮助，这期间翻了很资料和博客内容，包括SVG动画、Canvas和SVG的对比、大漠、张鑫旭写的这方面的文章等等，具体我列在下面的附录列表上；

#### 附

1.理解SVG的坐标系和转换  
  [Part 1 — The viewport, viewBox, and preserveAspectRatio](http://www.sarasoueidan.com/blog/svg-coordinate-systems/)  
  [Part 2 - The transform Attribute](http://www.sarasoueidan.com/blog/svg-transformations/)
  [Part 3 - Establishing New Viewports](http://sarasoueidan.com/blog/nesting-svgs)
2.[SVG - Scalable Vector Graphics教程](http://tutorials.jenkov.com/svg/svg-viewport-view-box.html)  
3.[大漠老师的SVG系列教程](https://www.w3cplus.com/html5/svg-coordinates.html)  
4.[理解SVG的viewport,viewBox,preserveAspectRatio](http://www.w3cplus.com/html5/svg-viewport-viewbox-preserveaspectratio.html)  
5.[A Look At SVG viewBox and viewport](http://jonibologna.com/svg-viewbox-and-viewport/)
6.[SVG 与 Canvas：如何选择](https://msdn.microsoft.com/library/gg193983.aspx)  
7.[SVG相关目录存档-张鑫旭](http://www.zhangxinxu.com/wordpress/category/graphic/svg-graphic/)

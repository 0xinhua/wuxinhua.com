---
title: 'ES6(ECMAScript 6.0)新特征'
excerpt: 'ECMAScript 6.0已经在2015年6月17日正式发布（以下简称ES6）到现在已经过去了2年时间，发布的很多新的特征已成为了标准'
date: '2017-08-28 17:54:57'
tags: 'ECMAScript6.0'
---

<!-- ![title](https://assets.wuxinhua.com/es6.jpeg) -->

![](https://assets.wuxinhua.com//blog/assets/es6/es2015.png)

### #目录  

ECMAScript 6.0已经在2015年6月17日正式发布（以下简称ES6）到现在已经过去了2年时间，发布的很多新的特征已成为了标准，如今ES8草案也公布了，Javascript的未来还是值得期待的；我从去年下半年开始接触ES6的，在代码上搭配babel来开发基于React框架的应用，发现其中许多特性确实简化了很多代码的编写，之前一直没有系统性得去学习这些新的特征，这篇博客算是我的ES6学习笔记，从简单的数组的一些新方法开始，ES6模块系统、class类...到较复杂的generator函数结束。完成之后，我会再陆续记录ES7、ES8..学习笔记。本篇包含以下内容：

* 数组方法扩展
* 解构赋值
* let和const
* 箭头函数
* 字符串模板
* Promise
* Set和Map
* 字符串扩展  
* Symbol
* 模块Module
* Class
* Proxy
* Generator

### #数组方法扩展

#### Array.prototype.includes

新增includes方法，类似于[String.prototype.includes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes)，在这之前我们一般是使用下面这样的代码来判断数组中是否存在某个元素,

```javascript
if (arr.indexOf(el) !== -1) {
    ...
}
```

这里用indexOf有两个问题：

* 违背“所见即所得”原则，indexOf方法它是用来返回下标位置的，并不能直观表达是否存在包含关系。
* 无法判断NaN,[NaN].indexOf(NaN) > 0 // false

注意：includes只接受两个参数，接收2参数，查询的项以及查询起始位置

```javascript
// include 返回boolean值
[1, 2].includes(3);  // false
[1, 2, NaN].includes(NaN);  // true
["a", "b", "c"].includes('a', 'b'); // true
["a", "b", "c"].includes('a', 'd'); // true
["a", "b", "c"].includes('a', 3); // false
```

#### Array.prototype.from

from 方法用于将类似数组的对象（key-value结构）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）转换成数组。
例如：

```javascript
console.log(Array.from('hello')); // [ 'h', 'e', 'l', 'l', 'o' ]

```

```javascript
const objLike = { 0: 0,  1: 1,  2: 2, length: 3 }; 
console.log(Array.from(objLike)); // [0, 1, 2]
```

from还接受第二个方法类型的参数，类似map方法返回经方法处理过的值。

```javascript
const objLike = { 0: 0,  1: 1,  2: 2, length: 3 }; 
console.log(Array.from(objLike, (k) => k+=1;))); // [1, 2, 3]
```

#### Array.prototype.of

of方法比from更简单，将一组值转换成数组,为了弥补使用new Array()构造数组的奇怪行为。
先看下new Array为我们做了什么？

```javascript
// 构造函数 new Array
console.log(new Array()); // []
console.log(new Array(1)); // [undefined x 1]
console.log(new Array(1,2,3)); // [1,2,3]
```

```javascript
// Array.of()
console.log(Array.of(); // []
console.log(Array.of(1)); // [1]
console.log(Array.of(1,2,3)); // [1,2,3]
console.log(Array.of(undefined)); // [undefined]
```

#### Array.prototype.keys 、values 、entries

keys 、values很好理解，分别代表获取数组的索引和对应的值,entries则是输出这两个值。

```javascript
// keys
for(let a of [1, 2, 3, 4, 5].keys()) {
    console.log(a); // 0,1,2,3,4
}
// values
for(let b of [1, 2, 3, 4, 5].values()) {
    console.log(b); // 1,2,3,4,5
}
// entries
for(let a of ['a', 'b'].entries()) {
    console.log(a) // [0, 'a'] [1, 'b']
}
```

#### Array.prototype.find 和 findIndex

注意：

* find方法默认返回第一个符合条件的值,如果没找到则返回undefined,findIndex默认返回第一个符合条件的值的下标,如果没找到返回-1;  
* 二者接收参数必须得是方法,该回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
* 这两个方法都可以z找到NaN.

```javascript
const arr = [1, 4, -5, 10, NaN];
console.log(arr.find((k) => k > 5));  // 10
console.log(arr.findIndex((k) => k > 1));  // 1
console.log(arr.find((k) => Object.is(NaN, k) )); // NaN
```

#### Array.prototype.fill 和 copyWithin

fill可以理解为数组元素替换，可以指定填充开始位置和结束位置，copyWithin则可以理解为用指定元素填充到数组的对应位置，
arr.copyWithin(target, start, end) target: 从指定下标开始 index:复制元素的下标 end: 复制元素结束下标
来看下面的例子：

```javascript
// fill
console.log([1,2,3].fill(4)); // [4, 4, 4] 不指定开始和结束，全部替换
console.log([1,2,3].fill(4,1)); // [1, 4, 4]
console.log([1,2,3].fill(4,1)); // [1, 4, 4]
console.log([1,2,3].fill(4,1,1)); // [1, 2, 3]
```

```javascript
// copyWithin
console.log([1,2,3].copyWithin(1)); // [1, 1, 2]
console.log([1, 2, 3, 4, 5, 6, 7].copyWithin(2)); // [1, 2, 1, 2, 3, 4, 5] 未指定复制元素的起始位置，默认用原数组进行填充替换
console.log([1, 2, 3, 4, 5, 6].copyWithin(2, 1, 4)); // [1, 2, 2, 3, 4, 6] 可以理解为从下标为2元素开始，复制下标1-4的数组进行替换填充原数组
```

#### Array.prototype.find

### [#解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

使用类似数组或对象字面量的语法将数组和对象的属性赋给各种变量;
可以很方便得将值和从数组中、属性从对象中提取到不同的变量中：
在写React的过程中，也会用到JSX的一个类型写法（Spread Attributes），中文名延展属性，例如子组件需要需要父组件传递a、b、c参数：

```javascript
// 子组件需要对应的a、b、c三个参数
<Component a = {this.props.a} b = {this.props.b} c = {this.props.c} />;
```

 JSX延展属性写法：

```javascript
// 子组件需要对应的a、b、c三个参数
<Component {...this.props} />;

```

数组和对象的解构：

```javascript
// 数组的解构赋值

[a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a); // 1
console.log(b); // 2
console.log(rest); // [3, 4, 5]
```

```javascript
// 对象的解构赋值

let obj = {a:1, b:2, c:3};
const {a , b} = obj;
console.log(a); // 1
console.log(b); // 2
```

```javascript
// 如果没有实际值，得需要使用‘,’进行占位：

let colors = [ "red", "green", "blue" ];
let [ , , thirdColor] = colors;
console.log(thirdColor);   // "blue"
```

```javascript
// 如果你想要获取特定的数组项，并且把剩余的项归在一个数组，那么你可以这样运用 rest操作符 来解构

const color = ['red', 'blue', 'orange'];
const [red, ...rest] = color;
console.log(red); // 'red'
console.log(rest); // ['blue', 'orange']
```

扩展运算符和剩余操作符都是以三点省略号开头，二者很像，用法上还是有一定区别:

```javascript
// 剩余操作符在函数中的使用

function fn(a, b, ...args) {  
   console.log(args);
}
fn(1, 2, 3, 4, 5 ); // [3, 4, 5]

```

扩展运算符和剩余操作符都是以三点省略号开头，二者很像，用法上还是有一定区别。扩展运算类似于使用‘...’分解数组中的值、对象属性；而剩余操作符是使用‘...’是用来解构和提取数据，多个元素合成一个元素。

### #let和const

这里将var、let和const进行简单对比：

* let和const均不能重复声明进行覆盖，而var可以；
* let和const存在暂存死区,不存在变量提示,而var存在变量提升；
* const一旦声明，不可更改，let和var可以更改；
* let定义的变量只存在于块级作用域；
* const只定义不赋值，会报错，var、let返回undefined；
* let和const 声明的变量不再属于window的属性，可以在下面的例子中体现;
* const除了声明的是常量外，其它和let是一样的;

```javascript
// let和const均不能重复声明
const a = 'Hi';
const a = 'Hello'; // Identifier 'a' has already been declared
```

```javascript
// const 、let的块级作用域(block-scoping)
const city = 'Beijing';
{
  const city = 'Shanghai';  
  console.log(city); // Shanghai
}
console.log(city); // Shanghai
```

```javascript
//  const 、let的块级作用域(block-scoping),let在for循环里
for(let i=0;i<3;i++) {
}
console.log(i); // undefined
```

```javascript
//  const 、let的块级作用域(block-scoping),let在if条件
if(..) {
    let a = 'boo';
} else {
    ...
}
console.log(a); // undefined
```

```javascript
// let和const 声明的变量不再属于window的属性
const PI = 3.14159;
console.log(window.c); // undefined
```

关于`暂存死区`：在下面的这个例子，在let初始化之前，使用let重复定义在块中的变量，这时会抛错，因为这个变量存在于定义到待初始化处理的一个'暂存死区'中，具体可以查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)上的解释。

```javascript
if (x) {
  let foo;
  let foo; // TypeError thrown.
}
```

### #箭头函数

在ES6中利用语法糖使用“箭头”（=>）定义函数。

```javascript
var f = (x) => x;
// 等同于
var f = function (x) { return x };
```

如果没有参数，圆括号也可以省略了，

```javascript
var f = => return true;
// 等同于
var f = function () { return true };
```

```javascript
// 箭头函数写法
[1,2,3].map(x => x + 1 );
// 等同于
[1,2,3].map(function (x) {
  return x + 1;
});

```

箭头函数与普通函数的区别：

* 箭头函数的this是它定义时的所在的对象；
* 没有arguments对象，要访问可以使用剩余操作符代替；
* 不能使用yield命令，所以箭头函数不能用作Generator函数；

### #字符串模板

ES6引入了一种新型的反撇号（`）字符串字面量语法；

```javascript
// 利用ES6反引号定义
`<div>
<span>keep the ${things} simple stupid .</span>
</div>`
// 等同于
'<div><span>keep the'+things+' simple stupid .</span>'+
+'</div>'
```

### #Promise

什么是Promise?  
Promise是抽象异步处理对象以及对其进行各种操作的组件;
Promise对象出现避免了使用层层嵌套的回调函数，再也不用担心陷入地狱回调了，Promise的意义就在于 then 链式调用 ，它避免了异步函数之间的层层嵌套，将原来异步函数的嵌套关系 转变为便于阅读和理解的 链式步骤关系，代码也更加直观。

```javascript
// 回调地狱
// a请求
$.ajax({
      url: 'a',
      dataType:'json',
      success: function(data) {
          // 获取data数据 传给下一个b请求
          var id = data.id;
          $.ajax({
              url:'b',
              data:{"id":id},
              success:function(){
                    // 下一个请求 c
              }
          });
      }
});
```

```javascript
// Promise写法
var a = function() {
    var promise = new Promise(function(resolve, reject){
        $.ajax({
        url: 'a',
        dataType:'json',
        success: function(data){resolve(data)}
        error: function(e){reject(e)}
        });
    })
    return promise;
}
...b,c...
a.then(b.then())
```

想要创建一个Promise对象，可以使用new来构造一个新的promise对象,例如：

```javascript
var promise = new Promise(function(resolve, reject) {
 // 必须给定一个function作为参数，不然会报错；
 // 处理结束后、调用resolve 或 reject
});
```

大概流程是：

1. new Promise(fn) 返回一个promise对象;
2. 在 fn 中指定异步等处理  
    • 处理结果正常的话，调用 resolve(处理结果值);
    • 处理结果错误的话，调用 reject(Error对象);

Promise对象有以下几个特点：

* 1.有三种状态：
  * pending: 初始状态，不是成功或失败状态;
  * fulfilled: 意味着操作成功完成;
  * rejected: 意味着操作失败;
    状态的变化只能是从 Pending 变为 Resolved 和从 Pending 变为 Rejected;
* 2.Promise的prototype对象上有以下几个方法：
  * Promise.then()
  * Promise.catch()
  * Promise.all()
  * Promise.race()
  * Promise.resolve()
  * Promise.reject()
  * Promise.done()
  * Promise.finally()  

Promise方法链:
其实就是在在Promise里把调用的多个方法连在一起作为一个方法链，例如：

```javascript
// Promise chain
function taskA() {
 console.log("Task A");
}
function taskB() {
 console.log("Task B");
}
function onRejected(error) {
 console.log(error);
}
var promise = Promise.resolve();
promise
 .then(taskA)
 .then(taskB)
 .catch(onRejected)
```

正常流程A task成功->B task成功-> C task,如果B task失败，将绕过C直接到catch方法，看下面这个例子：

```javascript
function taskA(value) {
    return value +1;
}
function taskB(value) {
    throw new Error('something wrong!');
}
function taskC(value) {
    console.log(value);
}
function onRejected(error) {
 console.log('catch error: '+ error);
}
var promise = Promise.resolve(1);
promise
 .then(taskA)
 .then(taskB)
 .then(taskC)
 .catch(onRejected);
 // catch error: something wrong! value 是undefined
```

关于Promise 链里如何传递参数？

答案很简单，只需要在前一个任务中增加return，下一个任务能接受到这个参数。例子：

```javascript
// Promise chain
function taskA(value) {
    return value +1;
}
function taskB(value) {
    return value +2;
}
function taskC(value) {
    console.log(value);
}
function onRejected(error) {
 console.log(error);
}
var promise = Promise.resolve(1);
promise
 .then(taskA)
 .then(taskB)
 .then(taskC)
 .catch(onRejected);
 // 4
```

之前碰到了一个面试题，都知道promise好用，那Promise有哪些缺点：

* 1.Promise无法终止，一旦建立了就会立即执行；
* 2.必须严格要求接口规定方法编写代码，例如：不设置回调函数，会抛出错误，不能像回调函数方式那样可以自己自由的定义回调函数参数等；
* 3.当它处于Pengding状态时候，无法得知目前进行到哪一个阶段了；

关于Promise这一节可以参照[promise小人书](http://liubin.org/promises-book/);

### #Set和Map

Set和Map是ES6新增的集合类型的数据结构:

#### Set

1.Set可以接受一个数组（或者类数组对象）作为参数，用来初始化;
2.Set类似于数组,但是没有重复值;

```javascript
// Set本身是一个构造函数
console.log(new Set([1,2,3]))
```

Set内置的方法和属性：

* add(); // 添加  
* clear(); // 清除Set  
* delete(); // 删除Set某个值  
* has() // 查找某个项  
* forEach() // 循环每一项  
* keys() // 遍历 key  
* values() // 遍历 value  
* entries() // 遍历key 和value  
* siez 属性，类似于数组的length  

#### Map

Map是于对象类似的集合类型数据结构，map与object的不同在与，Object是一种“字符串-值”的对应，Map是“值-值”的对应，map没这个限制。

Map内置的方法和属性：

* set(); // 添加
* clear(); // 清除Set
* delete(); // 删除Set某个值
* has() // 查找某个项
* forEach() // 循环每一项
* keys() // 遍历 key
* values() // 遍历 value
* entries() // 遍历key 和value
* siez 属性，类似于数组的length

### #Symbol

Symbol既不是值也不是对象，它是第七种原始类型，是可以用来作为对象属性键的值。
Symbol的目的就是为了实现一个唯一不重复不可变的值；有两种方法来生产一个Symbol类型的值：

```javascript
// Symbol函数
console.log(Symbol()); // Symbol()
// Symbol.for方法
var a = Symbol.for('symbA');
var b = Symbol.for('symbA');
console.log(Symbol.for('symbA')); // Symbol(symbA)
console.log(a == b); // true
```

```javascript
var a = Symbol('a');
console.log(a); // Symbol(a)
console.log(typeof(a)) // 'symbol' 
var b = Symbol('b');
console.log(b); // Symbol(a)
console.log(a == b) // false 
```

Symbol可以用作对象属性名，但是区别是无法通过.来定义该属性：

```javascript
var symbola = Symbol();
var b = {};
var b.symbola = 'this is not a symbola!';
console.log(b); //{ 'symbola' : 'this is not a symbola!'}
b = {symbola:'this is a symbola!'};  // { Symbol() : 'this is a symbola!'}
```

Symbol无法在for...in、for...of被遍历查找到，看下面的例子：

```javascript
var a ={'a': 'a','a':'b'}
for(var i in a ){console.log(i)} // a, b
a[Symbol('c')] = 'c';
console.log(a); // { a: "a", b: "b", Symbol(c): "c" }
for(var i in a ){console.log(i)} // a, b
```

Symbol类型的一些应用途径：

* 1.由于它的唯一性，每一个Symbol值都不相等，这意味着Symbol值可以作为标识符用于对象的属性名，不会出现同名的属性。(如果你定义同名属性对象，其实是被覆盖的，得的是后定义的属性值)
* 2.Symbol类型的属性名无法被for...in等方法遍历到，可以用于定义一些私有属性。

### #模块module

 可以把模块理解为是一个独立的Javascript文件，在ES的module出现之前，JavaScript一直没有模块系统，先回顾一下前端的模块系统，了解一下什么是模块化？CommonJS又是什么？AMD和CMD规范分别有什么特点？

#### 关于CommonJS

CommonJs最先源于nodejs社区，关于CommonJS的规范可以查看[这里](http://wiki.commonjs.org/wiki/CommonJS)，先看下它的语法：

```javascript
// math.js
exports.add = function() {
    var sum = 0, i = 0, args = arguments, l = args.length;
    while (i < l) {
        sum += args[i++];
    }
    return sum;
};
// increment.js
var add = require('math').add;
exports.increment = function(val) {
    return add(val, 1);
};

// program.js
var inc = require('increment').increment;
var a = 1;
inc(a); // 2
```

CommonJs原先叫ServerJS,仅看名字就知道这个库服务于后端，也就是说在Nodejs等环境下用是没有问题的，但不适用于浏览器端，到了浏览器中，这样引用会出现问题：

* 浏览器环境并不提供module、require等外部直接引用变量。
* nodejs环境中require一个模块是直接从硬盘或内存中读取该文件，但到了浏览器中你需要从服务器中去下载这个文件，这就得发送http请求，require资源需要请求完才能执行。  

社区在解决这个问题的时候产生了分歧：

* Modules/1.x 流派：
    1.x规范已经够用了，只需移植到浏览器端即可。例如工具Browserify就能将你的CommonJS代码转换成浏览器端也能执行的代码；
* Modules/Async 流派  
    这个观点觉得浏览器有自身的特征，不应该直接用 Modules/1.x 规范。这个观点下的典型代表是 AMD 规范及其实现 RequireJS。

#### AMD和CMD

AMD(异步模块定义)规范既然在浏览器端不支持，那么就改进CommonJS规范，先定义好你需要引用的模块，进行异步加载，在回调函数里执行逻辑代码，制定了一个Modules/Wrappings规范，具体二者有什么区别点击[这里](https://www.zhihu.com/question/20351507)  
AMD标准是requireJs定义的标准，而CMD是seaJS定义的标准，这两者有什么区别：

* 对于依赖的模块，AMD是提前执行，CMD是延迟执行；
* CMD依赖就近，也就是说需要用到时才写,AMD依赖前置，一开始就得把所需依赖写好；

```javascript
define(["require"], function(require) {
  // 在这里，模块 a 已经下载并执行好
  // ...
  var a = require("./a");

})
```

关于二者的区别可以查看知乎回答[AMD 和 CMD 的区别有哪些？](https://www.zhihu.com/question/20351507)

#### Module

modules规范分两部分，一部分是如何导出export，一部分是如何导入import。
任何的值(例如方法、变量)都可以作为一个modules被导出：

```javascript
// 文件 a.js 直接导出变量
export const PI = 3.14;
const value = 'module';
export function helloworld(){
    console.log('Hello world~');
}
// 先定义再导出也是正确的
export {PI, value};
// 你也可以使用as进行重命名
export {name1 as PI, name2 as value};
```

使用export命令导出模块后，那么可以在其他文件中通过import命令来导入这个模块

```javascript
// 按需导入
import {PI, helloworld} from './a.js';
// 对变量进行重命名
import {PI as p} from './a.js';
// 整体导入
import * as a from './a.js';
```

default默认导出,export default是输出一个叫做default的变量或方法；它的后面不能再跟变量声明语句：

```javascript
// a.js 模块默认导出
export default function() {
    console.log('hello world');
}
// 或者这样写
function helloworld(){
    console.log('hello world');
}
export default helloworld;
// 这样写会导致错误
export default const helloworld = function() {
    console.log('hello world');
}
// 引入的时候,不可以使用 类似{helloworld}这样的写法
import helloworld from './a.js';
helloword(); // 'hello world'
```

关于default：

* export default是输出一个叫做default的变量或方法；它的后面不能再跟变量声明语句；
* export default导出的模块，不能使用大括号方式导入；
* 一个文件内不能使用多个export default；

### #Class类

#### 类的声明

class是创建类对象与实现类继承的语法糖，旨在让ES5中对象原型的写法更加清晰，易读。
在ES6前，如果想实现class面向对象的例子，我们通常使用function来模拟：

```javascript
// 使用function
function People(name) {
  this.name = name;
  this.toSayHello = function () {
      return console.log('Hello, my name is' + this.name );
  }
}

var p = new People('ES6');
```

```javascript
// 使用class
class People {
  constructor(name) {
      this.name = name
  }
  toSayHello() {
      return console.log('Hello, my name is' + this.name );
  }
}

```

构造函数的缺点：每次实例化一个对象，就会执行构造函数里的代码，因此每当这个类被实例化的时候，这些方法和属性就会被拷贝到实例化出来的对象中,这样就会重复地在内存中分配一定区域来存储这些变量和方法。为了解决这个方法，可以在prototype中来添加该类的一系列常量和方法。定义在prototype的中的方法和属性，新实例出来的对象会进行引用，不会产生“吃内存”的现象。

```javascript
// 使用function
function People(name) {
  this.name = name;
}

People.prototype.toSayHello = function () {
  return console.log('Hello, my name is' + this.name )
};

var p = new People('ES6');
```

function声明存在变量提升，但class的定义不存在提升；

```javascript
// 不会报错
console.log(helloWorld());

function helloWorld() {
  return "Hello World";
}

// 报错
var p = new People();

class People() {
}
```

#### constructor 方法

constructor属性返回对创建此对象的构造函数的引用。例如：

```javascript
var a = new Array();
a.constructor // function Array(){...}
a.constructor === Array // true
```

#### static 静态

类相当于实例的原型，所有在类里定义的方法，实例都能继承。但是在方法面前加上static关键字，就表示该方法不会被实例继承，该方法也被称作“静态方法”。
目前ES6只有静态方法，并没有静态属性，在ES7中有关于静态属性的提案，静态属性或方法需要用类名进行调用。

```javascript

class People {

  //es7对于实例属性的提案，此属性可以在实例中访问到
  type = 'animal';

  //es7对于类的静态属性的提案，同样Babel支持
  static myType = 'static';

  constructor(name) {
      this.name = name
  }
  toSayHello() {
      return console.log('Hello, my name is' + this.name );
  }
}

```

#### ES5的继承

通过原型链实现继承：

```javascript
// 定义一个动物类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃' + food + '~~');
};
```

将父类的实例作为子类的原型

```javascript
function Cat() {
}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';
var cat = new Cat();
console.log(cat.sleep()); // cat 正在睡觉
console.log(cat instanceof Animal); // true
```

##### a.原型链继承

#### ES6的继承

可以通过extends关键字继承父类的所有属性和方法。

```javascript
// 使用class
class People {
  constructor(name) {
      this.name = name
  }
  toSayHello() {
      return console.log('Hello, my name is' + this.name );
  }
}
// 使用extends Woman 继承了People的所有属性和方法
class Woman extends People {
    constructor(name) {
        super(name);
        this.name = name;
    }
}

```

子类必须在constructor方法中调用super方法，否则新建实例时会报错。因为子类没有自己的this对象，而是继承父类的this对象;

### # Generator

#### Generator的定义

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield语句，定义不同的内部状态。Generator函数的调用方法与普通函数不同的是，调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，我们可以通过调用 next 方法，使得指针移向下一个状态。如下例子：

```javascript
function* stepGenerator() {
  yield 'step1';
  yield 'step2';
  return 'it is a generator';
}
var g1 = stepGenerator();
g1; // stepGenerator.....
g1.next(); // Object {value: "step1", done: false}
g1.next(); // Object {value: "step2", done: false}
g1.next(); // Object {value: "it is a generator", done: true}
g1.next(); // Object {value: undefined, done: true}
```

* 实际上function*stepGenerator 和 function* stepGenerator 或者 function *stepGenerator得到的结果是一样的，只是写法不一样；

调用stepGenerator对象的时候，Generator并没有被立即执行，调用next方法时，函数开始执行，next 方法返回一个拥有 value 和 done 两个字段的对象,下次调用 next，函数会从 yield 的下一个语句继续执行,等到整个函数执行完，next 方法返回的 done 字段会变成true。

不仅仅yield语句会中断执行，如果Generator中在yield前有return，同样也会停止执行。

```javascript
function* stepGenerator() {
  return 'it is a generator';
  yield 'step1';
  yield 'step2';
}
var g1 = stepGenerator();
g1; // stepGenerator.....
g1.next();  // Object {value: "it is a generator", done: true}
g1.next(); // Object {value: undefined, done: true}

```

#### Generator的输入输出

总结一下Generator与常见的函数有一些共同点，但也有一些差异：

* 通常函数以Function开始，Generator以Function*开始；
* 常见的函数一旦执行不能暂停，但是Generator可以，并且通过yield关键字来暂停执行；
* generator内部多了yield关键字，yield类似于普通函数的return，但是不同的是可以有多个yield暂停Generator函数的执行；
* 常见的函数执行之后会返回结果，Generator执行之后返回Generator对象;

更多关于Generator:
[迭代器和生成器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)
[generators in v8](http://wingolog.org/archives/2013/05/08/generators-in-v8)
[ES6 In Depth: Generators](https://hacks.mozilla.org/2015/05/es6-in-depth-generators/)
（...）

#### Proxy

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写, Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

Proxy 已经被几乎所有的现代化浏览器兼容。（当然IE不是一个现代化浏览器）,Proxy 接收两个对象参数，一个是需要代理的 object 对象，另一个handler也是一个对象，在这个对象里定义对所代理的对象进行设置的方法。
例子：

```javascript
let obj = {
  a: 1,
  b: 2
}
let handler = {
 gets (obj, prop) {
 console.log(obj)
 console.log(prop)
  }
}
proxy = new Proxy(obj, handler)
console.log(proxy) // Proxy {a: 1, b: 2}
console.log(proxy.a) // {a: 1, b: 2} a 
```

### 附录

* [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/module)
* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
* [ECMAScript 6 — New Features](http://es6-features.org/#BlockScopedVariables)
* [ECMAScript6 features Github](https://github.com/lukehoban/es6features)

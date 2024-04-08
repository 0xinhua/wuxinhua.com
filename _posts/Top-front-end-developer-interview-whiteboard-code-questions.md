---
title: '前端面试系列 - 手写代码'
excerpt: '之前前端面试系列总结了前端八股文，这篇总结了一些前端手写代码题目，基本覆盖了字节、阿里、百度等大厂常出的题目'
date: '2024-02-29 22:50:00'
tags: 前端面试 手撕代码 手写代码 前端手写代码
---

文章记录了我之前在前端面试中碰到的手写代码题，以及我的一些解题思路，大致给分了 4 类：基础题、`Polyfill`、业务相关题目、`leetcode` 题目，希望能给你在准备前端面试时提供一些解题思路。

不管是国内还是国外互联网公司前端面试流程中，基本都会有要求白板代码过程，面试官会根据岗位及候选人情况出相应难度的基础题或 leetcode 算法题，要求面试者在规定时间内使用熟悉的语言现场码代码解决问题，也被称为“手撕代码”过程。

手写代码更多的是考察你的思路和现场解决问题的能力，当然也能从一些细节中看出候选人的代码风格，例如函数命名、一致的代码风格及规范、追求更优解等，手写代码只是作为筛选候选人的门槛工具，在当下 AI 辅助编程的情况下，很多题目现在看来已经没有意义，另外我的答案、思路不一定 100% 准确，把当时的记录贴出来仅供参考，不建议你死背题目和答案代码，而是建议在不看已有答案的前提下自己思考实现一下代码。

前端面试系列文章已经更新了两篇，前端八股文系列可以查看 [前端面试系列之前端八股文](https://wuxinhua.com/posts/top-front-end-developer-interview-questions/)


## 基础题

### 实现一个 curry add 函数

```js
# 快手前端面试
# 有一个 add 函数，需要实现一个 curry add 函数，将 add(a + b) 转换为 add(a)(b)，
例如 sum(1, 2) => sum(1)(2) 以及 sum(1, 2, 3) => sum(1)(2)(3)

```
思路：

函数柯里化算是我碰到频率最高的一个题，一般会出现在一面过程，如果候选人对函数柯里化（Currying）比较熟悉，面试官可能会进一步要求实现加强版，例如不定参版。

`curry` 的核心是把接受多个参数的函数转换成接受一个单一参数的函数，这里首先能想到的是使用闭包来实现，将函数再返回用于下一次执行，例如如下代码：

```js
  const add = function(x) {
    return function(y) {
      return x + y
    }
  }
  add(1)(2) // 3
```

面试官可能会要求你优化一下，因为这样实现有个问题，当参数是多个时，我们需要再多加 `return` 逻辑，例如 3 个参数时， 那么这个时候可以考虑实现一个 `curry` 方法将 `add` 加工成 `curry` 化函数：

```js
  const add = function(x) {
    return function(y) {
      return function(z) {
        return x + y + z
      }
    }
  }

  // or 使用箭头函数
  const add = a => b => c => a + b + c
  add(1)(2)(3) // 6

  const curry = function (fn, ...a) {
  // 实参数量大于等于形参数量
  return a.length >= fn.length ?
    // 如果大于返回执行结果
    fn(...a) :
    // 反之继续柯里化，递归，并将上一次的参数以及下次的参数继续传递下去
    (...b) => curry(fn, ...a, ...b);
  };

  const addCurry = curry(add);
  addCurry(1, 2, 3) // 6
  addCurry(1)(2)(3) // 6
```

### 数据结构扁平化转换

这个题目在面试大厂小厂都碰到过，出现频率很高，可提前准备及练习，主要分为两类：树形嵌套结构转化成对象结构及反过来输出扁平化后数据。

题目：

```js
// 需要实现一个 merge 方法 将 obj 变为 obj2 的格式
const obj = [
  { id: 1, parent: null },
  { id: 2, parent: 1 },
  { id: 3, parent: 2 }
]

const obj2 = {
  obj: {
    id: 1,
    parent: null,
    child: {
      id: 2,
      parent: 1,
      child: {
        id: 3,
        parent: 2
      }
    }
  }
}
```

首先想到的是使用递归调用，判断嵌套的条件 `parent` 值是否等于上一个节点 `id` 即可，代码如下：

```js
const merge = (arr, n) => {
  if (n === arr.length - 1) {
    return arr[n];
  }
  arr[n].child = merge(arr, n + 1);
  return arr[n];
}

let obj2 = {}

obj2.obj = merge(obj, 0);

console.log(obj2);
```
类似的两道稍微有一些区别，但换汤不换药，思路也是一样的。

```js

// 将 obj 转换输出扁平化后的 result 对象

const obj = {
  a: 1,
  b: { c: 2, d: 3 },
  e: { f: { g: 4 } },
  h: { i: { j: 5, k: 6 } }
}

const result = {
  'a': 1,
  'b.c': 2,
  'b.d': 3,
  'e.f.g': 4,
  'h.i.j': 5,
  'h.i.k': 6
};

function flat(obj) {
  // 思路
  // input obj
  // output obj
  // value !== obj 
  // value === obj
  // key 拼接 .
  // 递归
  let result = {};
  function flatArray(o, pre) {
    for (key in o) {
      // value === obj
      if (o[key] instanceof Object) {
        if (pre === null) {
          flatArray(o[key], key)
        } else {
          flatArray(o[key], pre + '.' + key);
        }

      } else {
        if (pre === null) {
          result[key] = o[key];
        } else {
          result[pre + '.' + key] = o[key];
        };
      }
    }
  }
  return flatArray(obj, null);
}

```

### 观察者模式 eventBus

有很多公司都会考察设计模式，最基本的这几个需要掌握一下，例如观察者模式，实现一个最简版的 eventBus。

### 给数字加千分号

题目：

给金额整数部分数字加上千分符号，例如 12345 变成 12,345，小数点后数字不需要处理。

思路：

我最先能想到的方法是通过转换成数组来处理，判断是否有小数点，将整数部分转化成数组，每 3 位添加一个逗号分隔符号，但注意如果有小数点，需要截取一下整数部分，并且需要从后往前加，可以先将数组 `reverse` 一下再处理，另外投机取巧直接 `toLocaleString()` 也可以完成转换。

代码：

```js
// 转化前 1234567
// 转化后 12345.67
const formatNumber = (num) => {
  const numList = (num + '').split('.')
  let numStr = numList[0]
  let numArr = []
  for (i of numStr) {
    numArr.push(i)
  }
  num = numArr.reverse()
  let formatNum = []
  for (let i = 0; i < num.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      formatNum.push(',')
    }
    formatNum.push(num[i])
  }
  numStr = formatNum.reverse().join('')
  num = numList.length > 1 ? numStr + '.' + numList[1] : numStr;
  return num
}

console.log(formatNumber(1234567)) // 1,234,567
console.log(formatNumber(123456.12)) // 123,456.12

```

### 如何在不引入第三个变量的情况交换两个变量的值，例如 a = 1; b = 2 变成 a = 2; a = 1

这个题比较简单了，如果你对 `ES6` 解构赋值比较了解能一下做出来，当然加减法（适用于数值类型）也能完成交换：

```js

let a = 1
let b = 2

a = a + b
b = a - b
a = a - b

console.log('a b', a, b)
```

使用数组交换两者的位置：

```js
[a, b] = [b, a]
console.log('a b', a, b)
```

## 方法 polyfill

### 实现一个 myTypeOf，能给出数据的类型

这里主要考察对 `JS` 常规的数据类型的掌握，目前 `JavaScript` 中的 typeof 方法用于获取一个变量的类型。它可以返回以下几种类型值：

- "undefined"：表示变量未定义
- "boolean"：布尔类型
- "number"：数字类型
- "string"：字符串类型
- "object"：对象类型
- "function"：函数类型
- "symbol"： Symbol 类型

我们可以使用其它方式输出数据类型来模拟 `typeof` 的使用，例如 `Object.prototype.toString` 方法返回对象的类型字符串，

```js

function myTypeOf(value) {

  if (value === null) {
    return 'null'
  }

  // /ab/ RegExp
  if (value instanceof RegExp) {
    return 'object'
  }

  // [ab] Array
  if (Array.isArray(value)) {
    return 'object'
  }
  const str = Object.prototype.toString.call(value).slice(8, -1)
  return str.toLocaleLowerCase()
}

```

### HardMan

实现一个 HardMan 方法，如果是在准备面微信事业群(腾讯wxg)或腾讯前端面试的同学可以思考一下这个题目，出题的概率也比较大，由于实现的方法比较多，面试官能考察候选人对 `class` 类、`Promise` 、`setTimeout`、队列等的使用及掌握熟练情况。

题目：

```js

HardMan(“jack”) 输出:
// I am jack

HardMan(“jack”).rest(10).learn(“computer”) 输出:
// I am jack
//等待10秒
// Start learning after 10 seconds
// Learning computer

HardMan(“jack”).restFirst(5).learn(“chinese”) 输出:
// 等待5秒
// Start learning after 5 seconds
// I am jack
// Learning chinese
```

思路：

使用 `Promise` 链，我们使用了一个内部的 `Promise` 对象来管理异步操作的顺序。每当调用 .rest()、.learn() 或 .restFirst() 方法时，我们都在内部的 `Promise` 链上添加新的操作。这样，即使是异步操作，也可以确保按照调用的顺序执行。

```js
class HardMan {
  constructor(name) {
    this.promise = Promise.resolve().then(() => {
      console.log(`I am ${name}`);
    });
  }

  rest(time) {
    this.promise = this.promise.then(() => new Promise(resolve => {
      console.log(`等待${time}秒`);
      setTimeout(() => {
        console.log(`Start learning after ${time} seconds`);
        resolve();
      }, time * 1000);
    }));
    return this;
  }

  learn(subject) {
    this.promise = this.promise.then(() => {
      console.log(`Learning ${subject}`);
    });
    return this;
  }

  restFirst(time) {
    const waitAndLog = () => new Promise(resolve => {
      console.log(`等待${time}秒`);
      setTimeout(() => {
        console.log(`Start learning after ${time} seconds`);
        resolve();
      }, time * 1000);
    });

    const initialPromise = this.promise;
    this.promise = Promise.resolve().then(() => waitAndLog()).then(() => initialPromise);
    return this;
  }
}

// new HardMan(“jack”) => “jack”
// new HardMan(“jack”).rest(10).learn(“computer”)
// I am jack
//等待10秒
// Start learning after 10 seconds
// Learning computer
```

### 实现一个简单的 flat 函数，能将数组拍平

这类题目主要考察面试者对 JS 基础，例如判断元素是是否是数组，`prototype`、`this` 的用法等。

```js
function myFlat(arr) {
  let res= [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      res= res.concat(myFlat(item));
      // concat 方法返回一个新数组，不会改变原数组
    } else {
      res.push(item);
    }
  }
  return res;
}

// redude 版

function myFlat(arr, depth = 1) {
  return depth > 0
    ? arr.reduce(
        (pre, cur) =>
          pre.concat(Array.isArray(cur) ? myFlat(cur, depth - 1) : cur),
        []
      )
    : arr.filter((item) => item !== undefined);
}

```

### 实现一个 Promise.allSettled

如果没有使用过 `allSettled` 方法，可以先询问一下面试官这个方法的使用，`allSettled` 是指当你请求多个 `Promise` 方法里，当所有 `Promise` 执行后才返回，结果是一个数组对象分别有 `status`、`value` 、 `reason` 三个属性，而参数是一个 `Promise` 数组。

题目：

```js
const results = allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("一个错误")),
]);

// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: 一个错误 }
// ]
```

allSettled Ployfill 代码：

```js
function allSettled(promises) {

  const results = []

  for (promise of promises) {
    let result = { status: 'fulfilled' }
    promise
    .then(res => result.value = res)
    .catch(err => {
      result.status = 'rejected'
      result.reason = err
    })
  }
  return results
}

// VM132:8 Uncaught TypeError: promise.then is not a function
```

这样写有个问题，当上面参数传入的参数 `99` 的情况会报错，因为不是 `promise` 的原因，在这个基础上加上是否是 `promise` 的判断：

```js
function allSettled(promises) {
  const results = [];

  for (const promiseOrValue of promises) {
    let result = {};

    if (typeof promiseOrValue === 'object' && typeof promiseOrValue.then === 'function' ) { // Check if it's a promise
      result.status = 'pending';
      promiseOrValue
        .then(res => {
          result.status = 'fulfilled';
          result.value = res;
        })
        .catch(err => {
          result.status = 'rejected';
          result.reason = err;
        });
    } else {
      result.status = 'fulfilled';
      result.value = promiseOrValue;
    }

    results.push(result);
  }

  return results;
}
```

### 实现 lodash 的 _.get 方法

题目：

实现 `_.get(object, path (Array | String)`〔筆畫〕, [defaultValue]) 方法, `path` 可传字符串或数组，根据 `Object` 对象的 `path` 路径获取值。 如果解析 `value` 是 `undefined` 会以 `defaultValue` 取代。

示例：

```js

const object = { 'a': [{ 'b': { 'c': 3 } }] };

_get(object, 'a[0].b.c');

_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3

```

思路：

要实现这个函数的 `Polyfill`，我们需要做以下几步：

- 解析路径：路径可以是字符串或数组形式。如果是字符串，可能包含点（.）或方括号（[]），需要将其解析为数组形式。
- 遍历路径：按照路径数组逐层深入到目标对象中。
- 处理不存在的路径：如果在路径中的任何一点发现目标值不存在，返回默认值。
- 返回找到的值：如果成功找到值，返回该值。

```js
function get(object, path, defaultValue) {
  // 将路径字符串转换为数组。考虑到路径中可能使用了点或方括号，需要适当处理。
  const paths = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)\]/g, '.$1').split('.');
  
  // 逐步深入到目标对象中，使用 reduce 方法简化遍历过程。
  let result = paths.reduce((acc, key) => (acc !== null && acc !== undefined) ? acc[key] : undefined, object);
  
  // 如果最终结果是 undefined，则返回默认值；否则返回结果。
  return result === undefined ? defaultValue : result;
}

```

### 实现一个简单的 Promise， 能正常调用 then 和 catch 方法


这个可能写起来比较复制一点，主要考察你对 Promise 的掌握情况。

```js
// 新建一个 Promise 类

const Pending = 'pending'
const Fulfilled = 'resolved'
const Rejected = 'rejected'

class MyPromise {

  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  status = Pending;
  value = null;
  reason = null;
  onFulfilledCallback = [];
  onRejectedCallback = [];

  resolve = (value) => {
    if (this.status === Pending) {
      this.status = Fulfilled;
      this.value = value;
      // this.onFulfilledCallback && this.onFulfilledCallback(value);
      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value);
      }
    }
  };

  reject = (reason) => {
    if (this.status === Pending) {
      this.status = Rejected;
      this.reason = reason;
      // this.onRejectedCallback && this.onRejectedCallback(reason);
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason);
      }
    }
  };

  then(onFulfilled, onRejected) {

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === Fulfilled) {
        const x = onFulfilled(this.value);
        resolve(x);
      }

      else if (this.status === Rejected) {
        const x = onRejected(this.reason);
        reject(x);
      }

      else if (this.status === Pending) {
        // this.onFulfilledCallback = onFulfilled;
        // this.onRejectedCallback = onRejected;
        this.onRejectedCallback.push(onRejected);
        this.onFulfilledCallback.push(onFulfilled);
      }
    });
    return promise2;
  }
}

let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 2000)
  // resolve('success');
});

promise.then(value => {
  console.log('value', value);
}, reason => {
  console.log('reason', reason);
})

promise.then(value => {
  console.log('value 2', value);
}, reason => {
  console.log('reason 2', reason);
})

promise.then(value => {
  console.log('value 3', value);
}, reason => {
  console.log('reason 3', reason);
}).then(value => {
  console.log('value 3 then', value);
})
```

### 实现 Array 的 filter 方法

题目：实现数组 `filter` 方法的 `polyfill`， 例如 [1,2,3,4,5].myFilter(a => a !== 1) 输出 2 3 4 5

```js

Array.prototype.myFilter = (callback, context) {
  var result = [];
  for (var i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) {
      result.push(this[i])
    }
  }
  return result;
}
```

## 业务代码

业务代码题主要考察你的业务处理能力，阿里巴巴前端面试过程曾遇到类似的两道题目，当然这不是原题，思路类似：

### 实现 `parse` 方法， 从对像中取值替换对应标记例如：

问题如下：

```js

const data = { brand: 'Apple', model:'iPhone10,1', price: 1234 };

const tpl = '$model$, 应为$brand$手机，预估价格$price$';

parse(data, tpl) // iPhone10,1 应为Apple手机，预估价格1234

```

代码如下：

```js

// 思路：
// 获取 key 和 value
// 正则替换

function parse(tpl, data) {
  for (key in data) {
    const reg = new RegExp("\\$"+key+"\\$")
    tpl = tpl.replace(reg, data[key])
  }
	return tpl;   // iPhone10,1 应为Apple手机，预估价格1234
}

```

### 实现一个 render 方法， 从对像中取值替换对应标记

问题如下：

```js

let template = '你好，我们公司是{{company}}，我们属于{{group.name}}业务线，我们在招聘各种方向的人才，包括{{group.jobs[0]}}、{{group["jobs"][1]}}等。'

let obj = {
  group: {
    name: "阿里云",
    jobs: ["前端", "后端", "产品"]
  },
  company: '阿里巴巴'
}

function render(template, obj){
  // 你的代码实现
}
// 最终返回结果为 你好，我们公司是阿里巴巴，我们属于阿里云业务线，我们在招聘各种方向的人才，包括前端、后端等。

```

```js
function render (template, obj) {
// 代码实现
  const re = /\{\{\s*(.+?)\s*\}\}/g
  return template.replace(re, function(match, $1) {
    console.log('match', match, '$1', $1)
    let val = (new Function(`return this.${$1}`)).call(obj)
    return val
  })
}

// 你好，我们公司是阿里巴巴，我们属于阿里云业务线，我们在招聘各种方向的人才，包括前端、后端等。
render(
  '你好，我们公司是{{company}}，我们属于{{group.name}}业务线，我们在招聘各种方向的人才，包括{{group.jobs[0]}}、{{group["jobs"][1]}}等。',
  {
    group: {
      name: "阿里云",
      jobs: ["前端", "后端", "产品"]
    },
    company: '阿里巴巴'
  }
)

```

### 实现一个红绿灯

有以下三个方法：红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？

```js
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}
```

思路：使用 setTimeout + Promise then 将三个方法串联起来:

```js
const light = () => {
  Promise.resolve().then(res => {
    setTimeout(() => {
      red()
    }, 3000);
  }).then(() => {
    setTimeout(() => {
      green();
    }, 2000);
  }).then(() => {
    setTimeout(() => {
      yellow();
    }, 1000);
  }).then(() => {
    setTimeout(() => {
      light();
    }, 3000)
  });
}
// light() 

// async await 版本

const setLight = async () => {
  await setTimeout(() => { red(); setLight() }, 3000);
  await setTimeout(() => green(), 1000);
  await setTimeout(() => yellow(), 2000);
};

// setLight();

```

### url 参数获取并转换

题目：

有这样的一个 url http://www.domain.com/?user=anonymous&id=123&id=456&id=4569&city=%E5%8C%97%E4%BA%AC&enabled 需要实现一个 parseParam(url) 方法以对象方式输出携带的数据，结果如下:


```js

{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
```

思路：使用正则匹配获取字段或者使用 `split` 截取后循环输出，注意中文转码和默认赋值

```js
const parseParam = (url) => {
  let obj = {};
  const urls = url.split('?')[1];
  const queryList = urls.split('&');
  // [user=anonymous, id=123, id=45, city=%E5%8C%97%E4%BA%AC, enabled]
  for (let i = 0; i < queryList.length; i++) {
    if (/=/.test(queryList[i])) {
      const item = queryList[i].split('=');
      let [key, value] = item;
      if (obj.hasOwnProperty(key)) {
        obj[key] = [].concat([obj[key], value]).flat(Infinity).map(value => /^\d+$/.test(value) ? parseFloat(value) : value);
      } else {
        obj[key] = decodeURIComponent(value);
      }
    } else {
      obj[queryList[i]] = true;
    }
  }
  return obj;
}

// console.log('parseParam', parseParam(url));
```

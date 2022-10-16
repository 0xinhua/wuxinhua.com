---
title: 'ES10(ECMAScript2019)特征预览'
excerpt: '2019年1月末的时候，ECMA TC39终于确定了ES2019版JavaScript的新增内容，ES2019 将会增加arrays, objects, strings, symbols, try/catch 和 JSON 等方面的特征。'
coverImage:
date: '2019-04-27 12:32:49'

---


<!-- ---
title: ES10(ECMAScript2019)特征预览
date: 2019-04-27 12:32:49
tags: ES2019
--- -->

![](https://assets.wuxinhua.com//blog/assets/es10/es2019.png) 

 2019年1月末的时候，ECMA TC39终于确定了ES2019版JavaScript的新增内容，ES2019 将会增加arrays, objects, strings, symbols, try/catch 和 JSON 等方面的特征。

![](https://assets.wuxinhua.com//blog/assets/es10/mathias.png)

## Array#{flat,flatMap}

Array的原型链上增加了新的两个方法：Array.flat([tc39 proposal](https://tc39.github.io/proposal-flatMap/)) 和 Array.flat([tc39 proposal](https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flat)) 能够进行扁平化多维数组：

```javascript
var arr = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]]; 
arr.flat(); // [1, 2, 3, 4, 5, 6, Array(4)]
```
等同于`arr.flat(1)`

```javascript
arr.flat(1); // [1, 2, 3, 4, 5, 6, Array(4)]
```
逐个展开：

```javascript
arr.flat().flat() // [1, 2, 3, 4, 5, 6, 7, 8, 9, Array(3)]
arr.flat().flat().flat() // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// 超出可扁平化范围结果保持不变
arr.flat().flat().flat().flat() // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// 当然也等同于
arr.flat(2); // [1, 2, 3, 4, 5, 6, 7, 8, 9, Array(3)]
arr.flat(3); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
arr.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

`flatMap()`方法类似于数组的`map`方法，对数组的每一项使用传入的`function`，结果得到的是扁平化的数组，值得注意的是所有的结果将不会折叠，而是展示为一维数组：

```javascript
var arr = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]]; 
arr.flatMap(item => item * 2); // [2, 4, 6, NaN]
// map vs flatMap
var arr = [1, 2, 3, 4];
arr.map(item => [item, item * 2]); //  [Array(2), Array(2), Array(2), Array(2)]
arr.flatMap(item => [item, item * 2]); // [1, 2, 2, 4, 3, 6, 4, 8]
```

## BigInt

BigInt 是一个新的类型，用于表达大于 2^53 的值

## Object.fromEntries

我们已经知道可以使用`Object.entries`返回对象自身可枚举属性键值对数组，而Object.fromEntries([tc39 proposal](https://github.com/tc39/proposal-object-from-entries))则可以看做是这一过程的逆转，用数组返回可枚举对象，loadash里提供了[_.fromPairs(pairs)](https://lodash.com/docs/4.17.11#fromPairs)类似的方法。

```javascript
var obj = { foo: 1, baz: 2 };
Object.entries(obj); //  [Array(2), Array(2)] =>  [['foo', 1], ['baz', 2]]
Object.fromEntries([['foo', 1], ['baz', 2]]); // {foo: 1, baz: 2}
```

## String#{trimStart,trimEnd} 

这两个方法应该是弥补`trim`的不足，trim会直接把两头的空白均移除，`trimStart()`方法用于移除字符串开头的空白，`trimEnd()`用于移除字符串末尾的空白。

```javascript
var str = ' ECMAScript 2019  ';
str.trim(); // "ECMAScript 2019"
str.trimStart(); // "ECMAScript 2019  "
```

## Symbol.prototype.description

Symbol类型增加`description`属性，返回Symbol对象的可选描述的字符串。

```javascript
Symbol('ECMAScript2019').description; // ECMAScript2019
typeof Symbol('ECMAScript2019').description; // string
Symbol('').description;  // ""
Symbol().description; // undefined
```


## try { } catch {} // optional binding

opitionam binding[tc39 proposal](https://github.com/tc39/proposal-optional-catch-binding) catch参数可选。经常会有这种情况，并没有使用到catch内的参数：

```javascript
try {
  // do something when success
} catch (unused) {
  // do something when error
}

```
之后可以这样写：

```javascript
try {
  // ...
} catch {
  // ...
}
```

## JSON ⊂ ECMAScript

JSON也有两处的优化：行分隔符（U+2028）和段分隔符（U+2029）符号现在允许在字符串文字中，与JSON匹配。 以前，这些符号在字符串文字中被视为行终止符，因此使用它们会导致SyntaxError异常。
```javascript
eval('"\u2028"'); // ""
```

## 优化JSON.stringify 

改进了`JSON.Stringify()`方法，防止返回不符合规范Unicode字符串。

```javascript
// 之前
JSON.stringify('\uD800'); // '"�"'
// 之后
JSON.stringify('\uD800'); // '"\\ud800"'
```

# Function.prototype.toString

toString()方法现在能返回源代码字符串，包括空行和注释：
```javascript
function /* a comment */ foo () {}
foo.toString() // "function /* a comment */ foo () {}"

```
## Array.prototype.sort

ECMAScript2019版的`sort`会确保Array.sort方法是稳定的。

之前总结的 ES6 新特征点这 => [ES6(ECMAScript 6.0)新特征](https://wuxinhua.com/2017/08/28/The-es6-features-learning-notes/)。


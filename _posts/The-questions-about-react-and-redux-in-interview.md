---
title: '关于React的几道面试题'
date: '2018-03-17 00:02:20'
tags:
---
面试的过程也是一个学习的过程，能够及时定位到自己的知识盲点或者掌握得不够好的地方，这篇内容是对一些React面试题的思考总结。
一个合格的开发者，不应该满足于写出机器可运行的代码，而应该试着去理解代码背后的一些原理和思想，我用React开发移动端应用也是一边摸索学习一边实践的过程，期间我犯了很多错误，也学习到了很多东西，我以为我应该能hold住React的这些问题，但在面试过程中，我的回答并不总是让面试官满意，甚至有些偏差，所以我总结了一下近期几次面试中问到的React相关的问题，我希望在学习React的过程中能帮到你，避免犯同样的错误，也许问下面这些问题并不是最好的方法来证明一个开发者是否精通React，但这些题可以从一定程度上了解到候选人对React的掌握情况。  

##### 目录
1. [关于setState](#关于setState？)
1. [props和state的区别](#props和state的区别？)
1. [无状态组件和状态组件？](#无状态组件和状态组件？)
1. [Virtual Dom的对比过程](#Virtual Dom的对比过程？)
1. [关于React组件的生命周期](#关于React组件的生命周期？)
1. [生命周期的哪个阶段异步请求数据](#生命周期的哪个阶段异步请求数据？)
1. [什么是高阶组件(HOC)](#什么是高阶组件(HOC)？)
1. [React如果处理事件绑定](#React如果处理事件绑定？)  
1. [key如何选择](#key如何选择？)

##### 关于setState？  
**1.调用setState后发生了什么?**  

调用setState后，视图层会进行一次刷新，这背后到底发生了哪些事情？
当对象作为参数执行setState时，React内部会以一种对象合并的方式来批量更新组件的状态，类似于Object.assign()，把需要更新的state合并后放入状态队列，利用这个队列可以更加高效的批量更新state；当参数为函数时，React会将所有更新组成队列，并且按顺序来执行，这样避免了将state合并成一个对象的问题，之后会启动一个`reconciliation`调和过程，即创建一个新的 React Element tree（UI层面的对象表示）并且和之前的tree作比较，基于你传递给setState的对象找出发生的变化，最后更新DOM中需改动的部分。

**2.setState为什么是异步的？** 
从一个例子来看setState的异步：
```javascript
class App extends Component {

  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }
  add(value){
    this.setState({
      counter: this.state.counter + value
    });
    console.log(this.state.counter);
    // 第一次点击console输出0
  }
  render() {
    return (
      <div>
        <p onClick={() => this.add(1)}>
          Click to change the value.
        </p>
      </div>
    );
  }
}
```
例如在上面的代码中，点击打印出来的counter值是0，setState之后并没有立即更新counter的值，那么如果确保拿到的counter是更新过的呢？有两种解决方法： 
1.利用setState的第二个参数设置回调函数，setState调用后会触发执行这个callback函数； 

```javascript
  add(value){
    this.setState({
      counter: this.state.counter+value
    }, () => {console.log(this.state.counter);});
  }
```

2.利用setTimeout  

```javascript
  setTimeout(() => {console.log(this.state.counter)}, 0)
```
官方的解释说可以把setState看作是一个请求，而不是更新的命令，为了获得更好的性能，React会延迟更新操作，达到一次更新几个组件的目的；React的setState是异步的，有人提出质疑，这是历史原因导致的？还是说当初有意设计成异步的？[@gaearon](https://github.com/gaearon)对这个问题做了回应[issue#11527](https://github.com/facebook/react/issues/11527#issuecomment-360199710)，总结一下是出于以下几个目的：
1. 保持内部的一致性，跟props一样；
2. 在许多情况下，setState的同步渲染效率不高，异步可以将几个更新合并，提高效率；
3. 并不仅仅是出于优化方面的考虑，可以利用异步特征去做其他的事，例如你的navigator路由足够快，你跳转到别的页面了，还是能继续执行异步操作；

**3.setState的两种使用方式？**  
除了上面这种传入新的对象外，还可以使用方法作为参数来更新state，[@DanAbramov](https://twitter.com/dan_abramov)之前在twitter上的[status](https://twitter.com/dan_abramov/status/824309659775467527)也解释了这一个方法；
![](https://assets.wuxinhua.com/setState.jpg)
```javascript
// 例子
  add(value){
    this.setState((prevState, props) => ({counter: prevState.counter+value}))
    console.log(this.state.counter);
  }
```
setState() 接受一個function(state, props)作為参数传入，两个参数对应的是之前的state和props，之所以还要加入这一种方式，最主要的原因是setState的异步更新，当我们以传入对象的方式，并且多次调用setState方法的时候，实际上React做的是批量处理，React会合并这些Object，但是Object.assign在合并对象的时候，如果遇到keys相同，后面的value值会覆盖掉前面的，例如下面的示例代码，这是我理解的为什么调用三次setState目标值却只更新了一次的原因。  

```javascript
const a = {counter: 1},
	  b = {counter: 2},
	  c = { counter: 3};
const d = Object.assign({}, a, b, c);
console.log(d); // {counter: 3}
```
二者主要的区别在于：
1. 如果是通过传入Object来计算next state，并不是安全的，this.props和this.state不是同步地被更新；
2. 如果在一个方法内多次调用setState()，并不会执行多次的setState，但是如果是传入的function,这些function会被React塞到队列中，并且按顺序依次执行，具体可以查看下面的代码例子；  
3. 在function方式下，我们的更新操作就不一定需要写在当前Class里，并且如果我们需要额外的参数来计算或者操作下一步的state的时候，还可以使用闭包：

```javascript
function multiplyAdd (value) {
  return function add( preState, props) {
    return {
      counter: preState.counter + value
    }
  }
}

```

<iframe height='466' scrolling='no' title='setState with Function' src='//codepen.io/amnEs1a/embed/LdyPdZ/?height=466&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/amnEs1a/pen/LdyPdZ/'>setState with Function</a> by kevin (<a href='https://codepen.io/amnEs1a'>@amnEs1a</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

##### props和state的区别？ 

在React中，数据总是单向地自上往下流动，组件中的一些状态或者数据的管理有时让人很头疼，尤其是在设计一些组件的时候，props是properties的缩写，可以认为是组件的属性，他们从上级获取，并且是不能改变的，如果想要改变props值，只能在父级组件中修改，然后传递给子组件。

 场景 | props | state
---|---|---
是否可以从父组件中获取初始值 | 可以 | 可以
是否能被父组件改变 | 可以 | 不可以
是否能设置默认值 | 可以 | 不可以
是否在组件里改变值 | 不可以 | 可以
能否给子组件设置初始值 | 可以|可以
能否在子组件里被改变值|可以|可以

**总结一下**：  

1. props用于定义外部接口，使用state来存储控制当前页面逻辑的数据；  
2. props的赋值是在父级组件，state赋值在当前组件内部；  
3. props是不可变的，而state是可变的；  
4. 使用props比state会有更好的性能；    

##### 无状态组件和状态组件？

**有状态和无状态两种形式的组件：**  

1. Stateless Component（无状态组件）  

只有Props,没有state，当你不需要使用组件的生命周期的时候可以考虑使用这种方式，组件的数据流向更加简洁，组件也更方便测试。

2. Stateful Component（有状态组件）  

Props和state都有使用，当你的需要再客户端保持一些数据的时候，二者会被用到；   

###### Class Components vs Functional Components
Class Components写法：  
```javascript
class Hello extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      return(
            <div>
                Hello {props}
            </div>
        )
    }
}
```
Functional Components的写法： 
```javascript
  const Hello = ( props ) => (<div>Hello{props}</div>)
```

##### Virtual Dom 的对比过程？     
这个问题主要考察的是对React的Diff算法的了解，Diff算法究竟是如何工作的？
在React中最神奇的部分莫过于Virtual Dom以及diff算法，React利用这两个东西高效地解决了页面渲染的问题。
（暂略~）

##### 关于React组件的生命周期？  

手绘组件生命周期及钩子函数执行流程(忽略我潦草的英文单词)：
![](https://assets.wuxinhua.com/react-lifecycle.jpeg)  
React组件生命周期大致分为三个阶段：装载->更新->卸载，并且在每个阶段都提供了方法(也叫“hooks”钩子)，便于我们在这些函数中更新我们的UI和应用的状态。

###### constuctor

当对象被创建的时候，construnctor会被调用，所以这里是最佳的地方用来初始化state,也是在组件里唯一的地方我们能够直接使用this.state来定义一个状态。

###### componentWillMount

当props和state都设置好，React真正进入组件生命周期阶段，第一个函数是componentWillMount,这个方法和constructor一样都是只会被调用一次，会在第一次的render调用前执行，由于还没有执行render，所以我们无法获得dom，也无法使用refs。如果需要操作dom,这并不是一个合适的地方，我之前犯得的错误是在这个位置去做ajax请求，这一点会在下面这个问题中详细讲到。这个函数能起到什么作用？貌似并不大，props和state都定义好了，如果你需要根据props来设置state，或者在更新前修改state值，可以在这里来做。

###### componentDidMount

componentDidMount与componentWillMount不同的地方在于componentWillMount浏览器和服务器端均可运行，而componentDidMount在服务器端无法运行，既然“装载”是一个创建组件并且放到DOM树上的过程，那么真正的“装载”是不可能在服务器来完成。这个解释是我在上在[@程墨](https://www.zhihu.com/people/morgancheng/activities)的[《深入浅出React和Redux》](http://item.jd.com/12073933.html)书中看到的。

当组件更新在DOM上之后，componentDidMount会被执行，所以在这个函数适合做以下几个事情：
1. API接口数据的异步请求；
2. 例如一些需要使用到DOM的库(如D3.js)，可以在这里进行初始化;

###### componentWillReceiveProps

根据props和nextProps比较props是否发生变化，再调用setState这点都没问题，容易让人误解的地方在于它什么时候触发，它并不是props改变了会触发，即使props没有变，它仍然会执行(为什么？因为React也不知道你的props有没有发生变化，它需要在这个地方进行对比)，除非你的组件并没有传递下来的props，这个方法将不会触发，如果我们需要在props发送变化时更新我们的state，那么这里是个合适的地方。

###### shouldComponentUpdate  

shouldComponentUpdate是生命周期函数中比较重要的函数，在使用shouldComponentUpdate(nextProps,nextState)时值得注意的几点：
1. 在初始阶段和使用forceUpdate()时都不会执行；
2. 不用的时候默认返回true，一旦使用就必须给返回Boolean类型的值；
3. 当子组件的state发生变化时，即使父组件返回false，也不能阻止子组件rerender；
4. 出于性能的考虑，不建议在这个函数中使用JSON.stringify()来比较值是否改变；

###### componentWillUpdate 和 componentDidUpdate  

在使用React的过程中，我基本没有使用到这两个函数；如果shouldComponentUpdate的返回值是true，将会执行这两个函数，

###### componentWillUnmount  

在这个阶段，组件已经不再使用，需要从Dom中移除，在移除前会被执行，这个函数中可以用来做以下事情：  
1. 例如登出时，清除跟用户相关的数据、auth token等
2. 清除setTimeout或者setInterval循环；

##### 生命周期的哪个阶段异步请求数据？

**为什么选择在componentDidMount函数中来执行ajax异步请求？**

根据文档的描述，在componentWillMount改变state将不会引起rerenering，cunstructor也能起到同样的作用，由于这个这个函数有点让人摸不着头脑，所以React core组的成员在讨论是否可以在将来的版本移除掉这个函数[issues#7671](https://github.com/facebook/react/issues/7671)，但还是有一些区别，例如在constructor中你不能使用setState方法；但是如果你使用flux框架(例如redux)来更新数据，你在这个地方请求数据，将不会出现问题。

如果你在这个函数绑定了事件处理，在componentWillUnMount里移除这些事件,在客户端这一切能很好地运行，componentWillMount也会在服务端运行，但如果是服务端渲染，componentWillUnMount将不会在服务端里执行，所以这些事件不会被移除掉。 

最主要的原因是：

1. 在componentWillUnMount中无法确保在执行render前已经获得了异步请求的数据，componentDidMount不存在这个问题；  
2. 为了性能的需要，Fiber有了调度render执行顺序的能力，所以componentWillMount方法的执行变得不确定了；  
3. 无法保证ajax请求在组件的更新阶段里成功返回数据，有可能当我们进行setState处理的时候，组件已经被销毁了；

##### 什么是高阶组件(HOC)？  
 
 React的高阶组件HOC是`Higher order components`的缩写，在React中可以简单理解为是组件包裹另一个React组件。HOC最好的学习例子是React-Redux源码中对connect的实现，Connect高阶组件，它是真正连接Redux和组件的东西，Provider在最顶层提供store，Connect通过context来接收store,并且把store中的state映射到射到组件props。简要地描述一下我理解的React-redux中connect的实现过程，源码较长，截取了其中的一部分： 大致的调用过程是：createConnect => connectAdvanced => wrapWithConnect => Connect组件，connect是一个高阶函数，也是一个柯里化函数，需要传入mapStateToProps、mapStateToProps等参数及组件，返回一个产生Component的函数（wrapWithConnect），wrapWithConnect生产出经过处理的Connect组件。
 ```javascript
export default function connectAdvanced(
  selectorFactory,
  {
    getDisplayName = name => `ConnectAdvanced(${name})`,
    ....略
    renderCountProp = undefined,
    ...connectOptions
  } = {}
) {
  const subscriptionKey = storeKey + 'Subscription'
  const version = hotReloadingVersion++

  const contextTypes = {
    [storeKey]: storeShape,
    [subscriptionKey]: subscriptionShape,
  }
  const childContextTypes = {
    [subscriptionKey]: subscriptionShape,
  }

  return function wrapWithConnect(WrappedComponent) {
    const wrappedComponentName = WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component'

    const displayName = getDisplayName(wrappedComponentName)

    const selectorFactoryOptions = {
      ...connectOptions,
      getDisplayName,
      methodName,
      WrappedComponent
    }
    ...略
    // 创建Connect组件
    class Connect extends Component {
        constructor(props, context) {
          super(props, context)
          this.state = {}
          this.renderCount = 0
          this.store = props[storeKey] || context[storeKey]
          this.setWrappedInstance = this.setWrappedInstance.bind(this)

          this.initSelector()
          this.initSubscription()
        }

        getChildContext() {
          const subscription = this.propsMode ? null : this.subscription
          return { [subscriptionKey]: subscription || this.context[subscriptionKey] }
        }
    }
    // 返回拓展过props的Connect
    return hoistStatics(Connect, WrappedComponent)

 ```

HOC提供了一些额外的能力来操作组件：例如操作Props，通过refs访问到组件实例，提取 state等，以下是高阶组件的一些使用场景：  
1. 重用代码，当我们发现需要做很多重复的事情，写重复代码的时候，可以把公用的逻辑抽离到高阶组件中来；
2. 增加现有组件的行为，不想修改现有组件内部的逻辑，通过产生新的组件，并且实现自己需要的功能，对原组件也没有侵害；

##### React如果处理事件绑定？  
在React中处理事件与Dom中的处理很相似，但也有一些区别：
在HTML中：
```javascript
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
在JSX中：
```javascript
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
不同在于：
1. 在React中添加事件需要使用**camelCase**格式；
2. 无法使用return false的方式来阻止事件的一些默认行为，必须得使用preventDefault。
3. 在JSX中我们传递方法作为事件的参数，而不是一个字符串；

我们知道e.preventDefault是w3c定义的方法，在IE中得使用e.returnValue = false来阻止默认行为，那React是如何做到兼容的呢？  
React使用了一个叫SyntheticEventd的对象，所有的事件继承至SyntheticEvent，并且它是跨浏览器的，它和浏览器的原生事件接口一样，包括提供stopPropagation() 和 preventDefault()方法来阻止冒泡和阻止默认行为。
SyntheticEvent的特点：  
1. 跨浏览器
2. 为了性能问题，SyntheticEvent是重复利用的，无法再异步的情况下调用事件

[Handling Events 文档](https://reactjs.org/docs/handling-events.html) 以及[SyntheticEvent 接口](https://reactjs.org/docs/events.html)  

##### Key值如何选择？

在我面试的时候被问了两个关于key值的问题：
1. key值的作用？
2. 你会怎样设置key值？

刚刚接触写React代码的时候，如果没有设置key值或key值重复的情况，都会出现关于key值的warning警告，那key值起到什么作用？先来看看官方文档是怎么说的：

 > Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:

翻译过来就是便于React用key值来标识哪些元素是改变的，新增的，或者移除的。通常我的用法是使用每项的ID来作为key值，我的写法类似下面这种：
```JavaScript
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={item.id || index}
  />
)}
```

但有时并不是所有数据项都具备ID这个字段，所以我一般还会加上下标，官方提示说不建议使用index下标来做作为key值，它可能会对性能和组件的状态造成影响。所以总结下来是：

1. 使用数据项中的ID；
2. 生成唯一标识字符串，例如使用[shortid](https://www.npmjs.com/package/shortid)；  
3. 使用index数组下标； 

以上。

##### 附录

1. [Functional setState is the future of React](https://medium.freecodecamp.org/functional-setstate-is-the-future-of-react-374f30401b6b)  
2. [setState：这个API设计到底怎么样](https://zhuanlan.zhihu.com/p/25954470)  
3. [setState() Gate](https://medium.com/javascript-scene/setstate-gate-abc10a9b2d82)  
4. [ReactJS state vs prop](https://stackoverflow.com/questions/23481061/reactjs-state-vs-prop) 
5. [why is setState asynchronous?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)  

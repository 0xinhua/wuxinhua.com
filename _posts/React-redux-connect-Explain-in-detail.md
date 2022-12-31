---
title: '对React-redux中connect方法的理解'
excerpt: 'Redux由Flux框架演变而来，但在Flux的基础上，Redux改变了整个框架中某些角色的作用，例如在Flux中你可以拥有多个store，每个store存储自己对应的那部分状态,在Redux中，你只能维护一个store,存储了整个应用的所有状态'
date: '2017-07-30 14:11:48'
tags: 'React-Redux'
---

### 关于React-redux   
Redux是React全家桶的重要一员，之前在知乎上也看到类似的提问：[该如何通俗易懂的理解Redux](https://www.zhihu.com/question/41312576)?  
Redux是JavaScript的状态容器，Redux的概念简单明了：  

**1. 应用中所有的状态都是以一个对象树的形式存储在一个单一的store中；**  
**2. 想要改变应用的中的状态时，需要dispatch对应的action,这也是唯一的更新store的方法；**  
**3. 通过编写reducer来维护状态，返回新的state,并不直接修改原来数据；**

### 为什么会有Redux
在React中，数据的传递主要采用state和props，props得由父级分发下来，而state是组件中可自行管理的状态，这意味着React并没有让数据回溯的能力，数据只能单向向下分发，或者自行内部处理，举一个简单的例子，父组件可以使用props向子组件传递数据，子组件可以通过触发回调函数来改变父组件的状态，如果是那种没有嵌套关系的组件，该如何来实现通信呢？为了解决这个问题,Redux的方法就是将store放在根目录顶层组件中，一层层往下分发给各子组件,在子组件中进行调用，Redux的作用是让状态变得更加可预测、并且更容易管理。

Redux由Flux框架演变而来，但在Flux的基础上，Redux改变了整个框架中某些角色的作用，例如在Flux中你可以拥有多个store，每个store存储自己对应的那部分状态,在Redux中，你只能维护一个store,存储了整个应用的所有状态，Redux更倾向于把store分发下去，dispatch action的时候，reducer根据状态对象的key值再将store进行拆分，reducer能拿到store中对应的那一部分进行处理，Redux提供createStore、combineReducers、applyMiddleware等一系列方法来配合React-redux使用帮我们更好的对这个store进行管理，这里要详讲的是React-redux中的connect方法。


### Store与视图层的绑定

#### Provider组件  
想要把store绑定在视图层上，得用到React-redux中的两个主角:Provider和Connect，在[api文档](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store)第一段话,作者说通常情况下你无法使用connect()去connect一个没有继承Provider的组件，也就是说如果你想在某个子组件中使用Redux维护的store数据，它必须是包裹在Provider中并且被connect过的组件，Provider的作用类似于提供一个大容器，将组件和Redux进行关联，在这个基础上，connect再进行store的传递。

Provider组件源码：

``` javascript
export function createProvider(storeKey = 'store', subKey) {
......
class Provider extends Component {
    getChildContext() {
        return { [storeKey]: this[storeKey], [subscriptionKey]: null }
    }
    constructor(props, context) {
        super(props, context)
        this[storeKey] = props.store;
    }

    render() {
        return Children.only(this.props.children)
    }
}
}
```
从源码中可以看到，作者用了React的Context,Context解决了一个React中很常见的问题：当你的组件嵌套越来越深的时候，context能让你父组件和其它里层组件之间的通信变的更方便，createProvider方法将返回一个Provider组件，该组件接受store和子组件，在Provider中定义了getChildContext方法来传递store，那么在子组件中利用contextTypes，你就能利用context访问到父级组件传递的store数据了。

**<Provider store>**

**Props**
1. store:应用中唯一的状态store
2. children: 应用的子组件  

例子：

```javascript
<Provider store={store}>
    <Router history={history}>
    <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
    </Route>
    </Router>
</Provider>
```

#### connect方法
来看下connect函数到底是如何将store和组件联系在一起的，注意到[api](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)文档中有这样的一句话:
> It does not modify the component class passed to it; instead, it returns a new, connected component class for you to use.  

connenct并不会改变它“连接”的组件，而是提供一个经过包裹的connect组件。 conenct接受4个参数，分别是mapStateToProps，mapDispatchToProps，mergeProps，options(使用时注意参数位置顺序)。

> connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

mapStateToProps(state, ownProps) 方法允许我们将store中的数据作为props绑定到组件中，只要store更新了就会调用mapStateToProps方法，mapStateToProps返回的结果必须是object对象，该对象中的值将会更新到组件中，例子：

``` javascript
const mapStateToProps = (state) => {
    return ({
        count: state.counter.count
    })
}
```
mapDispatchToProps(dispatch, [ownProps]) 第二个参数允许我们将action作为props绑定到组件中，mapDispatchToProps希望你返回包含对应action的object对象，例如：

``` javascript
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increase: (...args) => dispatch(actions.increase(...args)),
    decrease: (...args) => dispatch(actions.decrease(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(yourComponent)
```
当你想对组件的render更新进行更好的控制的时候，它也支持返回function方法，具体可以点击[#279](https://github.com/reactjs/react-redux/pull/279)查看，例子：

``` javascript
const mapDispatchToProps = {
    // increment: () => increment(1),
    increase, // import increase function from action
    decrease 
}
```
mergeProps(stateProps, dispatchProps, ownProps) 该参数非必须，redux默认会帮你把更新维护一个新的props对象，类似调用Object.assign({}, ownProps, stateProps, dispatchProps)。

而options是为了更好的定制化设置的一个参数，允许返回5个boolean、function的值，我平时基本上没有接触到，想了解的可以参考api文档。



### 附参考文档地址：
1. [Redux中文文档](http://www.redux.org.cn/)
2. [Redux api介绍](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
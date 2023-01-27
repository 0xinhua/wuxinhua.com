---
title: 'React服务端渲染(SSR)初探'
excerpt: 'Isomorphic JavaScript”表示JavaScript代码可以在Server及Client两端执行。SSR(Server side Render)服务端渲染，顾名思义页面的渲染工作将在服务端完成，目前通常有两种选择：SSR(服务器渲染) 与 CSR(客户端渲染)，无论哪种方式，最终用户所看到的页面是一致的。'
date: '2017-11-20 11:16:30'
tags: React服务端渲染 SSR React
---
在本周(11月16日)小组的前端技能分享会上，我作了主题为“React服务端渲染初探”的前端分享，分享讨论的主要内容是如何使用React完成服务器端渲染，及尝试使用 Next.js构建服务端渲染应用，也是我第一次边讲边码代码，虽然中途出了bug,但还好顺利地解决并完成了演示，本文是基于我的keynote做的分享内容总结。

##### #关于Isomorphic和Universal  

从社区的两个术语：isomorphic(同构) 和 universal(通用)开始本篇文章:
> “Isomorphic means running the same code on the client and the server.”  

> “Universal means that it runs not only on servers and browsers, but on native devices and embedded architectures as well."  

“Isomorphic JavaScript”表示JavaScript代码可以在Server及Client两端执行。  
在目前社区最火的几个前端框架中，不管是Angular还是React，在github上都会有很多带这两个关键字的脚手架和示例，前端同构慢慢变成了一种流行的构建方式；React比较吸引我的地方之一就在于它的客户端-服务端“同构”特征，React的组件、代码能够实现最大程度的复用，而服务端渲染就是同构的一个非常好的例子；在Node.js出现之前，前端开发的主要语言和技能是HTML/CSS/Javascript,后端一般基于Java/PHP等语言，在PHP和JSP/ASP大行其道的时候，一切内容都是服务端渲染；随着前端技术、框架的发展和崛起，为了节省服务器资源，出现了前后端分离的模式，各端专注于自己的那一部分；再后来Node.js给我们带来了在服务端使用Javascript的机会，Javascript慢慢渗透到服务端，前后端同构的方式再次被拿出来讨论并实践。  

在计算机科学领域，有两大难题，如何让缓存失效(cache invalidation)和如何给各种东西命名，确实“同构”这个词并不是很直观，有一定的局限性，于是就有人提出给它换个名称，Micheal Jackson([@mjackson](https://github.com/mjackson)) 提出了使用“Universal JavaScript”作為新的命名，意在说明不仅仅是客户端和服务端，而是所有地方;但我个人认为Universal这个词过于宽泛了，对于我们来说仍然是一头雾水，具体可以在React上查看这个[pr](https://github.com/facebook/react/pull/4041#issuecomment-109420008)。

##### #什么是服务端渲染(SRR)？  

SSR(Server side Render)服务端渲染，顾名思义页面的渲染工作将在服务端完成，目前通常有两种选择：SSR(服务器渲染) 与 CSR(客户端渲染)，无论哪种方式，最终用户所看到的页面是一致的。（以下SSR代表服务端渲染、CSR代表客户端渲染）

##### #CSR vs SSR  

1. 原本由服务器执行的渲染任务转移给了客户端，这在大量用户访问的时候大大减轻后端的压力。让后端专注做后端应该做的事情，性能将大大提高。
2. 随着这些年Javascript的崛起，特别是在Node.js出现以后 JS 工程师 维护后端的成本大大降低。
3. 最大的区别在于使用SSR情况下服务器端发送给前端的是已经
准备好的HTML页面；无需等待Javascript下载和执行完。  
4. 使用SSR会页面会提前渲染好，用户能更早得看到页面，但在JavaScript加载执行完之前，页面仍然是不可交互的，比如在这个区间点击某个按钮，并不会触发起效。

###### #客户端渲染

（以基于React做的SPA的页面为例说明加载和渲染过程）  
1）客户端请求页面资源 ；  
2）服务器先返回index.html模板页面；  
3）请求JS、CSS等其他文件；  
4）React执行,组件根据生命周期做一些数据加载初始化操作；  
5）React渲染组件呈现页面；（页面可见、可交互）  

在Chrome设置的“Debugger”里禁掉“Disable JavaScript”选项，会发现客户端只接受到一个HTML文件和对应css文件，但页面并没有实际内容，由于传统的搜索引擎只会从 HTML 中抓取数据，导致前端渲染的页面无法被抓取。在没有缓存和网速不给力的情况下，还会出现白屏现象，让用户等待白屏结束并非一个很好的体验，总结一下即两个缺点：
a.不利于SEO；  
b.首屏体验不佳；

###### #服务端渲染

1）客户端请求页面资源；  
2）服务端请求页面所需数据；  
3）服务器把渲染页面,返回给浏览器端；（页面可见）  
4）客户端请求JS和CSS等其它资源；（页面可见）
5）React渲染组件呈现页面；（页面可见、可交互）  
**优点**：  
a.利于SEO，服务器端渲染可以让搜索引擎更容易读取页面的meta信息以及其他SEO相关信息，大大增加网站在搜索引擎中的可见度。  
b.减少页面初始化的加载时间；  
c.同构的思想，代码复用，便于维护；
c.服务端渲染会给服务端造成一定的压力；

##### #SSR应用场景  

1）需要SEO优化的页面;  
2）内容到达时间(time-to-content)与转换率直接相关的业务;  
3）首屏数据量较大的页面;

##### #React服务端渲染原理  

React提供renderToString 和 renderToStaticMarkup方法用于将Virtual DOM渲染成HTML字符串，服务端渲染出来的只是静态DOM，还不能使用React、Redux等定义的State, props,事件等，必须在客户端实例化React,而在客户端渲染之前需要获取页面初始化所需的数据。

**renderToString和renderToStaticMarkup的区别**：  

```javascript
renderToString(react element)
renderToStaticMarkup(react element)
```

两个方法均接受React组件作为参数，使用 renderToStaticMarkup 渲染出的是不带data-reactid的纯html，在前端react.js加载完成后,之前服务端渲染的页面会抹掉之前服务端的重新渲染(可能页面会闪一下)，换句话说前端React不认识之前服务端渲染的内容,render方法会使用innerHTML的方法重写#react-target里的内容；

而使用renderToString方法渲染的节点会带有data-reactid属性,在前端React加载完成后, 前端React会认识之前服务端渲染的内容,不会重新渲染DOM节点,React接管页面,执行 componentDidMout绑定浏览器事件等这些在服务端没完成也不可能执行任务；

##### #如何搭建基于React的服务端渲染应用

利用React + Express实现：

1）结合React、React-router、Webpack等搭建一个服务端渲染项目；  
2）利用ReactDOMServer.renderToString 和renderToStaticMarkup方法；  
3）React-router提供对应了对应服务端渲染方案；  
4）使用express搭建web服务器；  

利用网上的集成框架

例如[Nextjs](https://zeit.co/about)。

以结合React + Express + RR + Redux实现服务端渲染为例子，看下这个过程需要注意哪些问题：

1) React.renderToString是同步的，所以没有办法使用组件的任何一个生命周期方法，来获取异步的数据？  

2) 使用Redux过程中，客户端组件需要从我们的store中拿一个初始化的状态值，即__INITIAL_STATE__  

3) 前端有对应的路由库，服务器端渲染怎么处理页面跳转？  

**对应问题的解决方案**：

1）在组件内定义static方法异步请求数据，渲染前先执行请求获取页面初始数据；

2）Server端获取初始数据 => ReactDOMServer.renderToString(<App />) => 获取初始state插入模板中=> Client代码获取window.INITIAL_STATE => 注入<Provider store={initState} /> => 前端React接管页面

3）根据对应的rul路径，返回对应的组件，路由问题可以交由React-router解决，React-router为服务端渲染提供了对应的解决方法，可以查看下面两个例子：

v3版本中在服务器端用一个 match 方法将拿到的 request url 匹配到我们之前定义的 routes，解析成和客户端一致的 props 对象传递给组件。

``` javascript
// V3 版本使用match方法
const ReactRouterContext = React.createFactory(RouterContext);
const ReduxProvider = React.createFactory(Provider);
match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
      if (err) {
        res.status(503);
      } else if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        return res.send(`<!DOCTYPE html>${ReactDOMServer.renderToString(
          ReduxProvider({ store }, ReactRouterContext(renderProps)))}`);
      }
      return null;
    });  
```

``` javascript
// v4版match方法已弃用
const context = {}
const markup = ReactDOMServer.renderToString(
  <StaticRouter
    location={req.url}
    context={context}
  >
    <App/>
  </StaticRouter>
)

if (context.url) {
  // Somewhere a `<Redirect>` was rendered
  redirect(301, context.url)
} else {
  // we're good, send the response
} 
```

##### #整合Redux、React-router、Express  

后端使用express搭建服务器，为前端提供静态资源服务：

```javascript
// Express服务器
const express = require('express')
const render = require('./handleServerRender.js')
const app = express();
const port = 2048;

app.use('/dist', express.static('./dist'));
app.use('*', render.handleRender);

app.listen(port, ()=> {
    console.log(`🌎  SSR Listening on port ${port}.`);
})
```

配合Redux:

```JavaScript
// 客户端 app.js
class App extends Component {
    render() {
        const {history, store} = this.props
        return (
            <BaseLayout>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <RootRouters location={location} /> 
                    </ConnectedRouter>
                </Provider>
            </BaseLayout>
        )
    }
}
    App.propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
export default App
```

渲染前通过调用static定义静态方法获取页面初始化数据，服务端配合React-router的renderRoutes进行页面组件渲染，注意React-router v4版变化较大，之前的方法已经被弃用：

```JavaScript
// preFetchData.js
export const preFetchData = (store, location) => {
    const branch = matchRoutes(routes, location);
    const promises = branch.map(({ route, match }) => {
        if(route.component) {
            route.component.prefetch
            ? route.component.prefetch(store, match)
            : Promise.resolve(null);
        }
    })
    
    return Promise.all(promises)
}
```

使用React-router提供的服务端渲染方法：  

```javaScript
// handleServerRender.js
export const handleRender = (req, res, next) => {
    const history = createMemoryHistory()
    const store = createdStore('', history)
    const initialState = store.getState()
    return preFetchData(store, res.url)
        .then((data) => {
            const componentHtml = renderToString(
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                         <div>
                            {renderRoutes(routes, { ...data })}
                        </div> 
                    </ConnectedRouter>
                </Provider>
            )
            return res.status(200).send(
                html(componentHtml, initialState)
            ); 
        })
        .catch((err) => {
            console.log(err);
        })
}

```

在返回静态字符串模板函数里，将初始state挂载在window上，方便客户端渲染时，Redux的createStore方法进行调用:

```javascript
// 服务端html.js
<script> window.__INITIAL_STATE__ = ${JSON.stringify(state)} </script>
```

```javascript
// 客户端createStore.jss
import { createStore, applyMiddleware }  from 'redux'
const createdStore = (initState, history) => {
    const middleware = [routerMiddleware(history)]
    const initialState = initState || {};
    // config._ENV_ === 'development' ?
    //     middleware.push(createLogger()) : null
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(...middleware)
    )
    return store
}

export default createdStore

```

```javascript
// React渲染root节点main.js
const MOUNT_NODE = document.getElementById('root')

const render = () => {
    const history = createHistory()
    const initialState = window.__INITIAL_STATE__
    const store = createdStore(initialState,history)
    ReactDOM.render(
        <App 
            history={history}
            store={store}
        />, 
        MOUNT_NODE
    )
}

render()
```

##### #关于Next.js

Next.js是一个小巧的基于React、Webpack、Babel的客户端渲染universal JavasScript web app框架，体验之后它给我的感觉就是它提供了一种便利的方式来创建新的Web应用，足够简单，并且零配置，你不用在配置Webpack、Babel等上浪费太多的时间，所有的东西框架都已经给你准备好，当然它也支持开发者对其中的一些配置进行扩展。
总结一下Next.js的特征：

1）服务器端渲染(默认);  
2）自动代码切分, 加速页面加载;  
3）简单的客户端路由(基于页面);  
4）基于Webpack的开发环境, 支持热模块替换(HMR: Hot Module Replacement);  
5）可以使用Express 或其他Node.js服务器实现;  
6）使用Babel和Webpack配置定制;  

##### #使用Next.js搭建SSR项目  

从零开始搭建一个基于Next.js的web项目：  

```bash
// 在本地创建一个项目根目录
$ mkdir react-next-example

// 切换到项目根目录
$ cd react-next-example

// 用npm初始化项目
$ npm init -y

// 将react和next安装到本地依赖
$ cnpm i --save react react-dom next

// 创建路由文件夹pages
$ mkdir pages

// 写入index.js页面

$ cd pages
$ vi index.js
```

添加如下代码

```javascript
import React from 'react'

const cssStyle = {
    color: 'red',
    fontSize: '25px'
}

export default (props) => (
    <div>
        <h3 style={cssStyle}>Home page</h3>
    </div>
)
```

```bash
// vi package.json添加运行命令
{
  "scripts": {
    "dev": "next"
  }
}
// 执行命令,在浏览器3000端口访问该页面
$ npm run dev

```

##### Next.js实践总结  

相比于自己搭建Express服务器来实现服务端的渲染，Next.js直接一步到位，帮我们做了很多工作，在使用Next.js的时候，回头再来看一下Next.js是如何处理下面几个问题的：  

###### 如何获取初始化数据Props和状态State?  

Next.js提供了getInitialProps方便获取初始数据，你可以把它当成组件的内的一个静态方法，可以这样定义它：  

```javascript
class List extends React.Component {
  static getInitialProps() {
    return { data: "List Data" };
  }
  render() {
    return <div>{this.props.data}</div>;
  }
}
```

或者这样：  

```javascript
const List = ({ data }) => <div>{data}</div>;
Foo.getInitialProps = () => ({ data: "List Data" });
```

###### 如何处理Ajax异步请求?  

getInitialProps使我们能够获取页面所需的数据，这些数据有可能是需要使用Ajax从接口服务中获取，在Next.js中可以使用Promise来进行异步请求，当然你还可以使用async/await来实现：  

```javascript
const index = (props) => (
    <div>
        <Link  href={`/list?id=${id}`}>to list page</Link>
        { props.strike ? props.strike.map((item, index) => <div key={index}>
            <ul>
                <li>{item.country}</li>
                <li>{item.location}</li>
                <li>{item.date}</li>
            </ul>
        </div>): undefined }
    </div>
)

index.getInitialProps = async function() {
    const res = await fetch(`http://api.dronestre.am/data`, ...headers)
    const data = await res.json()
    const strike = data.strike.slice(0,10)
    return { strike:  strike}
}
```

###### 路由的处理?

Next.js基于文件目录结构作为路由，实现前端页面跳转，所以每个放到pages文件夹中的组件将会自动映射为一个基于服务器的路由，比如磁盘上的pages/about.js组件将会自动服务于/about这个URL。这套路由比React-router系统简单明了,无需再写额外的代码组织路由，但个人认为缺点在于当路由结构较复杂时候，文件结构的嵌套也会变得复杂，不便于维护。举例如下：

```javascript
// 所有路由基于pages文件夹下的文件目录结构：
.
├── pages                       # pages文件夹
│   ├── index.js                # index页面，也是/默认访问页面,如果没有找到资源会跳转到Next.js自带的404页面
│   ├── list.js                 # list页面，通过/list能访问该页面
│   ├── test-page.js            # test-page页面，通过/test-page 能访问该页面,'-'和‘_’均支持
│   └── home                    # index.js页面，也是/默认访问页面
│       └── home.js             # home页面，通过/home无法访问到该页面
│       └── index.js            # home页面，通过/home能访问到该页面
```

###### CSS的实现  

Next.js提供两种方案来实现CSS的模块化，一种是styled-jsx方式，另一种是CSS-in-JS：  
styled-jsx形式：  

```javascript  
export default () =>
  <div>
    Hello world
    <p>scoped!</p>
    <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: red;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
    <style global jsx>{`
      body {
        background: black;
      }
    `}</style>
  </div>
```

CSS-in-JS方式：  

```javascript
export default () => <p style={{ color: 'red' }}>hi there</p>
```

或者这样：  

```javascript
const cssStyle = {
    color: 'red',
    fontSize: '25px'
}

export default (props) => (
    <div>
        <h3 style={cssStyle}>Test page</h3>
    </div>
)

```

附参考资料：  

[1.Universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9)  
[2.Universal JavaScript Apps with React Router 4](https://ebaytech.berlin/universal-web-apps-with-react-router-4-15002bb30ccb)  
[3.Start Learning Next.js to build server rendered JS web apps with React](https://learnnextjs.com/)

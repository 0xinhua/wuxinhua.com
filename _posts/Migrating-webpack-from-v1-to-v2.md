---

title: 'webpack v2升级踩坑笔记'
excerpt: '前端模块打包技术日新月异，webpack在今年1月份和6月份左右接连更新了v2和v3版本,为了减少冗余模块，缩减bundle文件大小，webpack v2中也加入了tree-shacking,关于tree-shacking的特征，可以查看知乎[如何评价 Webpack 2 新引入的 Tree-shaking 代码优化技术？](https://www.zhihu.com/question/41922432)的讨论'
coverImage: ''
date: '2017-07-14 17:37:22'

---

从Grunt->gulp->webpack,再到目前当红明星[rollup](https://rollupjs.org/)，前端模块打包技术日新月异，webpack在今年1月份和6月份左右接连更新了v2和v3版本,为了减少冗余模块，缩减bundle文件大小，webpack v2中也加入了tree-shacking,关于tree-shacking的特征，可以查看知乎[如何评价 Webpack 2 新引入的 Tree-shaking 代码优化技术？](https://www.zhihu.com/question/41922432)的讨论。

webpack在推出 v2之后迅速推出了v3版本，前段时间在知乎看到webpack[作者LarkInn(他已经入驻sf)](https://segmentfault.com/u/thelarkinn)说后续会维持一个更快、一致和更稳定的发布周期[点这](https://www.zhihu.com/question/61533563)，难道要步Angular的后尘，作为吃瓜群众表示很震惊，因为目前自己这边项目webpack还停留在1.x版本，鉴于减少日后升级难度的想法，包括后续要做代码和流程优化，我将webpack升级到了v2版本，在这主要想把这个升级过程遇到的一些问题分享出来，也方便大家踩坑。

### 1. 更新版本号
我能想到最简单粗暴的做法就是直接把版本号改了下载新包看下会发生什么。使用*npm info webpack*查看了一下版本的发布信息，我更新到2.6.1版本，也是3.0前的最后一个版本，
期待一大堆报错，很尴尬，发现webpack仍然使用1.x版本工作，也就是说包并没有更新到，查了一下发现可能缓存造成的，使用*npm cache clean*但貌似也不管用，索性直接把node_module删除了，重新安装了一下模块，打包，果然报错了：  


### 2.resolve

报错信息：
``` 
throw new WebpackOptionsValidationError  
configuration.resolve.extensions[0] should not be empty
...    
```
提示是resolve.extensions写法有问题，查看了一下[extensions文档](https://webpack.js.org/configuration/resolve/)
 
> *This option no longer requires passing an empty string.* 不再支持空字符的写法了。

webpack1.x写法：
```javascript
resolve: {
    root: ....
    extensions: ['', '.js', '.jsx', '.json']
}
```
webpack2写法:
``` javascript
resolve: {
    root: ....
    extensions: ['*', '.js', '.jsx', '.json']
}
```

报错信息：
``` 
configuration.resolve has an unknown property 'root'. These properties are valid:
...
```

原来root写法也变了,root放在modules里了。

```javascript
resolve: {
    modules: [
        path.resolve(__dirname, 'src'), 'node_modules'
    ]
}
```

### 3.loaders to rules

接下来应该就是一堆loader写法有问题，loader已经全部改成了rules的写法，并且为了更加严谨？之前省略的loader后缀也得加上。由于webpack2会自动给加载json文件，所以json-loader也就不再需要了，查看[这里][1]。

```javascript
configuration.module.rules[0].use should be one of these: ...
```

webpack1.x写法:

```javascript
webpackConfig.module.loaders = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: ''
}, {
    test: /\.json$/,
    loader: 'json'
}]
```
webpack2.x写法：

```javascript
webpackConfig.module.loaders = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader',
        query: {
            cacheDirectory: true,
            plugins: [..plugins],
            presets: [..presets]
        }
    }]
}]
```

**css-loader，style-loader的配置：**

webpack1.x写法：

```javascript
webpackConfig.module.loaders.push({
    test: /\.css$/,
    exclude: null,
    loaders: [
        'style',
        'css?modules&importLoaders=1&sourceMap&minimize',
        'postcss?pack=default'
    ]
})
```

webpack2.x写法：

```javascript
webpackConfig.module.rules.push({
    test: /\.css$/,
    exclude: null,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            opitions: {
                modules: true,
                sourceMap: true,
                minimize: true,
                importLoaders: 1
            }
        },
        'postcss-loader'
    ]
})
```

注意这里css-loder的minimize默认是不开启的，建议开启压缩可以缩小文件大小。babel-loader的cacheDirectory开启缓存可以加速编译过程。  

### 4.[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)  
修改原来的ExtractTextPlugin插件配置，对css文件进行处理，发现报如下错误：

**报错如下：**

```
throw new Error("Chunk.entry was removed. Use hasRuntime()");

```

google了一下发现是当前版本(1.0.1)已经不适用， 升级到2.0。

```javascript
webpackConfig.module.rules.push({
    test: /\.css$/,
    use: extractText.extract({
        use:[
        { loader: 'style-loader' },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                minimize: true,
                importLoaders: 1,
                modules: true
            }
        },
        { loader: 'postcss-loader' }
    ] })
})
const extractText = new ExtractTextPlugin({
    filename: 'styles/[name].[contenthash].css',
    allChunks: true,
    disable: __DEV__
})
webpackConfig.plugins.push(extractStyles)
```
### 5.postcss-loader
postcss-loader插件配置会麻烦一些，有两种方法： 
**一种是新建postcss.config.js文件**
```javascript
module.exports = {
    plugins: [
        require('autoprefixer')({ /* ...options */ })
    ]
}
```
**另一种在webpack.config.js使用LoaderOptionsPlugin**
```javascript
webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
        options: {
            postcssLoader: () => {
                require('autoprefixer')(/* ...options */ )
            }
        }
    }）
)
```
### 6.loaderUtils Warning

```
DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
```
貌似是loader-utils模块引起的，没有太明白问题出在哪，[issues地址](https://github.com/webpack/loader-utils/issues/56),我在webpack.config.js在加上下面代码解决了。
```javascript
process.noDeprecation = true
```
### 升级总结
v1.x的时候大家都在吐槽webpack文档问题，v2文档确实提升不少，包括这次的升级如果跟着指南走，基本不会出什么大问题，只是中途在配置ExtractTextPlugin、postcss插件时折腾了一些时间。完成这次的升级后，后续准备对流程再进一步的优化，缩减打包时间、减少bundle大小等。
这里推荐一款插件[webpack-visualizer-plugin](https://www.npmjs.com/package/webpack-visualizer-plugin)，可以将项目的打包情况可视化，清楚了解到每个模块的大小、占比，方便后续的优化。

如果对v2版配置还有问题的同学，可以查看我之前的一个v3.1版本的[webpack.config.js](https://github.com/M1seRy/react-redux-webpack-starter/blob/master/build/webpack.config.js)
### 附：
#### 1.webpack v1至v2升级指南  
[官方webapck 1->2升级guides](https://webpack.js.org/guides/migrating/)  
[另一位同学翻译的升级指南中文版](http://www.zcfy.cc/article/migrating-from-v1-to-v2-2378.html)  
#### 2.几篇关于升级优化的好文章：  
[Boost webpack build performance | Optimising webpack build performance | Webpack 构建性能优化探索](https://github.com/pigcan/blog/issues/1)  
[webpack2 终极优化](https://github.com/gwuhaolin/blog/issues/2)  
#### 3.关于webpack的好文章集合(awesome-webpack)  
[搜罗一切webpack的好文章好工具](https://github.com/webpack-china/awesome-webpack-cn)

（ps:第一次写关于webpack的文章，不免有误，请及时斧正）
 

    


  [1]: https://webpack.js.org/guides/migrating/
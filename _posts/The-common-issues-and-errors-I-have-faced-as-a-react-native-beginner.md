---
title: 'React Native 新手常见问题及体验总结'
date: '2019-07-31 17:46:47'
tags: React Native
---

![](https://assets.wuxinhua.com/blog/assets/react-native/react-native-article-banner.png)  

之前有使用 React Native 的开发经历，记录下了开发过程的常见的错误和解决方案，也算是从头趟了一遍 RN 开发过程的坑，本篇主要包括日常踩得一些坑以及我使用 React Native 开发体验总结。

### #State update on an unmounted component

> Can’t perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

这是一个常见的错误，当我们初始化首页 screen 屏幕时会使用 fetch 做一些异步请求，请求成功后在回调方法里使用 setState 更新组件数据，但如果在请求 pending 状态下跳转到其它屏，组件已经销毁，这时再去 setState 会报 `Warning` ⚠️，这个问题的解决思路有两个：

1. 组件销毁时取消发出的 fetch 请求。
2. 增加组件是否销毁判断字段，在 componentWillUnmount 方法里设置组件已销毁。

如何中断一个 fetch 请求？可以尝试使用 AbortController API， [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController) 接口是一个控制器对象，在 fetch 请求中增加 `signal` 参数，允许你在需要时中止一个或多个请求，例如：

```javascript
class HomeScreen extends Component {
  abortController = new AbortController();
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {

    fetch('https://my.api.com/api?query=reactnative', { signal: this.abortController.signal })
      .then(result => {
        this.setState({
          data: result.data,
        });
      });
  }

  componentWillUnmount() {
    this.abortController.abort()
  }

  render() {
    ...
  }
}

```

我使用另一个更简单的方法，在调用 setState 方法更新数据前使用 `_isMounted` 字段来判断组件是否已经被销毁：

```javascript
class HomeScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;

    fetch('https://my.api.com/api?query=reactnative')
      .then(result => {
        if (this._isMounted) {
          this.setState({
            data: result.data,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    ...
  }
}

```

### #0.60 版本添加 react navigation 

React Native 升级到 0.60 后，支持 AndroidX 和 Autolinked 自动连接 package 包算是两个比较大的更新，具体可以查看更新 [blog](https://facebook.github.io/react-native/blog/2019/07/03/version-60)：

> AndroidX is a major step forward in the Android ecosystem, and the old support library artifacts are being deprecated. For 0.60, React Native has been migrated over to AndroidX. This is a breaking change, and your native code and dependencies will need to be migrated as well.

但是坑出在有些文档没有及时更新，包括第三方库没有及时更新，导致我在使用 react navigation 、react-native-gesture-handler 第三方库时遇到的一连串的bug。包括 react-native-gesture-handler 使用了android support 的一些库，没有及时更新到 [AndroidX](https://developer.android.com/jetpack/androidx?hl=zh-cn)，因为 AndroidX 是谷歌支持库的替代品，目前 Android P 处于过渡阶段，下一个版本的 Android 可能只支持AndroidX。

> xxxx/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerEvent.java:3: error: package android.support.v4.util doesn't exist import android.support.v4.util.Pools; ^ xxxx/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerEvent.java:19: error: package Pools doesn't exist private static final Pools.SynchronizedPool<RNGestureHandlerEvent> EVENTS_POOL = ^ error: package android.support.v4.util doesn't exist  import android.support.v4.util.Pools;

解决方法：

无法自动 link 的包可以手动链接依赖，例如在 iOS 平台手动 link `react-native-gesture-handler`、`react-native-svg`等包，建议先执行`unlink`命令，添加 `react-native.config.js` 文件：

```javascript

module.exports = {
  dependencies: {
    'react-native-gesture-handler': {
      platforms: {
        ios: null
      }
    },
    'react-native-svg'
      platforms: {
        ios: null
      }
    }
  }
};

```
使用 jetify 处理 AndroidX 导致的问题：

在`package.json`里添加 [jetify](https://github.com/mikehardy/jetifier)相关配置：

```json
"postinstall": "npx jetify"
```

使用 react navigation 开发路由导航过程中遇到的几个 bug 可以查看提的这几个 issues: 

![](https://i.loli.net/2019/07/10/5d25996d4655e23135.png)

1. [react-navigation/issues/6066](https://github.com/react-navigation/react-navigation/issues/6066)
2. [react-native-gesture-handler/issues/649](https://github.com/kmagiera/react-native-gesture-handler/issues/649)
3. [react-native-gesture-handler/issues/494](https://github.com/kmagiera/react-native-gesture-handler/issues/494)

### #Flex in React Native

React Native 中同样也可以使用 flexbox 布局，和 web 上基本一致，如果不了解 flex 布局的可以查看之前总结的这篇 [Flexbox布局完全指南](https://wuxinhua.com/2019/02/25/The-Guide-To-Flexbox/)，但也一些需要注意的地方：

1. flex 的排列方向默认是竖直排列： flexDirection：column。
2. flex 只能指定一个数字值，它有三种状态：正数、零与负数。
3. alignItems 在 React Native 中默认是：alignItems: stretch。
4. 部分属性在RN中不支持：align-content，flex-basis，order，flex-basis，flex-flow，flex-grow，flex-shrink。

具体用法这里不再介绍，官方文档上有很详细的描述。 [Layout with Flexbox](https://facebook.github.io/react-native/docs/flexbox)

### #DeviceException 未连接设备

> error Failed to install the app. Make sure you have an Android emulator running or a device connected. Run CLI with --verbose flag for more details.
Error: Command failed: ./gradlew app:installDebug -PreactNativeDevServerPort=8081
FAILURE: Build failed with an exception.
What went wrong:
Execution failed for task ':app:installDebug'.
com.android.builder.testing.api.DeviceException: No connected devices!

这个报错是安卓的 Virtual Devices 没有开启，可以使用 adb devices 命令查看当前设备，确保运行 react-native run-android 命令时开启调试设备，安卓平台可以在 Android Studio - Tools - AVD Manager 中打开。

![](https://assets.wuxinhua.com/blog/assets/react-native/virtual-devices.jpg)

### #YellowBox ignore Warnings

使用 YellowBox 忽视一些警告 ⚠️，但不推荐这样做，毕竟一些警告还是比较有用的信息，例如 react native 提示componentWillMount 将会弃用，使用 componentDidMount 代替：

> Warning: componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.
Please update the following components: EventScreen
Learn more about this warning here:
https://fb.me/react-async-component-lifecycle-hooks

在开发环境可以使用 YellowBox 忽略这些警告：

```javascript

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);

```

> RedBoxes and YellowBoxes are automatically disabled in release (production) builds.

不过在发布或线上打包的版本中，YellowBoxes 的提示会被自动禁掉。

### #引用第三方库 build 失败

例如使用 [react-native-wechat](https://github.com/yorkie/react-native-wechat) 集成微信的好友、朋友圈分享功能时，Android 环境 dev 本地开发环境一切正常运行，使用命令进行 apk 打包时提示 gradle build 失败：

> error: failed linking references.
FAILURE: Build failed with an exception.  
What went wrong:
Execution failed for task ':RCTWeChat:verifyReleaseResources'.
com.android.ide.common.process.ProcessException: Failed to execute aapt
Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.
Get more help at https://help.gradle.org

这类问题很多情况是第三方包 gradle 版本配置与主体项目下的配置不一致导致的，例如项目使用的 `28.0.3`，而第三方包使用的是更低的版本，建议将引用库 gradle 配置更新成与 RN 项目 android 文件下 build.gradle 文件配置一致，例如：

```java
buildscript {
    ext {
        buildToolsVersion = "28.0.3"
        minSdkVersion = 16
        compileSdkVersion = 28
        targetSdkVersion = 28
        supportLibVersion = "28.0.0"
    }
    repositories {
        google()
        jcenter()
    }
    dependencies {

        classpath("com.android.tools.build:gradle:3.4.1")

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
```

### #如何进行 React Native 开发调试

模拟器开启 Developer Menu:

iOS 模拟器可以通过 `Command⌘ + D` 快捷键来快速打开 Developer Menu，Android 模拟器可以通过 `Command⌘ + M` 快捷键来快速打开 Developer Menu。

![](https://assets.wuxinhua.com/blog/assets/react-native/DeveloperMenu.png)

如果想查看组件的层级关系，可以全局安装 react 开发配套工具 react-devtools：

```shell
$ npm install -g react-devtools
$ react-devtools
```
运行后 React Native 应用会自动连接，会出现 connectting 窗口，刷新 App 即可看到当前 screen 的组件层级情况：

![](https://assets.wuxinhua.com/blog/assets/react-native/react-devtools-connect.jpg)

![](https://assets.wuxinhua.com/blog/assets/react-native/react-dev-tools.jpg)

如果想看控制台输出 log 日志，可以输入以下命令：

```shell
$ react-native log-ios
$ react-native log-android
```

![](https://assets.wuxinhua.com/blog/assets/react-native/log-android.jpg)

### #万能的清除缓存和重启

经常碰到一些莫名其妙的错误，发现以下命令删除本地包，重装依赖重启总是很管用：

```sh
watchman watch-del-all // 清除 Watchman：
rm -rf node_modules && yarn install // 删除 node_modules并重装
react-native start --reset-cache // 清除 rn 缓存重启
react-native run-ios 或 react-native run-android

```

### 总结：

先后有 Airbnb 和 Udacity 表示将弃坑 React Native，回归到原生开发上。具体可查看公司技术博客：  

> As a result, moving forward, we are sunsetting React Native at Airbnb and reinvesting all of our efforts back into native. - Airbnb

[1. Sunsetting React Native](https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a)  
[2. React Native: A retrospective from the mobile-engineering team at Udacity](https://engineering.udacity.com/react-native-a-retrospective-from-the-mobile-engineering-team-at-udacity-89975d6a8102)

我简要谈谈自己的体验和看法：

#### “文档应当鲜活并保持更新”

当然这句话不是我说的，是 Eric Evans 在《领域驱动设计》这本书中的一句话，我引用它是想表达：如果代码能实现或体现最好，文档应该是起辅助作用的，而不是累赘；文档没及时跟上代码的更新将会给开发者带来很多麻烦。React Native 的文档已经被很多人吐槽过，RN 社区曾经有个 issue => [What do you dislike about React Native?](https://github.com/react-native-community/discussions-and-proposals/issues/64) 用来收集开发者在使用RN时的痛点，排在前三的就是：**升级**、**调试**加**崩溃**。一旦需要从 RN 的旧版本升级到一个新的大版本时就变得异常困难。

#### 第三方组件、库的支持

虽然目前 React Native 社区已经发展得足够大，社区的开发者发布了很多组件、库等方便大家开发时引用，实现各种复杂的需求，提供对业务的支持。但问题出在很多库没有及时跟上RN的大版本发布及相关改动，或者说有些库的已经不再更新维护，在没有时间自己开发或寻找替代品的时候，这也是很棘手的一个问题。

### 开发速度快但有一定的上手难度

作为混合的跨平台解决方案，React Native 具有比较高的可行性, 相对于大公司移动端会有比较大的团队来开发维护原生 App，RN 比较适用于（2/3个开发人员）小团队成员，或者说没有足够的人员分别去开发原生应用的团队，小团队并且直接使用 JavaScript 生态系统的库、工具就能开发应用，一套代码两端适用，开发速度上有大幅度提升，也节约了人力成本的开支。有经验的 JavaScript 和 Web 开发人员能很快得入手，但是对于新手，尤其是对 React 及相关概念不了解的同学，会有一定的上手难度。

没有使用其它混合方案框架例如 Fluter、Weex 等进行开发混合应用，这里无法进行对比，只是总结最近一段时间使用 React Native 的开发体验，从初始化项目到应用上架整个过程并不是很流畅，真机调试过程经常有应用崩溃的情况发生，代码排查错误或者找问题的过程花费了我比较多的时间，另一方面是使用第三方组件、库等是一个踩坑过程，文档等没有及时更新，在添加配置的过程出现很多问题，可能是我刚好碰上 **60** 这个大版本，总的来说我认为 React Native 应该还是目前比较好并且稳定的混合应用开发方案，但在开发者使用体验上社区和团队需要进一步优化改善。


### 附录

参考学习的一些资料：

1. [Announcing React Native 0.60](https://facebook.github.io/react-native/blog/2019/07/03/version-60)  
2. [React Native at Airbnb](https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c) 
3. [React Native: A retrospective from the mobile-engineering team at Udacity](https://engineering.udacity.com/react-native-a-retrospective-from-the-mobile-engineering-team-at-udacity-89975d6a8102) 

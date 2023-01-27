---
title: 'Node.js 包管理及 npm 依赖安装机制'
excerpt: 'Node.js 包管理历史，npm、yarn、pnpm 之间的关系区别，pnpm 的优势，npm install 后发生了什么? node_modules 为什么这么重'
date: '2022-03-23 17:20:47'
tags: npm node.js pnpm yarn packages.json node_modules
---


## 主要分享探讨以下几个问题

- Node.js 包管理、npm、cnpm、yarn、pnpm 之间的关系区别，pnpm 的优势
- npm 包管理历史
- npm install 后发生了什么? 模块安装机制
- Why node_modules are so heavy ? ( node_modules 为什么这么重）

![](https://assets.wuxinhua.com/blog/assets/npm/image-1%20%281%29.png)

- 对于不同的依赖中又共同依赖某一包的不同版本，包管理工具会采取什么样的策略？
- 我在一个项目中用了yarn安装后，再使用 npm 安装后是否 ok，同理其他几种组合。

## 浏览前必读

作为前端开发工程师，提到包、模块管理等内容，大家第一想到的应该就是 npm，npm install 、npm run 等也是日常使用频率最高的几个命令，但是我们很少去关注这些命令执行之后 npm 为我们做了那些事，以及把包安装到 node_modules 中的结构具体是怎样的，为什么会新增 package.lock文件等等? 本文将带着这些问题去了解一下 nodejs 包管理的历史以及其中的一些容易忽略的细节。 在了解 npm 、yarn 、pnpm 工具之前我们可以先认识或了解一下这几个常见的名称，对接下来的讨论也会有一些帮助，package(包)、module(模块)，什么的文件可以称为一个 package(包)? 什么又是模块？

- Module 任何文件或文件夹能被 Node.js require 方法加载的都可以视为一个 module
- Package 包是一个由 package.json 描述的文件或目录

## 什么是包管理器？

各种语言基本都有自己的包管理工具，Ruby的软件包单元为[RubyGem](https://link.zhihu.com/?target=https://rubygems.org/)，Python 有 [PyPi](https://pypi.org/) ，JavaScritp 有 [npm](https://www.npmjs.com/)，除了语言有包管理工具之外，操作系统也有包管理器，我们从最 Linux 的包管理器说起，简单得来说 package manager "包管理器"或“软件包管理器”是一种工具，包管理器可以是一种 GUI 图形应用也可以是 cli 命令行工具，允许用户在操作系统、或特定环境上安装、升级、删除管理软件包，其实并不是只有 MacOS 和 Linux 官方才有软件包管理工具，微软官方也为 Windows 系统发布了一款名为 [winget](https://docs.microsoft.com/en-us/windows/package-manager/winget/)的软件包管理工具，包管理器在各种系统软件和应用软件的安装管理中均有广泛应用。

## **npm** **、cnpm、** **yarn** **、** **pnpm** **主要区别**

### npm 简介

> npm is the standard package manager for Node.js.

npm 是 Node Package Manager 的简称，于2010年发布，是 Node.js 社区最流行的一个包管理工具，当你安装 Node.js的同时也会默认安装 npm.

npm 主要包括两部分:

- Online platform: 可以上传分享 JavaScript package 包
- Command line tool:
  - 安装和卸载 package 包
  - 版本控制
  - 依赖管理等

- npm 源
  - 接口
  - 数据库

npm 大致的组成结构如下图所示：

![](https://assets.wuxinhua.com/blog/assets/npm/api.svg)

主要发展历史：

- 是 nodejs 默认的软件包管理系统，成立时间比较早，截止2016年 npm的registry上面已经注册了超过280,000个模块
- npm2 版本由于嵌套文件模式，大量重复的依赖项会存储在神奇的 node_modules 内
- 安装速率有一定局限，npm 是按照队列执行方式来安装 package 的，也就是说当前package安装完后才能继续后面的安装
- [2016 left-pad 事件](https://www.zhihu.com/question/41694868)
- Yarn 发布，npm 随后也发布 [shrinkwrap](https://docs.npmjs.com/cli/v7/commands/npm-shrinkwrap) ，npm 5 新加入 package-lock.json 锁定文件
- 2020 Github 正式收购 npm

#### cnpm

cnpm 的命令基本和 npm 一样，由于 npmjs 的服务器在国外，所以国内开发者在做项目下载依赖包的时候，下载速率比较慢，在这种背景下，阿里团队推出了 cnpm，它是是一个完整的 npmjs 镜像，目前的同步频率的 10 分钟一次保证和官方服务保持一致，私有源的好处：

- 网络访问稳定性，安装速率会有较大幅度的提升
- 内部搭建私有源版本是可控的， 即使出现线上问题，可以通过删除有问题的模块版本，或者是通过重新设置 latest tag 的方式让有问题的模块不再被安装到

#### Yarn

> Safe, stable, reproducible projects

Yarn 是一个快速可靠安全的依赖管理工具，由 Facebook 联合其它几个互联网公司主导的一个开源项目，目前稳定版本 1.22.4 ，yarn 的一些特点：

- 速度快，yarn 缓存之前下载过的包，无需重复下载
- 锁文件格式，保证不同系统无差别工作

在 focebook 工程团队的[介绍](https://engineering.fb.com/2016/10/11/web/yarn-a-new-package-manager-for-javascript/)中可以了解到为什么会创作新的包管理工具来替代 npm:

- npm install 很慢，删除 node_modules 再安装也很慢
- 同一个项目安装无法保证一致性，例如使用的是相同的 package.json`^0.1.1`在安装时会出现问题，可能会拉取到不同版本的包，导致在相同的环境中有的同事能正常运行有的不能

上面提到过了，不同于 npm 的安装方式，yarn的安装是同步执行任务，这样性能效率有较大提升；npm 和 Yarn 都是通过 package.json 记录项目需要拉取的依赖模块，为了防止拉取到不同的版本，yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，yarn 就会创建（或更新）yarn.lock 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本

同 npm 的一些区别：

- npm 随 Node.js 自动安装，yarn 需要手动安装 npm install yarn --global

- npm 安装时需要网络，yarn 可以从 cache 中安装

- CLI 方面 yarn 拥有更简洁的命令

- 包版本方面 npm是弱绑定的，而yarn则是强绑定的，确保不同机器环境下安装的版本是一致的

- PnP特征解决效率问题，在后面会提到 install 安装的几个步骤：

    1.将依赖包的版本区间解析为某个具体的版本号
    2.下载对应版本依赖的 tar 包到本地离线镜像
    3.将依赖从离线镜像解压到本地缓存
    4.将依赖从缓存拷贝到当前目录的 node_modules 目录，

在第四步中涉及到大量的 I/O 操作，PnP 的方案就是省略第四步，通过一个.pnp.js 的文件来记录依赖映射关系、这些包具体位置，这样就不再拷贝文件到具体 node_modules目录里，关于 Yarn 2.0 pnp 特征可以参考 [这篇文章](https://loveky.github.io/2019/02/11/yarn-pnp/)

#### pnpm

> Fast, disk space efficient package manager

什么是 pnpm ? 官方文档是上面这样介绍的，本质上也是一个包管理器，从介绍来看有两大优势，快和节省磁盘空间，概括下：

- 所有文件都保存在硬盘上的统一的位置，当安装软件包时， 其包含的所有文件都会硬链接自此位置，而不会占用额外的硬盘空间，项目之间方便地共享相同版本的依赖包，例如使用 npm 或 Yarn 时，如果你有 100 个项目，并且所有项目都有一个相同的依赖包，那么你在硬盘上就需要保存 100 份该相同依赖包的副本
- 解决安全问题，与 Yarn 一样，pnpm 有一个包含所有已安装包校验和的特殊文件，用于在执行代码之前验证每个已安装包的完整性
- 支持离线模式，pnpm 将所有下载的包 tarball 保存在本地注册表镜像中。当包在本地可用时，它从不发出请求。使用该`--offline`参数可以完全禁止 HTTP 请求
- 速度上pnpm 比 npm 快，而且比 Yarn 快，Yarn 从缓存中复制文件，而 pnpm 只是从全局存储中进行链接

安装速率对比，以这个[仓库](https://github.com/pnpm/benchmarks-of-javascript-package-managers)为例， 主要对比一下 `pnpm`和 `yarn PnP`

![](https://assets.wuxinhua.com/blog/assets/npm/npm.png)

图片来源（[为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://juejin.cn/post/6932046455733485575#heading-0)）

### 区别

- npm cnpm yarn pnpm 均是 Node 的依赖管理工具，目前使用范围、流行度： npm > yarn > cnpm > pnpm

- npm 使用 package.json 的文件，用户可以通过 npm install 命令把项目里所有的依赖项保存在这个文件里，安装依赖是从国外服务器下载，受网络影响比较大，cnpm 安装方式和命令和 npm 完全一致，但服务器在国内，所以不受网络影响，搭建私有源相对稳定性会有较大提高

- Yarn 是重新设计的一个新的包管理工具，速度上有较大的提升，

  - 提测 lock 锁包模式，解决 npm 在不同环境安装时包不一致导致的问题
  - 使用本地缓存，与 yarn 不一致的是 yarn 提供了一个离线模式也就是不需要联网状态也能正常安装
  - 解决了安装速率问题
  - 简化了一些配置文件

- pnpm 相对于其它几个包管理软件具有以下几个特别：

  - 速度快并且节约磁盘空间
  - 支持 monorepo (提供子命令，例如根目录下 `pnpm add A -r`, 那么所有的 package 中都会被添加 A 这个依赖)
  - 提升安全性，自创了一套依赖管理方式，解决非法访问（ node_module 的扁平结构，如果 A 依赖 B， B 依赖 C，那么 A 当中是可以直接使用 C 的，但问题是 A 当中并没有声明 C 这个依赖。因此会出现这种非法访问的情况）的问题，保证安全性。

- 下载速度对比，pnpm > yarn > npm

![](https://assets.wuxinhua.com/blog/assets/npm/npm.png)

## lock 文件

在版本 5 中，npm 引入了 `package-lock.json` 文件，这个功能其实是接受 yarn 的一个特征，核心的目的是跟踪被安装的每个软件包的确切版本，以便产品可以以相同的方式被 100％ 复制（即使软件包的维护者更新了软件包）。

### package-lock.json

![](https://assets.wuxinhua.com/blog/assets/npm/package.json.png)

### 为什么会需要这个lock 文件？

- 举个简单的🌰 在 package.json 中添加一条记录， react 版本为 ^17.0.0，将会安装最新版 17.0.2。如果改成 ^16.0.0 版本那么安装的将是 16.14.0，也就是 16 大版本号中能安装的最新版本，也就是说package.json 文件只能锁定大版本
- 由于 package.json 向后（新）兼容的机制，能确保我们总是能安装到最新的包，但这样也带来一些问题，当你换了机器或下载源，或者目标库版本号有更新时有可能会导致同一个项目下载的包版本不一致带来新的问题，这也是`package-lock.json` 被创建出来的原因，lock 文件会记录当前安装的每个软件包的版本，当运行 `npm install`时，`npm` 会使用这些确切的版本。
- 如果两者版本不一致时，例如改了package.json lock文件没有更新，且 package.json和 lock 文件不同，那么执行`npm i`时 npm 会根据package中的版本号以及语义含义去下载最新的包，并更新至lock。如果两者是同一状态，那么执行`npm i`都会根据l ock下载，不会理会package实际包的版本是否有新。

### 是否需要将 lock 文件写进 .gitignore

[jquery 加上了，vue](https://github.com/vuejs/vue) 则没有写入到 gitignore中 ，新增两个讨论项，相关讨论链接：

- [package-lock.json 需要写进 .gitignore 吗？](https://www.zhihu.com/question/264560841)
- [为什么我不使用 shrinkwrap（lock）](https://zhuanlan.zhihu.com/p/22934066)

## npm install 后发生了什么?

这个问题类似于“在浏览器输入 url 回车之后发生了什么” 或者“如何手动实现一个 npm install”，依赖安装管理是 npm 的核心功能，原理就是执行 `npm install` 从 package.json 中的 dependencies 依赖包安装到当前目录的 ./node_modules 文件夹中，我们以安装 express 为例我们来探讨一下它的安装流程

```sh
npm install express --timing=true --loglevel=verbose
```

通过上面的这个命令可以在命令行及log日志里看到整个安装过程，大致的流程如下：

![](https://assets.wuxinhua.com/blog/assets/npm/npm_install.png)

### preinstall

如果工程有定义 preinstall 钩子，那在安装前会钩子内容会被执行

### 检查 config

- 例如如果使用 --registry 注册源目录

- Check 项目目录中的 .npmrc 文件，关于 npmrc 文件及优先级

- 项目级 .npmrc 文件 > 用户级 > 全局 > npm 内置

- 除了项目根目录下的 npmrc 文件外，在你的开发环境中应该存在多个 .npmrc 文件，例如用户配置 npmrc 文件可以通过 `npm config get userconfig`，如果一台电脑有多个用户，通过通过 prefix 前缀配置全局的 npmrc 文件，可以通过 `npm config get prefix` 来获取配置信息

- 内置 npmrc 文件用的不多，基本不需要关注，可以通过`npm config list` 来查看 npm 的配置

- 有两种方式设置，例如设置淘宝仓库源：
  - npm 命令，例如 npm config set registry <https://registry.npm.taobao.org>
  - .npmrc 文件内写入`registry=https://registry.npm.taobao.org`

### 检查 lockfile

- 检查项目中是否有 package-lock.json 文件，存在读取 lock 文件里包的版本信息，无则跳到 4步骤构建一个依赖树。从 npm 5.x 版本开始不存在 npm 会自动生成一个 package-lock.json 文件，注意这个步骤是在最后一步处理的

- 检查和 package.json 版本是否冲突，冲突情况（npm v5 版本后为例）：

  - 无 package-lock.json 根据 package.json 安装，最后生成 lock 文件
  - package.json 和 package-lock.json 的版本不兼容，使用 npm i 命令以 package.json为准
  - package.json 和 package-lock.json的版本兼容，使用 npm i 命令 以 package-lock.json 为准

### 构建包的依赖树

无 lock 文件的情况下，从 npm 远程仓库获取包信息，根据 package.json 构建一个依赖树，构建依赖树并非真正意义的安装，后续安装的时候会根据这个结构去缓存中获取或根据地址去远程仓库下载，从 v3 版本开始 npm 采用扁平化结构存储包，不管是直接依赖还是子依赖优先放置在 node_modules 根目录

### 检查缓存

- 有缓存直接解压到 node_modules
- 无则去下载包，下载后校验包的完整性，校验不通过会重新下载，通过后会 copy 至 npm 缓存目录下，再将包解压至 node_modules，关于缓存可以通过 `npm config get cache` 获取到存放地址，一般会存放在 /Users/username/.npm 文件夹下

上面提到了关于包的完整性校验，来看下 npm 怎么来做这个完整性校验的，在下载前是能拿到 npm 仓库包文件计算的 hash 值，拿 react 为例我们可以通过 npm info 命令查看 hash 值，如下图所示，为了确保下载后的文件一致，npm 会在下载完成后本地计算一下文件的 hash ，相同则说明下载是成功，否则会重新下载

![](https://assets.wuxinhua.com/blog/assets/npm/npm-react.png)

### 生成lock文件

生成一份lock文件，锁定包的版本，完成整个下载安装流程

## Why node_modules are so heavy ?

![](https://assets.wuxinhua.com/blog/assets/npm/node_module_haviy.png)

在 jsconf.eu 大会上，Ryan Dahl 的演讲 [Node.js 十大设计缺陷 - Ryan Dahl - JSConf EU](https://www.youtube.com/watch?v=M3BM9TB-8yA&t=1184s) 中提到了 node_modules 在设计上的问题，我们在使用 npm install 后可能要等很久，然后会发现程序下载了很大体积的 node_modules 文件，这主要是因为 Node 的 vendored-by-default 机制，会令 node_module 主动地安装所有 module 的 dependencies

### Dependency Hell

早期的 npm v2 管理模块依赖的方式比较简单，它读取每个模块的依赖列表即 package.json 文件，并下载依赖到该模块目录内的 `node_modules` 下；如果该依赖又依赖了其他的模块，会继续下载依赖到该模块目录的 `node_modules` 文件夹下，如此递归执行下去，最终形成一颗庞大的依赖树，大致的结构如下：

![](https://assets.wuxinhua.com/blog/assets/npm/dependecy_hell.png)

这样安装也带来一些问题：

- 体积变得非常大，因为有可能存在同版本的依赖，分布在不同的 `node_modules` 文件夹内
- 实际上重复的资源也会占用大量的电脑磁盘资源
- 由于依赖树的层级非常深，目录层级深导致文件的路径过长，安装速度会减慢，如果需要定位到指定的依赖包也比较难

## 包安装策略

> 对于不同的依赖中又共同依赖某一包的不同版本，包管理工具会采取什么样的策略？

> 我在一个项目中用了yarn安装后，再使用npm安装后是否ok ？同理其他几种组合

### 依赖同一个版本

假如 A 和 B 两个包，两个包都依赖了 C 这个包，在使用安装命令后npm会如何安装到 node_modules 中。这里以 [antd-img-crop](https://www.npmjs.com/package/antd-img-crop) 和 [antd-img-cropper](https://www.npmjs.com/package/antd-img-cropper) 两个包为例子，后者fork了前者，两边的依赖基本一致，并且二者都依赖了 [react-easy-crop](https://www.npmjs.com/package/react-easy-crop) ，会分别在 npm v7 及 npm 2 版本查看安装情况：

- 左：本地当前 v7.17 版本 中 + 右：v2.0.0 旧版本

![](https://assets.wuxinhua.com/blog/assets/npm/1.0.0.png)
![](https://assets.wuxinhua.com/blog/assets/npm/2.0.0.png)
![](https://assets.wuxinhua.com/blog/assets/npm/2.0.01.png)

- 在 v2 版本中，npm2会依次递归安装 a b 俩个包到 node_modules 中，相同的包会在各自的 node_modules 中重复安装一遍
- 在 v2 以上的版本（v7.17）实验中，npm 将目录打平了，即采用扁平化的层级结构，将相同的依赖放在 node_modules 中实现共享

### 同一依赖不同版本

例如项目依赖了 A 模板，A 模块依赖了 B 模块，同时 C 模块也依赖 B ，但是是 B 的高版本，对于这种多版本情况，npm 的处理是先检查版本是否兼容，如果兼容就不会再重复安装，如果不兼容则会把依赖包安装在当前引用包的 node_modules下，以上面的例子为例：npm 会将A模板的 B包安装在根目录下， 再将 C 模块的 B 包安装在 C 自己的 node_modules下。

## 附录

- [关于现代包管理器的深度思考——为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://juejin.cn/post/6932046455733485575#heading-0)
- [剖析npm的包管理机制(完整版) | ConardLi的blog](http://www.conardli.top/blog/article/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96-%E5%89%96%E6%9E%90npm%E7%9A%84%E5%8C%85%E7%AE%A1%E7%90%86%E6%9C%BA%E5%88%B6%EF%BC%88%E5%AE%8C%E6%95%B4%E7%89%88%EF%BC%89.html#_1-3-%E4%BE%9D%E8%B5%96%E9%85%8D%E7%BD%AE)
- [Flat node_modules is not the only way | pnpm 中文文档 | pnpm 中文网](https://www.pnpm.cn/blog/2020/05/27/flat-node-modules-is-not-the-only-way)

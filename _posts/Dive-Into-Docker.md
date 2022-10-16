---

title: '认识Docker'
excerpt: '出于工作的需要，今年才真正开始接触到Docker，买了一些容器相关的书，读了大牛一系列的文章博客，希望深入了解Docker的一些核心概念，Docker运行原理等，并在公司同事的帮助下玩一把容器技术，了解学习Docker最好的方法是阅读[文档](https://docs.docker.com/)，本篇主要记录下这个学习过程中积累的一些知识，通过这篇可以了解到Docker相关的基础知识。'
coverImage: ''
date: '2021-02-18 20:04:46'

---

![Docker](https://assets.wuxinhua.com/blog/assets/dive-into-docker/docker_logo.png)  

出于工作的需要，今年才真正开始接触到Docker，买了一些容器相关的书，读了大牛一系列的文章博客，希望深入了解Docker的一些核心概念，Docker运行原理等，并在公司同事的帮助下玩一把容器技术，了解学习Docker最好的方法是阅读[文档](https://docs.docker.com/)，本篇主要记录下这个学习过程中积累的一些知识，通过这篇可以了解到Docker相关的基础知识。


### 容器

在介绍Docker前，先了解一下容器的概念：
> 容器就是将软件打包成标准化单元，以用于开发、交付和部署。

有了容器，把软件运行所需的所有资源(代码和依赖资源)打包到一个隔离的容器中，多个容器能够在一台机器上运行，并且共享操作系统内核。

### 什么是Docker   

根据官方的定义，Docker是世界领先的软件容器平台。
> an open platform to build, ship, and run any app, anywhere  

Docker正式发布开源版本是在2013年3月，Docker并不是一项新技术，至今已经走过了5年的历程，最初是 dotCloud 公司创始人 [Solomon Hykes](https://github.com/shykes) 在法国期间发起的一个公司内部项目，dotCloud现已更名为[Docker](https://www.docker.com/)，Docker以 Go 语言进行开发，核心代码托管在 [GitHub](https://github.com/moby/moby) 平台上,(出于商业化的目的，Docker在2017年已经改名为Moby，具体详见[pr#32691](https://github.com/moby/moby/pull/32691))，基于Linux内核的 cgroup，namespace 等技术，Docker对进程进行了封装隔离，属于操作系统层面的虚拟化技术，是轻量级的虚拟化技术，与传统的虚拟机比更具优势。Docker容器的特点：

- 轻量，一台机器上可以运行多个Docker容器，并且共享这台的操作系统内核。
- 标准化，Docker容器基于开放式标准，能够在所有主流 Linux 版本、Microsoft Windows、VM等平台上运行。
- 安全，Docker赋予应用的隔离性不仅限于彼此隔离，还独立于底层的基础设施，Docker默认提供最强的隔离，因此如果某个应用出现问题，也只是单个容器的问题，而不会波及到整台机器。

### Docker能为我们做什么

从Docker公司的员工[Jérôme Petazzoni](https://twitter.com/jpetazzo)分享的slide[Docker: automation for the rest of us](https://www.slideshare.net/jpetazzo/docker-automation-for-the-rest-of-us)中，很明确地说明了Docker为我们做的事情：
> 
 Get a well-defined, reproducible environment。  
 Define this environment in a Dockerfile。    
 Build this Dockerfile into a container image。    
 Run this container image anywhere Same behavior, guaranteed 。

Docker是一个提供能在任何地方构建、发布、运行应用的能力的开放平台。通过 Dockerfile 定义一个可复用的环境，并且利用Dockerfile构建容器的镜像，动态运行同一个Dockerfile编译的镜像能够确保容器行为的一致性，开发过程中需要面对的常见一个问题就是环境的构建，经常听到开发调侃说：我这里能跑起来啊！很多时候开发、测试、线上的环境都存在差异，Docker的镜像提供了初内核外的完整运行所需资源，确保了应用运行环境的一致性，所以也不用担心系统的升级、迁移导致的环境变化而无法正常运行的情况。

### 虚拟机和Docker容器的区别

虚拟化技术是使用软件的方法重新定义这些资源，传统的虚拟机技术是虚拟一套硬件后，在上面运行一套完整的操作系统，而容器虚拟化的是操作系统，与虚拟机相比，占用的资源较少，并且更容易移植，效率更高。虚拟机的本质是在物理机上模拟一台或多台逻辑计算机设备，这些计算机可以运行不同的操作系统，互不影响物，而如何管理和动态分配物理机的资源(包括CPU、内存等)，需要再补充一下Hypervisor（也叫Virtual Machine Monitor（VMM））相关技术。  

Hypervisor 是一种运行在基础物理服务器和操作系统之间的中间软件层，可允许多个操作系统和应用共享硬件，可以说是虚拟机的宿主也是监工，Hypervisor 又分为裸机型和主机型，通常我们电脑上装的 VirtualBox 或 Vmware 等属于后者。

主机型Hypervisor会构建出一整套虚拟硬件平台，注意硬件二字，这些包括CPU/Memory/Storage等，在这个硬件平台上你需要再去安装所需的OS、应用软件等，这样底层的OS和上层的OS是就完全无关了，例如物理机是Windows虚拟出一套Linux的开发环境，代表的有VMware Workstation, VMware Player, VirtualBox等。  

裸机型Hypervisor去掉了底层的操作系统，通过Hypervisor直接调用物理机的硬件设施。代表的有Xen, Oracle VM Server for SPARC, Microsoft Hyper-V and VMware ESX/ESXi等。

![区别](https://assets.wuxinhua.com/blog/assets/dive-into-docker/vm_vs_docker.png)  

Docker背后的思想是创建软件程序可移植的轻量容器，让其可以在任何安装了Docker的机器上运行，而不用关心底层操作系统。从这种对比图可以看出（图片截至Docker官网），在虚拟机架构中，最底层是物理架构层，可以是我们的电脑、或者运行在云服务提供商的vps等，上层安装对应的操作系统，而操作系统类型取决于底层物理环境，在操作系统之上即 hypervisor，该层承载一定数量的虚拟机，例如安装每个虚拟机需要800MB的存储空间，那么意味着底层的物理机需要为虚拟机准备 800 * 3的磁盘空间；在之上是每个应用所需的bin、lib包和环境，例如如果APP1是基于NodoJS的web前端应用，可能需要准备例如git、npm、NodeJS、Nginx等运行环境。

再来看下Docker的架构，底部两层类似于vm，同样需要物理环境、操作系统层，这个host层没有限制，能跑Docker的即可，之上Docker daemon取代了Hypervisor，Docker daemon是一个用于运行在底层OS环境中用于管理任何和Docker相关的服务。在上层类似于vm，相应的lib、bin和我们的App应用，所需的这些会在Dockefile中申明，构建成独立的Docker images镜像， Docker daemon则运行管理这些由images镜像构建生成的容器。  

总结一下二者的异同：
- Docker 容器并不是轻量的虚拟机，两者有本质上的区别。
- 在资源隔离上，虚拟机是高度隔离，而 Docker 达不到虚拟机所能提供的资源隔离水平。
- 你可能需要花很长时间去安装虚拟机准备环境，但是花很短时间运行 Docker 容器（毫秒和分钟的区别）。
- 在虚拟机架构中，底层OS需要准备额外的资源分配给上层虚拟机，Docker 放弃了虚拟机层的OS，所以 package 会小很多，但并不代表Docker 不存在这个问题，只是没有虚拟机严重罢了，所以更快更轻。
- 虚拟机需要硬件虚拟化技术支持，所有只能运行在物理机上，Docker 没有硬件虚拟化，可以运行在物理机、虚拟机、甚至 Docker 里面（Docker in Docker）。
- Docker 运行于Linux上，但目前已经实现在OS X或Windows上运行Docker。

### 镜像和容器
Docker 有两个很重要的部分：构建前的叫 image 镜像，构建后的是 container 容器。

Docker 容器使用 cgroup 实现了CPU、内存、文件系统等资源的隔离，那 Docker 没有文件系统怎么运行，其实Docker镜像就是一个特殊的文件系统，镜像文件描述了容器运行所需的初始文件系统，包含所需环境依赖，而镜像是通过 Dockerfile 来构建的，在 Dockerfile 中， 每一条指令都会创建一个镜像层，继而会增加整体镜像的大小。所以严格来说，镜像并非是像一个 ISO 那样的打包文件，镜像只是一个虚拟的概念，其实际体现并非由一个文件组成，而是由多层文件系统联合组成，镜像是只读的，创建容器是在镜像上新建可写层，不需要复制整个文件系统，因此可以实现毫秒级的创建。

Docker把整个应用、操作系统、配置打包成一个静态的镜像，这个镜像可以快速得启动、运行、关闭形成一个动态的运行容器，容器可以理解为是镜像运行时的实体。

### Dockerfile
通过上面我们可以了解到，镜像的定制实际上就是定制每一层所添加的配置、文件。我们把每一层修改、安装、构建、操作的命令都写入一个脚本，用这个脚本来构建、定制镜像，而这个脚本就是Dockerfile。Dockerfile提供以下指令，指令具体的参数、用法参见文档：
```shell
ADD
COPY
ENV
EXPOSE
FROM
LABEL
STOPSIGNAL
USER
VOLUME
WORKDIR
MAINTAINER
RUN
CMD
ENTRYPOINT
ONBUILD
```
顺带提一下 .dockerignore 文件，.dockerignore 类似于我们日常使用到的 .gitignore 文件一样，用来排除构建镜像时不需要的文件或目录，在Docker CLI将脚本内容发送给Docker daemon前，它会先寻找.dockerignore文件，如果文件存在，CLI会根据.dockerignore将内容进行过滤，避免在使用ADD、COPY时将体积较大、有影响的文件添加进daemon中。

### Play With Docker  
在开始前，推荐一下非常炫酷的[PWD](https://labs.play-with-docker.com/)在线实验室上,我在上面简单的实践了一下，Play With Docker(Docker在线实验室) 是一个运行在浏览器中的Docker Playground，无需安装任何环境，就可以在线体验 Docker。进入实验室后点击左侧“增加一个实例”，PWD会帮我们生成一个节点，在面板上会显示当前节点的相关信息：  

![PWD面板](https://assets.wuxinhua.com/blog/assets/dive-into-docker/pwd_portal.png)
这里有一个session倒计时，在有效的session内，在新的tab页复制当前链接能同时操作当前节点，厉害了：

![PWD session](https://assets.wuxinhua.com/blog/assets/dive-into-docker/pwd_session.png)

在命令行输入:  

```shell
docker run hello-world

```
![helloworld](https://assets.wuxinhua.com/blog/assets/dive-into-docker/pwd_helloworld.png)
Docker daemon会在本地搜索hello-world镜像，没有找到再去远程拉取镜像，并构建容器环境。
紧接着我需要在容器中构建Nginx环境，输入：
```shell
docker  run -d -p 8080:80 nginx
```
同样的Docker下载镜像并且运行容器，-d将容器置于后端运行，-p用于暴露端口，点击上方`8080`即可访问web应用路径。  

![helloworld](https://assets.wuxinhua.com/blog/assets/dive-into-docker/pwd_nginx.png)  

### Docker Hello World

#### Nodejs 应用
又到了程序员最爱的Hello World环节 😆，这个例子足够的简单：我们使用express监听 80 端口，在浏览器端访问后，node端返回Hello world即可,开始我们的docker之旅：

```bash
mkdir hello-world

cd hello-world

npm init

```
我们只需安装`express`依赖，创建index.js文件用来启动、监听服务。

```bash
npm i express --save

touch index.js .gitignore Dockerfile .dockerignore

```
在index.js文件中粘贴以下代码并保存文件：

```JavaScript
var express = require('express')
var app = express()
var post = 80

// response Hello world in root url
app.get('/helloworld', function (req, res ) {
    res.send('Hello world!')
})

// listen server on port 80
app.listen(post, function () {
    console.log('App listensing on: ' + post)
})

```
创建.gitignore 文件：

```shell
/node_modules
/dist
/package-lock.json
```

加入.dockerignore 文件：
```shell
# git DS_Store etc
.git
.svn
.ipynb_checkpoints/*
/DOCUMENTS/*
/notebooks/*
/unused/*
Dockerfile
.DS_Store
.gitignore
README.md
env.*
/devops/*

# To prevent storing dev/temporary container data
*.csv
/tmp/*

# debug
npm-debug.log
```

在本地使用 node 运行测试该应用：

```bash
node index.js
```

#### Dockerfile文件

我们需要把安装、构建、操作镜像的命令都写入一个脚本，这个脚本就是上面提到的 Dockerfile，Dockerfile命令的使用方法详见[文档](https://docs.docker.com/engine/reference/builder/#usage)，这里我稍微注释了每一行命令的作用：

```shell
# Dockerfile for nodejs image
# MAINTAINER M1seRy <wuxinhua.cn@gmail.com>

# Specify the node base image from docker hub.
FROM node:6

# Set working dir in the container to /app.
WORKDIR /app

# Copy package.json to /app directory.
COPY package.json /app

# install dependencies.
RUN npm install

# Copy application file.
COPY . /app

# run our application.
CMD node index.js

# replace this with your application's default port.
EXPOSE 80

```
#### 构建镜像

```shell
docker build -t hello-world .
```

#### 运行容器

使用docker run命令运行该镜像，并且暴露本地的8081端口来访问应用。

```shell
docker run -p 8081:80 -d hello-world
```

(以上)

### 参考资料

[关于Hypervisor](https://en.wikipedia.org/wiki/Hypervisor)
[Learn Docker in 12 Minutes 🐳](https://www.youtube.com/watch?v=YFl2mCHdv24&t=204s)
[docker-automation-for-the-rest-of-us](https://www.slideshare.net/jpetazzo/docker-automation-for-the-rest-of-us)  
[docker-resources](https://github.com/hangyan/docker-resources/blob/master/README_zh.md)
[Play with Docker](https://labs.play-with-docker.com/)
[GO语言、DOCKER 和新技术](https://coolshell.cn/articles/18190.html)

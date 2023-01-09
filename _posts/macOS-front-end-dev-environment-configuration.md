---
title: 'macOS 前端开发环境配置'
excerpt: '当我们更换新的电脑或者入职新公司的时候，通常会需要重新配置一下电脑的开发环境，比较理想的方式就是能够复制我上一台设备的一些配置和软件，这样能快速地开始开发工作，这篇文档记录的是常用的软件、前端开发环境配置等，以及如果使用 dotfiles 重复利用这些配置'
date: '2022-08-01 12:32:49'
tags: '前端开发环境 macOs dev setup'
---

## 概述

当我们更换新的电脑或者入职新公司的时候，通常会需要重新配置一下电脑的开发环境，比较理想的方式就是能够复制我上一台设备的一些配置和软件，这样能快速地开始开发工作，这篇文档记录的是常用的软件、前端开发环境配置等，以及如果使用 dotfiles 重复利用这些配置；每个开发者或许都有自己的 dotfiles 对一些命令行工具、IDE 等配置的备份，然后通过脚本自动化新设备的所有的配置。

## Setup

- 硬件
  - 💻 MacBook Pro
    - 版本：一般内置最新版 macOS，建议手动升级到最新版本：左上角  图标 -> 系统偏好设置 -> 软件更新
    - Finder:
      - 可根据个人喜好显示 -> 勾选【显示路径栏】【显示状态栏】
      - 显示所有文件扩展名 -> 系统偏好设置 -> 高级 -> 显示所有文件扩展名
    - 这里收集了一些非常好用的 Mac 应用程序、软件以及工具
    - Mac的高效率开发上篇
  - 🖥 显示器
  - 人体工学座椅 + 站立办公支架
- 浏览器
  - Chrome
    - Stable - 稳定版本
    - Canary - 开发者专用的每日构建版
  - Firefox
  - Safari
  - edge

- Command Line Tools

> Xcode CLT 前端开发有很多工具依赖  Xcode Command Line Tools，可以直接使用下面命令行安装，并且可以不需要安装 Xcode
Xcode-select 管理着 xcode的Developer Directory 你能轻松得使用 xcode-select --switch 在多个版本的 Xcode 之间切换对应的开发工具路径

```sh
xcode-select --install
```

- Homebrew

> macOS 上各种软件的管理，只要有 Homebrew 就足够了。

Homebrew 是一款享有盛名的包管理工具，Homebrew 的意思是家酿啤酒。基本上下面所有的软件都可以通过它在终端通过执行命令来完成安装，例如安装 Google Chrome ：

```sh
brew cask install google-chrome
```

先安装 Homebrew

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

如何使用 Homebrew:

- Homebrew 快速入门

- Terminal
  - Font 字体
    - 推荐的两款开源字体 FiraCode、JetBrains Mono
    - 如何安装使用 FiraCode
  - item2
  - Mac配置终端环境 iTerm2 + Zsh + Oh My Zsh + tmux
  - Zsh and Oh-My-Zsh
Zsh 是一个专为交互式使用而设计的命令行 shell，建议搭配 Oh-My-Zsh 一起使用，配置详见 oh-my-mac 极致前端开发环境配置手册

```shell
brew install iterm2
```

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

- Editor
  - Visual Studio Code
    - Settings.json 是 vsc 的基本配置文件，例如常用的字体、缩减、自动保存等

```json
{
  // font
  "editor.fontSize": 13,
  "editor.fontFamily": "Fira Code, JetBrains Mono, SF Mono, Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.fontWeight": "400",
  "prettier.prettierPath": "node_modules/prettier",
  "typescript.updateImportsOnFileMove.enabled": "always",
  // Enable per-language
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "liveServer.settings.donotShowInfoMsg": true,
  "gitlens.gitCommands.skipConfirmations": [
    "fetch:command",
    "switch:command"
  ],
  "gitlens.gitCommands.closeOnFocusOut": true,
  "workbench.sideBar.location": "right",
  "security.workspace.trust.untrustedFiles": "newWindow",
  "workbench.tree.indent": 10,
  "extensions.ignoreRecommendations": true,
  "explorer.openEditors.visible": 10,
  "files.exclude": {
    "node_modules": true
  },
  // telemetry
  "telemetry.enableTelemetry": false,
  "telemetry.enableCrashReporter": false,
  "extensions.autoCheckUpdates": false, // Regular
}

```

- Snippet 代码片段

现在大多数代码编辑器都支持了代码片段的功能，借助于 snippet 你可以创建常用的代码模板，减少一些重复性的输入工作，snippet  分两种：全局和当前项目的片段，具体步骤如下：Preference -> User Snippets -> 输入 snippet 名字，例如创建一个简单的 react componnet 代码片段：

``` json
  "Snippet Name": {
    "prefix": "rc", // 触发片段的快捷键
    "body": [
      "import React, { useEffect, FC } from 'react';",
      "",
      "const $1: FC = (props) => {",
      "",
      "  useEffect(() => {",
      "  console.log('$1');",
      "   }, []);",
      "",
      "  return (",
      "    <div>$1</div>",
      "  )",
      "}",
      "",
      "export default ${1};"
    ],
    "description": "Create Basic Component"
  }
}
```

  - VS Code 代码片段完全入门指南
    - vscode添加自定义代码片段snippet - 掘金
  - Sublime
  - webStorm
  - Atom

## Node.js

```shell
brew install node
brew pin node
```

- Npm node包管理

```
npm config set registry=http://bnpm.byted.org
```

- Node.js 版本管理，通常情况下本地开发会出现需要切换 node 版本，常用的两个工具
  - n - a Node.js version management
  - nvm - Node Version Manager

## Git

1. 下载并配置本地 Git

```shell
git config --global user.name “First Last” (keep the quotes)
git config --global user.email “Email” (keep the quotes)
```

2. 生成 SSH 密钥

添加 SSH 密钥能让你计算机和 GitLab 之间建立安全连接。需在本地生成 ssh key 并在 https://code.byted.org/profile/keys 中添加。注意粘贴的是公共 SSH 密钥，它通常包含在文件` ~/. SSH /id_rsa。'，以'ssh-rsa'开头，不要使用私有 SSH 密钥
ssh-keygen -t rsa -b 4096 -C “youremail@example.com”

- 基本用法
Git 是当前比较流行、常用的版本控制系统，例如分支、提交、合并代码这里不再累述，可阅读下方文档
  - git 官方文档
  - Git快速入门教程  
  - commit message 提交约定
  - https://juejin.cn/book/6844733697996881928

## dotfiles
  - dotfiles 主要是指用户 home 目录下的配置文件，这类文件一般是一些工具、软件包的配置文件，比如 vim 的配置文件 .vimrc，zsh 的配置文件 .zshrc 等，关于 dotfile：
  - https://github.com/mathiasbynens/dotfiles
  - https://www.atlassian.com/git/tutorials/dotfiles

## Tools
  - sourcetreeapp
  - 解压工具 Unarchive
  - 广告拦截 AdGuard
  - IINA
  - Alfred - 一款检索神器
  - Dash 文档检索软件
  - Postman 是一个调试 API 的绝佳工具
  - Charles
    - 抓包 - Charles 
    - Charles使用教程
Links
- https://dev.to/v3frankie/setup-your-mac-for-development-2020-edition-1c8a

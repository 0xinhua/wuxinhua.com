---
title: '你可能不知道git rerere'
excerpt: '关于git rerere先卖个关子，在文章的最后会介绍这个命令，可能大多数人对git的认识停留在日常的pull、commit等'
date: '2017-07-15 02:02:37'
tags: git
cover: https://assets.wuxinhua.com/Hoxe-post-git.png
---


关于git rerere先卖个关子，在文章的最后会介绍这个命令，可能大多数人对git的认识停留在日常的pull、commit等，不信可以试着回答一下下面几个问题：

* git push origin master命令中，origin 代表的是什么？如何查看和修改这个origin？
* git fetch和git pull的不同？而git merge和rebase又有什么区别？

上面几个问题的答案请点击这里[你们仍未掌握那天所学的 git 知识](http://yonghaowu.github.io/2017/06/18/TheGitYouShouldKnow/)查看，而这篇你可以理解为一些平时不怎么用到但却很实用的git命令，希望我总结的这些能进一步加强你的git技能。

如果你还没用过git,可以在你的浏览器上输入[try.github.io](http://try.github.io/)去探索git的世界。

### git alias  

敲git pull origin master 多了你可能就想看能不能少敲几个字符，和linux的alias一样,你可以对git命令设置简单的名字。

```bash
git config --global alias.st status
```

当然你也可以在.gitconfig文件一起配置，例如我的.gitconfig中 alias配置：

```bash
[alias]
    ss = status
    ct = commit
    ck = checkout
    bh = branch
    pl = pull
    ph = push
    pom = pull origin master
    pom3 = pull origin master3.0
    df = diff
    lg = log --graph --pretty=format:"%Cgreen(%h)%Creset-%d-%s by %C(yellow)%cN%Creset %cr" --abbrev-commit --date=relative
    ckb = checkout -b
```

### git show  

查看某个文件的修改历史

```bash
git log --pretty=oneline #filename
git show 136e847550bfbd68c65e0b4dd617ce05a3d0af70 // 查看提交改动
```

### git submodule

添加子项目代码

```bash
git submodule add 仓库地址 路径
```

初始化下载子项目代码

```bash
git submodule update --init --recursive
```

### commit --amend

修改你的提交信息

```bash
git commit --amend
```

### git tag

给当前代码打上版本号;  
这个非常实用，可以查看当前的标签，也可以给当前版本打上标签。

```bash
git tag 
```

### git stash

暂存你的改动

```bash
git stash
```

如果你有改动没有commit,当你checkout分支时，git会提示你先commit，这时可以使用stash暂存这些改动，然后使用git stash pop取出来。  

### git add -p

当你有多个改动，可能得提交在多个commit中，这时可以使用git add -p 一个个添加。

```bash
git add -p
```

### git remote prune  

```bash
git remote prune
```

当我们删除了远程分支，使用git branch -a 查看本地和远程的分支时,会发现有些分支在远程已经删除了，但在本地仍然可以看到这些已经删除的远程分支。
可以使用git remote show origin 来查看关于origin远程分支、本地分支的详细信息，提示你使用git remote prune origin来清理这些分支。

### git blame

挑毛病利器

```bash
git blame #filename
```

查找文件的每一处改动历史，显示提交commit号、作者、时间、改动等。

### git log --pretty=format

git log是查看git历史的常用命令，但是很多时候输出的信息并不是很直观(也可以尝试一下git shortlog)，有时我们想看更多或更少的信息，这里可以使用format来定制你的log输出格式，简单点的可以这样

```bash
git log --format=oneline --abbrev-commit
```

例如这是我的：

```bash
git log --graph --pretty=format:"%Cgreen(%h)%Creset-%d-%s by %C(yellow)%cN%Creset %cr" --abbrev-commit --date=relative

```

具体可以参照[这里](http://ruby-china.org/topics/939).

### git rerere

帮助你解决冲突

```bash

# 开启git rerere
git config --global rerere.enabled true
```

rerere = reuse recorded resolution
它会让Git记住你是如何解决某个文件的两个版本之间的conflict，这样在下次Git遇到同样的文件在相同的两个版本间发生冲突时，可以自动帮你使用相同的方法解决冲突。
具体如何开启使用点击查看[git rerere](https://ruby-china.org/topics/15809?utm_campaign=CodeTengu&utm_medium=email&utm_source=CodeTengu_102)

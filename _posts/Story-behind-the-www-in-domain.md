---
title: 'www背后的故事'
date: '2018-11-16 21:47:06'
tags: www domain
---

# 为什么存在这个问题

我在建立我的博客的时候有人跟我说 www 的网站更适合做SEO，而实际上我对这两者的区别并不了解，为什么域名的URL会需要带上www？有的网站二者都能访问，有的却不能？刷推的时候也发现了一个奇怪的账号[@www_deprecated](https://twitter.com/www_deprecated),现在在主张废弃 www吗？今天这篇文章会概括二者的区别及理清楚背后的原理。

# 一些背景知识

说到 www ，就不得不提万维网，1991年8月6日，世界上诞生了第一个 www (World Wide Web)网站(这个网站至今还可以访问~ => [http://info.cern.ch/](http://info.cern.ch/))，发明者来自欧洲核子研究中心（CERN）的蒂姆·博纳斯李（Tim BernersLee），他把Hypertext(超文本)概念和传输协议（也就是我们现在仍在使用的w3c协议）、域名系统绑定在一起，提出了万维网的概念，他还设计了实现了第一个3w 浏览器和 web 服务器。而后续建立的非盈利性的W3C（万维网联盟）对web 进行标准化，创建并维护3w标准，那网站以www开头，是World Wide Web的简称吗？可以这么认为。

在万维网出现之前，是存在互联网的，但是它并不是用来浏览网页罢了，它被用来干很多事，例如telnet、email、gopher、FTP传输等，在那个时期，人们通常习惯把域名跟功能绑在一起，例如：smtp.example.com代表这是一个使用SMTP协议的邮件服务，ftp.example.com代表这是一个FTP服务器。同样的到了1990年，人们使用 www.example.com 来区分这是个web服务器。


# DNS解析记录

在网络世界中，我们知道ip地址才是网站或者应用资源的真正地址，但网站的数目很多，如果用IP来访问，使用者很难记住，于是有了域名，我们记住了域名，也就记住了资源的地址；那互联网是如果通过域名找到正确的IP地址呢？这个过程需要使用到DNS服务器，也就是网络世界的通讯地址簿，通过DNS解析把这两者联系起来。 

域名注册购买后，我们只是拥有了域名的使用权，还无法通过域名直接访问自己的网站，因为互联网只识别IP地址，只有在域名解析服务商处建立域名和IP地址对应关系记录后，才能通过域名访问到该网站。拿阿里云的DNS解析服务来说（并非给阿里云打广告，可自行选择），域名下有个DNS服务器选项，配置阿里的DNS服务器后，它会将网站域名解析成网站的IP地址，从而将最终用户的访问路由到相应的网站或应用资源上。  

在网址中，http:// 或 https:// 后的第一个子字符串称之为域，也就是网站资源所在服务器的名称，实际上这是不同的两个域，即www是一个子域名，它甚至可以被设置成不同的IP地址。在做域名解析时，我们通常会同时添加两条A记录，分别是www和@，记录值指向同一个IP地址，这样确保加上www和不带www均能访问。

# 关于SEO

www网站真的对SEO更友好？看看谷歌怎么说：
> “If you specify your preferred domain as http://www.example.com and we find a link to http://example.com, we’ll consider both links the same.”  

谷歌说我们的引擎并没有偏向于喜欢抓哪个，那我们能改吗？例如把裸域名网站切换到www域名上？最好不要，加和不加对SEO来说是有很大区别的，因为不加www的域名是主网站，而加上www的相当于一个二级域名，对于搜索引擎来说，example.com和www.example.com完全是两回事，经常更换不利于搜索引擎准确地抓取到内容。


# 关于Cookie

两者带来的一些问题也体现在cookie上，cookie设置在主域名上，也可以传递给子域名，举例：如果主站example.com设置了cookie，那么在访问 www.example.com或email.example时浏览器也能拿到这些cookie，相反如果在www.example.com上设置了cookie，它并不能传递到主域名和其它子域名上[RFC6265](https://tools.ietf.org/html/rfc6265)。带来的问题是在你在共享cookie的同时一方面请求带上并不需要的cookie会影响网页响应性能，另一方面可能存在安全性的问题。如果你坚持使用裸域名的时候，那么cookie会被传递到所有的子域名上，这样还可能导致子域名对静态内容的访问出现问题，例如[Twitter](https://twitter.com)就是使用的裸域名，为了避免这个问题，它使用了另一个新的域名来存放静态资源。

## 废弃 www

 - 不加www的域名更加简短优雅，更容易被记住，加上3w是多余的，意味着你还需要多按下3个w，并且现在大多数的网页在没有www的情况下也能正常访问。  
 - 多余的字符意味着占用更多的空间和带宽，www 将会额外占用32 bits，在DNS解析这个域名时也将耗费更长的时间。  
 - 容易造成一些困惑，例如在使用邮箱时，www 不应该出现在邮箱后缀。  

## 坚持www

- www 意味着web服务，利用人们理解，对于一些有着悠久历史的网站来说，我认为保留www或许是一个更好的选择。
- 如果你的网站需要在cdn上存放、更新静态资源，那么www 子域名是一个很好的选择，有些host服务商裸域名(example.com) 不能使用CNAME记录。  
- 另一个是使用www不会带来cookie共享的问题。  

那用还是不用，这取决于你。


# 附录
1、[webmaster 设置首选域使用www还是非www?](https://support.google.com/webmasters/answer/44231?hl=zh-Hans)
2、[为什么使用www](https://www.yes-www.org/why-use-www/)  
3、[When should one use a 'www' subdomain?](https://stackoverflow.com/questions/486621/when-should-one-use-a-www-subdomain)
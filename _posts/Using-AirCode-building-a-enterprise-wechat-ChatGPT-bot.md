---
title: 'ChatGPT 机器人系列 - 用 JavaScript 开发企业微信 ChatGPT 聊天应用'
excerpt: '你将学会如何创建企业微信应用，如何配置接收消息 URL、企业可信 IP、解密消息，给聊天应用接入 ChatGPT 能力'
date: '2023-04-01 02:00:00'
tags: 'AirCode 企业微信 ChatGPT 企业微信Openapi'
---

原文链接：https://aircode.cool/54fhemjpk2

本文将帮助你快速实现一个企业微信聊天应用，并且接入 ChatGPT。（以下为效果截图）

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/1-weixin-demo.jpg" width="310px" /></p>

## 你将学会

- [x] 创建企业微信应用，如何配置接收消息 URL、企业可信 IP、解密消息
- [x] 使用 AirCode 的「Get a copy」（一键复刻应用）功能，实现应用的聊天能力
- [x] 给聊天应用接入 ChatGPT 能力

## 第一步：创建聊天应用

1. 通过企业微信扫码登录[企业微信管理后台](https://work.weixin.qq.com/wework_admin/loginpage_wx)。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/2-weixin-login.png" width="360px" /></p>

2. 在[企业微信管理后台](https://work.weixin.qq.com/wework_admin/frame#apps) "应用管理"下点击[创建应用](https://work.weixin.qq.com/wework_admin/frame#apps/createApiApp)，在表单中选择应用 Logo 图片、输入应用名称 ChatGPT，并且选择可见范围(选择部门/成员)完成创建。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/3-weixin.png" width="800px" /></p>

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/4-weixin-create.png" width="500px" /></p>

3. 创建应用后会进入应用详情页，点击第二行 Secret 栏的“查看”链接，弹窗后点击“发送”，Secret 会发送到你的企业微信中，收到后请复制保留备用。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/5-weixin.png" width="800px" /></p>

4. 点击上一张截图顶部[我的企业](https://work.weixin.qq.com/wework_admin/frame#profile) tab 栏，左侧点击 [企业信息](https://work.weixin.qq.com/wework_admin/frame#profile/enterprise) 查看最底下一栏企业 ID，请复制保留备用。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/6-weixin.png" width="800px" /></p>


## 第二步："Get a copy" 创建 AirCode 应用

1. 通过 [AirCode 源码链接](https://aircode.cool/54fhemjpk2)(当前页)右上角的「Get a copy」按钮快速生成一个自己的企业微信 ChatGPT 应用 AirCode 应用。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/7-weixin.png" width="800px" /></p>

2. 如果没有登录，需先登录 AirCode，可以直接使用 GitHub 或 Google 授权登录，登录之后会重新弹窗创建当前应用。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/8-sigin-aircode.png" width="800px" /></p>

3. 在弹出的对话框中，使用默认应用名称或输入新的应用名称，并点击 Create 完成创建。应用创建成功后会进入 /dashboard 页面，AirCode 需要一点时间来安装依赖（如下图 2 所示），请耐心等待。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/9-weixin.png" width="800px" /></p>

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/10-weixin.png" width="800px" /></p>

4. 将第一步创建聊天应用获得的企业 ID 以及接收到的 Secret，粘贴到刚创建的 AirCode 应用 /dashboard 页面的 Environments中 环境变量中（上张截图右侧），在 CorpId 和 CorpSecret 栏的 value 处分别填入粘贴过来的企业 ID 和 应用 ChatGPT 的 Secret 的值。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/11-weixin.png" width="500px" /></p>

## 第三步：配置应用的 API 接收消息以及企业可信 IP
  
1. 企业微信后台 [应用管理](https://work.weixin.qq.com/wework_admin/frame#apps) 栏下点击刚刚创建的 ChatGPT 应用，在功能栏 "接收消息" 模块中点击 "设置 API 接收"。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/12-weixin.png" width="800px" /></p>


2. 分别在 Token 和 EncodingAESKey 输入框右侧的 “随机获取”按钮(先不要点击下方 "保存" 按钮，第一行的 URL 将在下一步获得) 能获取到后台随机生成的 Token 和 EncodingAESKey 值（可复制保留备用），将这两个值粘贴到刚创建的 AirCode 应用的环境变量（Environments）中，在 Token 和 EncodingAESKey 栏的 value 处分别填入粘贴过来的 Token 和 EncodingAESKey 的值。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/13-weixin.png" width="800px" /></p>

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/14-weixin.png" width="500px" /></p>


3. 配置好环境变量（Environments）后，点击页面上方的「Deploy 按钮」部署整个应用，使所有配置生效。将 AirCode 部署后生成调用链接复制粘贴至上一步 "接收消息服务器配置" 中的 URL 栏，并点击保存按钮，配置成功截图如下面图 3 所示：

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/15-deploy-aircode.png" width="800px" ></p>

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/16-weixin.png" width="800px" /></p>

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/17-weixin.png" width="800px" /></p>


注意：由于企业微信验证 URL 会校验域名主体，当前 Demo 使用企业并未认证能正常配置，如果你的企业已完成认证，这里会因为无法通过 URL 域名校验无法保存出现如下报错，目前没有更好的方式能解决这个问题，如果你有更好的方案欢迎反馈。

如果遇到下面图中域名主体校验不通过的情况，可以尝试找一台在当前企业认证域名下的服务器，利用反向代理工具例如 Nginx 将这个域名的请求转发到 AirCode，在这个 URL 输入框中配置你的域名转发 URL 链接来完成这步配置。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/18-weixin.png" width="800px" /></p>


4. 企业微信应用仅后台配置的 IP 可调用回复接口，AirCode 目前可以给指定的应用配置固定 IP，可以通过填写[申请表单](https://aircodelabs.feishu.cn/share/base/form/shrcneKKuRcr57iZzFSXjMMfPBb)方式提交，在申请前请确保上一步「接收消息服务器配置」成功。由于配置固定 IP 需人工操作，请耐心等待邮件反馈 IP 地址。在获得固定 IP 后在应用详情页 “开发者接口” 栏的 “企业可信IP” 模块里点击 “配置” 链接，在弹窗中输入该 IP，按确认键保存。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/19-weixin.png" width="800px" /></p>
<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/20-weixin.png" width="800px" /></p>


## 第四步：测试聊天应用

1. 打开你的企业微信 - 工作台中(拉到最底下)，点击你的应用 ChatGPT 进入聊天框。由于还没有配置 ChatGPT 能力，AirCode 应用会直接将你发送的消息返回，这时表示应用已经配置成功。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/21-weixin.jpg" width="380px" /></p>

如果遇到在后台配置 URL 报错或测试应用回复信息时无响应的情况，可以在 AirCode 右侧 Logs tab 下（如下图）查看日志（展开具体报错信息）排查原因。

<p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/22-weixin.png"  width="800px" /></p>

## 第五步：接入 ChatGPT 能力

1. 到 [OpenAI 的控制台](https://platform.openai.com/account/api-keys)中，点「Create new secret key」生成并且复制这个新生成的 Key，粘贴到刚创建的 AirCode 应用的环境变量（Environments）中，粘贴到 OpenAIKey 的 value 中。如果没有 OpenAI 账号，可以到网络中搜索一下获取方式，提前购买准备好。

 <p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/23-weixin.png" width="800px" /></p>

 <p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/24-openAI.png" width="800px" /></p>

 <p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/25-weixin.png" width="500px" /></p>

2. 点击上方 Deploy 按钮再次部署让环境变量生效，在企业微信里给应用 ChatGPT 发送消息测试 ChatGPT 的回复。

 <p align="center"><img src="https://docs-cn.aircode.io/_images/tutorials/weixin-chatgpt/26-weixin.png" width="800px" ></p>


## 问题反馈
  1. 可以加入我们的[飞书用户群](https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=6dem4ab3-d523-4562-9c63-9fb46d565b10)
  2. 来到我们的 [GitHub 仓库](https://github.com/aircodelabs/aircode)，可以提 issue 或者直接贡献代码
  3. 欢迎加入我们的 [Discord 讨论区](https://discord.com/invite/XrMVdYdEuY)

## 更多阅读
- [用 JavaScript 五分钟将 Siri 接入 ChatGPT ](https://aircode.cool/828668wg5a)
- [用 JavaScript 五分钟开发一个飞书 ChatGPT 机器人](https://aircode.cool/q4y1msdim4)
- [用 JavaScript 五分钟开发一个钉钉 ChatGPT 机器人](https://aircode.cool/xspb3by9fs)
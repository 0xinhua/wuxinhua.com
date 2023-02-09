---
title: '适配 iOS 13'
excerpt: 'Apple 在 10 月份推送了 iOS13 公开版后，iOS 用户进行更新版本，如果应用没有做适配会导致 Crash 、兼容适配等问题，这里记录一下当时适配过程遇到的一些问题以及体验移动开发的一些收获'
date: '2019-11-02 23:56:46'
tags: 'iOS 13 适配'
---

## 前言

目前 iOS 可下载的最新正式版是 13.3，早在今年 6 月份苹果向公众推出 iOS 13 的开发者预览版，在 9 月份发布 iOS 13.0 版本后，苹果又接连推出了 13.1 / 13.1.1 / 13.1.2，iOS 13.2 还因为频繁杀后台被用户吐槽新版本 Bug 太多。目前市场上主流的 iPhone 机型(包括iPhone 6s、6s Plus、7、7Plus、8、8Plus、SE、X 、XS 、XS Max、XR、iPod touch 7代等）都兼容升级 iOS13 版本，但值得注意的是已不再支持 A7 或 A8 处理器的机型，仅限于 A9 处理器。

Apple 在 10 月份推送了 iOS13 公开版后，iOS 用户进行更新版本，如果应用没有做适配会导致 Crash 、兼容适配等问题，这里记录一下当时适配过程遇到的一些问题以及体验移动开发的一些收获，由于对 iOS 开发、Swift 等并不是很熟悉，如内容有误，请及时斧正。

## 功能更新

在适配前应该先了解一下具体都做了哪些更新，先来看下这次的 iOS 13 带来的功能上的更新，有一些功能我也是比较期待的，这里归纳总结一下：

- 视觉上的提升 - Dark mode

  - 毫无疑问 iOS 13 最受关注的功能点就是这个“能让你更方便熬夜”的暗黑模式，用户可以在 设置 - 显示与亮度 中更改深色模式设置，也可以在“选项”中根据日出与日落时间或者自定义时间段设置，目前 iOS 13 提供了根据日落时间和自定义时间段两种切换方式，这个版本系统还提供有针对黑夜模式的新壁纸。

- 控制中心优化及增强可操作性

  - 允许从控制中心直接操作 WiFi 蓝牙，长按 WiFi 、蓝牙等选项会弹出当前可用的网络、蓝牙设备列表；
  - 蜂窝煤提供低数据连接模式；
  - 更新音量调节 UI，禁音操作后，会在顶部弹出一个静音模式的通知；操作侧边栏音量键后，会在按键侧出现显示音量大小的条形图，还可以用手指触摸条滑动来调整声音；

- 增强 Safari

  - 在 Safari 中截屏的的时候多了一个屏幕选项，可以实现长截图了，甚至可以调整、编辑图片;
  - 允许直接将网页保存为PDF;
  - 增加下载管理器，可以在 设置 - Safari 浏览器 -下载项更改下载文件的默认存放位置；
  - Safari 会在你设置了安全性较弱的密码时弹出警告

- 性能上的提升

  - 据 PPT 介绍 Face ID 解锁速度提升 30%，App Store 的应用程序提供新的压缩模式，使得 App 下载的体积减少 50% 左右，这意味着更快的应用更新速度，App 开启速度提升2倍。(具体数据这里没有实际测试);

- 照片和相机改进
  - 新的浏览视图，编辑功能更好用了，iOS 13 增强了照片编辑功能，包括自动修图功能，提供更多编辑参数等;
  - 相机功能优化，新的光效模式，更真实的人像效果，包括照片根据 AI 自动归类，照片标签会自动按照天、月以及年的时间进行分类;

- Sign In With Apple
  - 目前国内很多 app 都有做第三方登陆，例如微信、微博、github 登陆等，苹果也来抢饭碗，推出了自己的第三方登陆功能：Sign In With Apple，可以通过已有的 Apple ID 来快速登录其它 app 和网站，App 和网站只能索取你的姓名和电邮地址，在 WWDC大会 演示中看到苹果甚至还可以隐藏真实的邮箱地址，让第三方产品难以追踪该账号的数据。

- 地图、Memoji、键盘优化等

这里没有全面列举这次功能上的更新，具体可网上查看 iOS13 的更新列表。

## API 层变动

### KVC

私有 KVC 在 iOS 开发中可以说是一个黑魔法，因为 KVC 可以访问和修改私有变量，经常会用于动态取值和设值。在 iOS 13 中苹果已不再允许这样使用。原项目代码中存在比较多这样使用的代码，例如 UISearchBar 通过 forKey 获取 searchField 然后修改 backgroundColor ，在新版本系统中会直接导致应用崩溃，或者 valueForKey、setValue:forKey 等方法获取修改属性均会报错。

例如：

```objc
[_textField setValue:[UIColor redColor] forKeyPath:@"_placeholderLabel.textColor"];

[_textField setValue:[UIFont systemFontOfSize:14] forKeyPath:@"_placeholderLabel.font"];
```

兼容：

```objc
- (UITextField *)set_searchTextField{
    if ([UIDevice currentDevice].systemVersion.floatValue >= 13.0) {
        //判断xcode版本
        return self.searchTextField;
    #else
        return [self valueForKey:@"searchTextField"];
    #endif
    
    }
    
    return [self valueForKey:@"searchField"];
}

```

## Modal Presentation Style

在 iOS13 中, Apple 将视图控制器的默认显示样式从 iOS12 的全屏显示改为 Modal 模式显示，这种类似于弹窗模块的卡片需要你手动往下滑将其取消，这个改动可能会影响应用的一些交互。

> Defaults to UIModalPresentationAutomatic on iOS starting in iOS 13.0, and UIModalPresentationFullScreen on previous versions.By default UIViewController resolves UIModalPresentationAutomatic to UIModalPresentationPageSheet, but other system-provided view controllers may resolve UIModalPresentationAutomatic to other concrete presentation styles.

针对 navigationController 增加兼容全屏的代码, Swift、OC 代码中分别设置 modalPresentationStyle 为fullScreen， 示例：

```swift
/// swift 
@objc private func dismiss() {

  let navigationController = UINavigationController(rootViewController: XTNoLoginTagGuideViewController())
    
    navigationController.modalPresentationStyle = .fullScreen 
    
    XTGlobalTools.getCurrentVC()?.present(navigationController, animated: true, completion: { 
      self.removeFromSuperview() })
}
```

```objc
// objc
UINavigationController *navi = [[UINavigationController alloc] initWithRootViewController:readXiaoceVC];
[navi setModalPresentationStyle: UIModalPresentationFullScreen];
[currentVC presentViewController:navi animated:YES completion:nil];
```

## Dark mode

暗黑模式的适配稍微复杂一些，这里把兼容分为基本、中等、最高三个级别：

- 最基本

  不适配 dark mode，即用户切换 darkmode 的时和 lightmode 的时候 app 的样式一致，这样能保证用户正常使用。最基本层级的兼容比较容易，尝试直接在项目的 info.split 中更改 User Interface Style 为 Light, 可直接 Xcode 界面设置或更新 info.split 代码

  ```sh
  <key>UIUserInterfaceStyle</key>
  <string>Light</string>
  ```

  但这样强制使用 Light 模式带来的影响就是用户切换成 Dark mode ，如果 Status Bar 的显示未兼容会影响用户查看设备状态栏信息。iOS13 对Status BarAPI 做了修改，之前 Status Bar 有两种状态：

  - default 默认文字黑色
  - lightContent 文字白色

  之后增加了文字白色，UIStatusBarStyleDefault 自动选择黑色或白色，如图所示：

  - default 自动切换
  - lightContent 文字白色
  - darkContent 文字黑色

![iOS13 status bar](https://assets.wuxinhua.com/blog/assets/ios13/status-bar.png "iOS13-status-bar")

- 中等

  中等适配主要是颜色相关，例如针对 dark mode 修改背景颜色和字体颜色， 需要UI配合针对目前正常的颜色值给出 dark mode 的颜色值，然后整体来修改替换。

- 最高

  最高级别的适配除了颜色外，App 中所有涉及到需要兼容的 icon 或图片、webView 样式都需要进行适配，例如 icon 、图片需要准备两套。同样这部分也需要产品、UI 来配合。

简单总结一下：

- 两种模式的适配主要涉及颜色和图片两个方面的适配
- 从 iOS13 开始 UIColor 是一个动态的颜色，可自定义动态 UIColor，针对两种模式给对应的颜色
- 图片的适配在不同模式的情况下, 需要对 Assets.xcassets 中的图片选择 Appearances 为 light 和 dark 时准备两套不同的图片
- 更新 StatusBar 样式
- 更新 UIActivityIndicatorView 样式（已废弃了一些样式，iOS13 之后可以通过 color 属性设置你需要的样式）
- 有时我们还需要监听系统模式的变化，针对不同模式作出响应

具体可以运行 WWDC 现场演示例子[代码](https://docs-assets.developer.apple.com/published/7ad8bd39bb/AdoptingIOSDarkMode.zip)。

## 子线程修改界面导致崩溃

GCD（Grand Central Dispatch） 是苹果公司为多核的并行运算提出的解决方案, 允许程序将任务切分为多个单一任务然后提交至工作队列来并发地或者串行地执行，主要分为 Main queue 、Global queue 和 Custom queue三种，分别对应串行的主线程、并行的全局队列，自定义队列，Custom Queues 默认是串行，当然也可以设置 attributes 为 concurrent，这样它变成了并行 queue。Main queue 运行在系统主线程的一个串行队列,我们所有的UI刷新都发生在 Main queue.如果我们在主线程外的地方做UI操作则会报错，需要将 UI 刷新操作放置 mainQueue 里，如下例子所示：

```swift
DispatchQueue.main.async { 
  // view 更新操作
  self.view.reload()
}
```

## UIWebView

当你需要在应用里展示一些 HTML 页面的时候，就需要用到 webview, iOS中有 UIWebview 和 WKWebview 两种 Webview ，在 WWDC 2018 的演讲介绍中，官方已经宣布正式弃用 UIWebView，并建议之后采用 WKWebview API 构建。

> WKWebView has been around since 2014, so it's not technically new. However, it's worth mentioning again because we are now officially deprecating UIWebView. So, if you're starting a new app, or a new project, and would like to display web content that's not easily put into a native view, use the WKWebView.

区别：

- UIWebView 使用 UIKit 框架，而 WKWebView 使用 WebKit.
- WKWebView 运行在应用单独的一个线程上，并且它可以利用 Safari JavaScript 引擎进行优化，这意味着 WKWebView 加载页面更快更加高效，减少内存开销
- WKWebView 加载本地文件在 iOS 9 中得到修复
- WKWebView 中无法像在 UIWebView 中那样对页面进行缩放适应
- WKWebView 增强了对 indexedDB 的支持

```swift
  // UIWebView
import UIKit
class UIWebViewController: UIViewController{
   @IBOutlet weak var webView: UIWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
            let url = URL (string: "https://www.example.com")
            let requestObj = URLRequest(url: url!)
        webView.backgroundColor = UIColor.blue
            webView.loadRequest(requestObj)
    }
}

```

```swift
// WKWebView
import UIKit
import WebKit
class WKWebViewController: UIViewController, WKNavigationDelegate {
    var webView : WKWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        let myUrl = "https://www.example.com"
        let url = NSURL(string: myUrl)
        let request = NSURLRequest(url: url! as URL)
        webView = WKWebView(frame: self.view.frame)
        webView.navigationDelegate = self
        webView.load(request as URLRequest)
        self.view.addSubview(webView)
        self.view.sendSubview(toBack: webView)
    }
}

```

## Sign In With Apple

使用苹果登陆是苹果推出的新功能，方便用户使用他们的苹果ID登录到你的应用程序或网站。无需填写登陆注册表单、验证电子邮件地址、选择新的密码等，可以使用“Sign In With Apple”建立一个帐户并快速开始使用该应用。苹果的在 WWDC2019 介绍PPT中提到：

- 精简的账户注册（Name + Email addresses）
- 使用已验证邮箱地址（依赖 AppleID 做双重验证）
- 反作弊
- 安全地（APP只能访问名称和邮件，苹果不记录信息、可以隐藏邮箱地址）
- 跨平台（iOS macOS watchOS tvOS JavaScript）

Apple 介绍的一些使用场景：

- 用户在你的应用帐户系统功能有限的情况下创建一个帐户进行体验
- 用户在体验产品应用的功能后创建一个账户，例如保存进度、设置个人资料信息等
- 用户以访客身份完成购买后创建用户

**移动端：**

接入分为以下四步，提供 “Sign In With Apple” 按钮 => 授权 => 认证 => 处理回调:

1. 在应用的登陆页面添加 “Sign In With Apple” 登陆按钮:

    ```swift
    // Add “Sign In with Apple” button to your login view
        func setupProviderLoginView() {
            let authorizationButton = ASAuthorizationAppleIDButton()
            authorizationButton.addTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .touchUpInside)
            self.loginProviderStackView.addArrangedSubview(authorizationButton)
        }
    ```

2. 绑定按钮点击事件，给苹果发送授权请求:

    ```swift
    // Configure request, setup delegates and perform authorization request    
    func handleAuthorizationAppleIDButtonPress() {
            let appleIDProvider = ASAuthorizationAppleIDProvider()
            let request = appleIDProvider.createRequest()
            request.requestedScopes = [.fullName, .email]
            
            let authorizationController = ASAuthorizationController(authorizationRequests: [request])
            authorizationController.delegate = self
            authorizationController.presentationContextProvider = self
            authorizationController.performRequests()
        }

    ```

3. 针对苹果授权请求响应进行处理，成功即可在系统创建对应账号、保存账号到 keychain 等操作。

    ```swift
    extension LoginViewController: ASAuthorizationControllerDelegate {
        // 授权成功处理，拿到授权反馈后可以直接创建账号了
        func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
            if let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential {
                
                let userIdentifier = appleIDCredential.user
                let fullName = appleIDCredential.fullName
                let email = appleIDCredential.email
                // Create an account in your system.
            }
        }
        // 授权失败处理
        func authorizationController(_: ASAuthorizationController, 
                    didCompleteWithError error: Error) {
            // Handle error
        }
    } 
    ```

**网页端**：

苹果针对网页版应用提供了对应的JS SDK, 也能接入 “Sign In With Apple”，配置过程类似，示例如下：

1. HTML 头部页面接入 Apple 的 JS:

```html
<script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
```

1. 可以使用 meta 标签或在 JavaScript 代码中配置授权 API 字段，并提供 Apple 登录按钮，如下例子所示:

```html
<html>
    <head>
        <meta name="appleid-signin-client-id" content="[CLIENT_ID]">
        <meta name="appleid-signin-scope" content="[SCOPES]">
        <meta name="appleid-signin-redirect-uri" content="[REDIRECT_URI]">
        <meta name="appleid-signin-state" content="[STATE]">
    </head>
    <!-- 也可以在JavaScript代码中配置 -->
    <script type="text/javascript">
         AppleID.auth.init({
             clientId : '[CLIENT_ID]',
             scope : '[SCOPES]',
             redirectURI: '[REDIRECT_URI]',
             state : '[STATE]'
         });
     </script>
</html>
```

1. 处理认证信息回调，Apple 处理授权请求后会将一个包含授权结果的HTTP POST请求发送到redirectURI 中提供的 URL 中。具体配置可以查看官方文档，参考使用官方提供的 demo。

## LaunchImage 弃用

启动页的图片设置方式有两种：

- 通过 LaunchScreen.storyboard 设置
- 通过 Assets.xcassets 增加 iOS Launch Image 设置启动页图片，苹果设备的尺寸增多，意味着我们需要在对应的 assets 里放入对应尺寸的启动图。

> 'UILaunchImages' has been deprecated, use launch storyboards instead.

当 Xcode 升级到11后，如果继续使用则会提示上面提示，建议在 storyboards 设置。

## 总结

这次适配过程中的一些个人体会：

1. 苹果已经更新了 iOS13 的适配时间节点，从 2020 年 4 月份起，所有提交到 App Store 的应用都需要使用 iOS 13 SDK 或更高的版本来构建，并且还需要兼容 iPhone XS Max 、iPad Pro 等设备，如果提供了第三方登陆功能的应用还得兼容使用  “Sign In With Apple”  登陆，兼容暗黑模式，提供一个暗黑模式下的应用截图，所以建议尽早完成应用 iOS13 的适配。

2. 由于目前并没有完成所有的适配工作，截止到目前开发过程遇到的一些报错基本都是 API 层改动造成的，阅读文档提示加上网上查找答案修改代码即可，只是稍微有一点点 swift 基础，但对 iOS 开发的认识其实远远不够，之后还需要多看多练习代码。

3. iOS 开发测试发版周期都较长，不像 web 端能快速更新部署上线，例如前期准准备 iOS 开发机器、熟悉Xcode 开发工具、iOS 测试设备、开发者账号、配置证书等需要做比较多的准备工作，后期的  App Store 发版还有可能被拒，所以对代码质量、发版前的测试质量要求都比较高。

## 附录

- [苹果开发文档](https://developer.apple.com/documentation)
- [WWDC 2019](https://developer.apple.com/videos/play/wwdc2019)
- [Xcode 11 Release Notes](https://developer.apple.com/documentation/xcode_release_notes/xcode_11_beta_release_notes)
- [Dark Mode 介绍](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/dark-mode/)
